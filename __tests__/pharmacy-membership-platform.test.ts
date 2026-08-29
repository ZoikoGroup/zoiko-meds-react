import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  lookupPharmacyMembership,
  resetPlatformTokenCache,
} from "@/lib/pharmacyMembership";

/**
 * Membership resolved from the platform admin API — the source behind the Super
 * Admin Users page. Modelled on the real reported account:
 *
 *   Naveen · gdbdata3@gmail.com · Pharmacist · Zoiko Group Pharmacy · Active
 *
 * The pharmacy id is the platform cuid the website directory also serves, so
 * the comparison is id-to-id; display names are never compared.
 */

const ZOIKO_GROUP = "cmsknn5zb00ea123ob6umx58k";
const TESTERPHARMA = "cms7hk4ob003n123omrb7keu2";

/** One page of GET /admin/users, in the shape the admin table renders. */
const ADMIN_USERS = {
  users: [
    { id: "u0", fullName: "ZoikoMeds Super Admin", email: "info@zoikomeds.com", role: "SUPER_ADMIN", pharmacyId: null, status: "ACTIVE" },
    { id: "u1", fullName: "Naveen", email: "gdbdata3@gmail.com", role: "PHARMACIST", pharmacyId: ZOIKO_GROUP, status: "ACTIVE" },
    { id: "u2", fullName: "tester", email: "test@gmail.com", role: "PATIENT", pharmacyId: null, status: "ACTIVE" },
    { id: "u3", fullName: "Tester", email: "manualtester2000@gmail.com", role: "PHARMACIST", pharmacyId: TESTERPHARMA, status: "ACTIVE" },
    { id: "u4", fullName: "radha ramani", email: "crazyramani2018@gmail.com", role: "PHARMACY_MANAGER", pharmacyId: null, status: "ACTIVE" },
  ],
};

function stubAdminApi(payload: unknown, status = 200) {
  const fetchMock = vi.fn(async (url: string | URL) => {
    const href = String(url);
    if (href.includes("/auth/login")) {
      return { ok: true, status: 200, json: async () => ({ accessToken: "svc-token" }) };
    }
    if (href.includes("/admin/users")) {
      return { ok: status < 400, status, json: async () => payload };
    }
    throw new Error(`unexpected fetch: ${href}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  delete process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL;
  process.env.PLATFORM_SERVICE_EMAIL = "svc@zoikomeds.com";
  process.env.PLATFORM_SERVICE_PASSWORD = "service-password";
  resetPlatformTokenCache();
});

afterEach(() => {
  delete process.env.PLATFORM_SERVICE_EMAIL;
  delete process.env.PLATFORM_SERVICE_PASSWORD;
  delete process.env.PLATFORM_SERVICE_TOKEN;
  vi.unstubAllGlobals();
  resetPlatformTokenCache();
});

describe("the exact reported case", () => {
  it("resolves gdbdata3@gmail.com + Zoiko Group Pharmacy as linked", async () => {
    stubAdminApi(ADMIN_USERS);

    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });

    expect(result.status).toBe("linked");
    expect(result.source).toBe("platform-admin-api");
    expect(result.resolvedPharmacyId).toBe(ZOIKO_GROUP);
  });

  it("matches the email case-insensitively", async () => {
    stubAdminApi(ADMIN_USERS);
    const result = await lookupPharmacyMembership({
      email: "GDBData3@Gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("linked");
  });

  it("uses a static service token when one is set, skipping login", async () => {
    process.env.PLATFORM_SERVICE_TOKEN = "static-token";
    const fetchMock = stubAdminApi(ADMIN_USERS);

    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });

    expect(result.status).toBe("linked");
    expect(fetchMock.mock.calls.every(([u]) => !String(u).includes("/auth/login"))).toBe(true);
  });
});

describe("refusals", () => {
  it("reports a real user on a DIFFERENT pharmacy as not linked", async () => {
    stubAdminApi(ADMIN_USERS);
    const result = await lookupPharmacyMembership({
      email: "manualtester2000@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("not-linked");
    expect(result.resolvedPharmacyId).toBe(TESTERPHARMA);
  });

  it("reports a user with no pharmacy as not linked", async () => {
    stubAdminApi(ADMIN_USERS);
    const result = await lookupPharmacyMembership({
      email: "crazyramani2018@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("not-linked");
  });

  it("reports an unknown address as not linked", async () => {
    stubAdminApi(ADMIN_USERS);
    const result = await lookupPharmacyMembership({
      email: "nobody@example.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("not-linked");
  });

  it("refuses a suspended account even on the right pharmacy", async () => {
    stubAdminApi({
      users: [
        { email: "gdbdata3@gmail.com", pharmacyId: ZOIKO_GROUP, status: "SUSPENDED" },
      ],
    });
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("not-linked");
  });
});

describe("payload shape tolerance", () => {
  it("reads a nested pharmacy object", async () => {
    stubAdminApi([
      { email: "gdbdata3@gmail.com", pharmacy: { id: ZOIKO_GROUP, name: "Zoiko Group Pharmacy" } },
    ]);
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("linked");
  });

  it("reads a multi-branch memberships array", async () => {
    stubAdminApi({
      data: [
        {
          email: "gdbdata3@gmail.com",
          memberships: [{ pharmacyId: TESTERPHARMA }, { pharmacyId: ZOIKO_GROUP }],
        },
      ],
    });
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("linked");
  });
});

describe("failures never become permission", () => {
  it("returns unknown when the credential is rejected", async () => {
    stubAdminApi({ message: "Unauthorized" }, 401);
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("unknown");
  });

  it("returns unknown when the admin API is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        if (String(url).includes("/auth/login")) {
          return { ok: true, status: 200, json: async () => ({ accessToken: "t" }) };
        }
        throw new Error("network down");
      }),
    );
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("unknown");
  });

  it("returns unknown when the service login fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 401, json: async () => ({}) })),
    );
    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: ZOIKO_GROUP,
    });
    expect(result.status).toBe("unknown");
    expect(result.source).toBe("none");
  });
});

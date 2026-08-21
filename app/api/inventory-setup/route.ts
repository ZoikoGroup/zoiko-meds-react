// Public alias for the internal handler, matching app/api/contact and
// app/api/appointments. Previously a near-copy that had drifted — weaker email
// validation and a different field list — so it now shares one implementation.
export { POST } from "@/app/internal/inventory-setup/route";

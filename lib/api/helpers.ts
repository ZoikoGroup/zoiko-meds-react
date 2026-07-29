import { NextResponse } from "next/server";

export function successResponse(data: unknown, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(
  error: string,
  status: number = 400,
  details?: Record<string, unknown>
) {
  return NextResponse.json(
    { success: false, error, ...(details ? { details } : {}) },
    { status }
  );
}

export function validateRequired(body: Record<string, unknown>, fields: string[]): string | null {
  for (const field of fields) {
    const value = body[field];
    if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
      return field;
    }
  }
  return null;
}

export const API_BASE_URL = "https://shopboard-api.vercel.app";

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchJson<T>(
  path: string,
  parse: (data: unknown) => T,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  } catch (error) {
    const detail = error instanceof Error ? `: ${error.message}` : "";
    throw new ApiError(`Network request failed${detail}`, 0);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiError("The API returned invalid JSON", response.status);
  }

  return parse(data);
}

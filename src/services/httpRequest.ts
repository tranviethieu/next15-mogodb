// services/httpRequest.ts
export async function httpRequest<T = any>({
  http,
}: {
  http: Promise<Response>;
}): Promise<T> {
  const res = await http;

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Lỗi không xác định");
  }

  return res.json();
}

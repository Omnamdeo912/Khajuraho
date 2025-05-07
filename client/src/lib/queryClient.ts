import { QueryClient, QueryFunction } from "@tanstack/react-query";

export type UnauthorizedBehavior = "returnNull" | "throw";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const error = new Error(await res.text());
    (error as any).status = res.status;
    throw error;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const apiRequest = async (
  method: string,
  path: string,
  body?: any
): Promise<Response> => {
  const res = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
};

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    // Always return data even if unauthorized
    if (res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

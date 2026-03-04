import { useEffect } from "react";
import { subscribe, connectSocket } from "../api/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { Call } from "../types";

export function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectSocket();
    const unsubscribe = subscribe((update: Partial<Call>) => {
      queryClient.setQueryData<Call[]>(["calls"], (calls = []) =>
        calls.map((call) =>
          call.id === update.id ? { ...call, ...update } : call,
        ),
      );
    });

    return () => unsubscribe();
  }, [queryClient]);
}

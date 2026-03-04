import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCalls, updateCallStatus } from "../api/calls";
import type { Call, UpdateCallStatusInput } from "../types";

export function useCalls() {
  const queryClient = useQueryClient();

  const callsQuery = useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,
    refetchOnWindowFocus: true,
  });

  const updateStatus = useMutation({
    mutationFn: updateCallStatus,

    onMutate: async ({ id, status }: UpdateCallStatusInput) => {
      await queryClient.cancelQueries({ queryKey: ["calls"] });

      const prev = queryClient.getQueryData<Call[]>(["calls"]);

      queryClient.setQueryData<Call[]>(["calls"], (calls = []) =>
        calls.map((call) => (call.id === id ? { ...call, status } : call)),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["calls"], ctx?.prev);
    },
  });

  return { callsQuery, updateStatus };
}

import { useUIStore } from "../store/uiStore";
import { useCalls } from "../hooks/useCalls";

export function CallDetails() {
  const selectedCallId = useUIStore((s) => s.selectedCallId);
  const { callsQuery, updateStatus } = useCalls();
  const call =
    callsQuery.data?.find((currentCall) => currentCall.id === selectedCallId) ??
    null;

  if (callsQuery.isPending)
    return <div className="flex items-center justify-center">Loading...</div>;

  if (callsQuery.isError)
    return (
      <div className="flex items-center justify-center">
        {callsQuery.error.message}
      </div>
    );

  if (!call)
    return (
      <div className="flex items-center justify-center">Select a call</div>
    );

  if (updateStatus.isError)
    return (
      <div className="flex items-center justify-center">
        {updateStatus.error.message}
      </div>
    );

  return (
    <div className="flex items-center justify-center">
      <div>
        <h2>{call.phone}</h2>
        <p>Status: {call.status}</p>

        <button
          type="button"
          disabled={updateStatus.isPending}
          onClick={() => updateStatus.mutate({ id: call.id, status: "hold" })}
        >
          {updateStatus.isPending ? "Updating..." : "Hold"}
        </button>
      </div>
    </div>
  );
}

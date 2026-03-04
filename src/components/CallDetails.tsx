import { useUIStore } from "../store/uiStore";
import { useCalls } from "../hooks/useCalls";

export function CallDetails() {
  const call = useUIStore((s) => s.selectedCall);
  const { updateStatus } = useCalls();

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

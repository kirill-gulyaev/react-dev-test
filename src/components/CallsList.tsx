import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./Calltem";

export function CallsList() {
  const { callsQuery } = useCalls();

  if (callsQuery.isPending) return <div>Loading calls...</div>;
  if (callsQuery.isError) return <div>{callsQuery.error.message}</div>;
  if (callsQuery.data.length === 0) return <div>No calls found.</div>;

  return (
    <div className="h-screen overflow-auto">
      {callsQuery.data!.map((call) => (
        <CallItem key={call.id} call={call} />
      ))}
    </div>
  );
}

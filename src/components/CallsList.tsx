import { List, type RowComponentProps } from "react-window";
import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./Calltem";
import type { Call } from "../types";

type CallsRowProps = {
  calls: Call[];
};

function CallsRow({
  ariaAttributes,
  calls,
  index,
  style,
}: RowComponentProps<CallsRowProps>) {
  return (
    <CallItem
      call={calls[index]}
      style={style}
      ariaAttributes={ariaAttributes}
    />
  );
}

export function CallsList() {
  const { callsQuery } = useCalls();

  if (callsQuery.isPending) return <div>Loading calls...</div>;
  if (callsQuery.isError)
    return (
      <>
        <p>{callsQuery.error.message}</p>
        <button type="button" onClick={() => void callsQuery.refetch()}>
          Retry
        </button>
      </>
    );
  if (callsQuery.data.length === 0) return <div>No calls found.</div>;

  return (
    <div className="h-screen">
      <List
        rowComponent={CallsRow}
        rowCount={callsQuery.data.length}
        rowHeight={68}
        rowProps={{ calls: callsQuery.data }}
        overscanCount={8}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

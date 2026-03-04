import { memo } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { useUIStore } from "../store/uiStore";
import type { Call } from "../types";

type CallItemProps = {
  call: Call;
  style?: CSSProperties;
  ariaAttributes?: HTMLAttributes<HTMLDivElement>;
};

export const CallItem = memo(function CallItem({
  call,
  style,
  ariaAttributes,
}: CallItemProps) {
  const isSelected = useUIStore((s) => s.selectedCallId === call.id);
  const setSelectedCallId = useUIStore((s) => s.setSelectedCallId);

  return (
    <div style={style} {...ariaAttributes}>
      <div
        onClick={() => setSelectedCallId(call.id)}
        className={`border-b p-3 cursor-pointer ${
          isSelected ? "bg-gray-100" : ""
        }`}
      >
        <div>{call.phone}</div>
        <div>{call.status}</div>
      </div>
    </div>
  );
});

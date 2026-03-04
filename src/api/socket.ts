import type { Call } from "../types";

type Listener = (update: Partial<Call>) => void;

const listeners: Listener[] = [];

export function connectSocket() {
  setInterval(() => {
    const callId = String(Math.floor(Math.random() * 1000));
    const update: Partial<Call> = {
      id: callId,
      status: Math.random() > 0.5 ? "active" : "hold",
      updatedAt: Date.now(),
    };
    listeners.forEach((l) => l(update));
  }, 1000);
}

export function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {};
}

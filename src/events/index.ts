export * from "./event-bus";

import { registerUserEvents } from "./user-events";

export function registerEvents() {
  registerUserEvents();
}

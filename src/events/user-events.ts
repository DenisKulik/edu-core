import { eventBus } from "./event-bus";

export function registerUserEvents() {
  eventBus.on("user:created", (user) => {
    console.log("User created:", user.email);
  });

  eventBus.on("user:login", (user) => {
    console.log("User login:", user.email);
  });
}

import { Database } from "./database.types";

export type Trip = Database["public"]["Tables"]["trips"]["Row"]
export type Activity = Database["public"]["Tables"]["activities"]["Row"]
import { Database, Tables } from "./database.types";

export type Trip = Tables<'trips'>
export type Activity = Tables<'activities'>
export type GeocodeSearchResult = {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
}
export type FormType = "create" | "edit";
export type Link = {
    href: string;
    label: string;
}
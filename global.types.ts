import { Tables } from "./database.types";

export type Trip = Tables<"trips">;
export type Profile = Tables<"profiles">;
export type Activity = Tables<"activities">;

export type FormType = "create" | "edit";
export type Link = {
  href: string;
  label: string;
};

export type MapboxGeocodingFeature = {
  /**
   * Feature id. This property is named "id" to conform to the GeoJSON specification, but is the same id referred to as mapbox_id elsewhere in the response.
   */
  id: string;
  /**
   * "Feature", a GeoJSON type from the GeoJSON specification.
   */
  type: "Feature";
  /**
   * 	An object describing the spatial geometry of the returned feature.
   */
  geometry: {
    type: "Point";
    /**
     * An array in the format [longitude,latitude] at the center of the specified bbox.
     */
    coordinates: [number, number];
  };
  properties: {
    /**
     *  Feature id. The mapbox_id uniquely identifies a place in the Mapbox search database. Mapbox ID’s are accepted in requests to the Geocoding API as a forward search, and will return the feature corresponding to that id.
     */
    mapbox_id: string;
    /**
     * A string describing the type of the feature.
     */
    feature_type:
      | "country"
      | "region"
      | "postcode"
      | "district"
      | "place"
      | "locality"
      | "neighborhood"
      | "street"
      | "address";
    /**
     * Formatted string of address_number and street.
     */
    name: string;
    /**
     * 	The canonical or otherwise more common alias for the feature name. For example, searching for "America" will return "America" as the name, and "United States" as name_preferred.
     */
    name_preferred: string;
    /**
     * 	Full formatted string of the feature, combining name_preferred and place_formatted.
     */
    place_formatted: string;
    /**
     * 	Formatted string of result context: place region country postcode. The part of the result which comes after {name}.
     */
    full_address: string;
    /**
     * 		A {@link https://docs.mapbox.com/api/search/geocoding#the-context-object | context} object is an object representing the hierarchy of encompassing parent features. This may include a sub-object for any of the following properties: country, region, postcode, district, place, locality, neighborhood, street.
Which sub-objects are included is dependent upon the data coverage available and applicable to a given country or area.
     */
    context: object;
    /**
     * An object representing the geographical position and accuracy of the feature any routable points.
     */
    coordinates: {
      longitude: number;
      latitude: number;
      /**
       * 	Accuracy metric for a returned address-type result. See {@link https://docs.mapbox.com/api/search/geocoding#point-accuracy-for-address-features | Point accuracy for address features} below.
       */
      accuracy: string;
      /**
       * 	An array of routable point objects for an address feature, each including name, longitude, and latitude properties.
       */
      routable_points: any[];
    };
    /**
     * 	The bounding box of the feature as an array of [minLon,minLat,maxLon,maxLat]. This property is only provided with features of type country, region, postcode, district, place, locality, or neighborhood.
     */
    bbox?: any[];
    /**
     * Additional metadata indicating how the result components match to the input query. See {@link https://docs.mapbox.com/api/search/geocoding#smart-address-match | Smart Address Match} below.
     */
    match_code: object;
  };
};

export type MapboxGeocodingResponse = {
  type: "FeatureCollection";
  attribution: string;
  features: MapboxGeocodingFeature[];
};
/** Local WordPress REST API only. Do not add production URLs here. */
export const WORDPRESS_REST_BASE =
  "http://localhost/easy-travels-wp/wp-json/wp/v2";

/**
 * WordPress registers this CPT as `tour_packages` (`rest_base`).
 * `/tour-packages` (hyphen) currently 404s with `rest_no_route`.
 */
export const WORDPRESS_TOUR_PACKAGES_PATH = "/tour_packages";

/**
 * Destination CPT rest_base can be `destinations` or `destination`
 * depending on how the post type is registered in WordPress.
 */
export const WORDPRESS_DESTINATIONS_PATHS = [
  "/destinations",
  "/destination",
] as const;


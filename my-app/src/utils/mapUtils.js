import { maxBy, minBy } from "lodash";
export const getMinOrMax = (
  markers,
  minOrMax,
  latOrLng
) => {
  if (minOrMax === "max") {
    return (maxBy(markers, (value) => value[latOrLng]))[latOrLng];
  } else {
    return (minBy(markers, (value) => value[latOrLng]))[latOrLng];
  }
};

export const getBounds = (markers) => {
  const maxLat = getMinOrMax(markers, "max", "latitude");
  const minLat = getMinOrMax(markers, "min", "latitude");
  const maxLng = getMinOrMax(markers, "max", "longitude");
  const minLng = getMinOrMax(markers, "min", "longitude");

  const southWest = [minLng, minLat];
  const northEast = [maxLng, maxLat];
  return [southWest, northEast];
}

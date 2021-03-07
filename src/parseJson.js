import { compose, toUpper, toLower, head, tail, converge, concat, curry, __, lensProp, map, view, assoc, set, over }  from "ramda";
import { setOnPath } from "ramda-godlike";

// Change all letters of word to lowercase and first one to uppercase
const firstLetterToUpper = compose(toUpper, head);
const restToLower = compose(toLower, tail);
export const capitalizeWord = converge(concat, [firstLetterToUpper, restToLower]);

// Update value with key of an object
const changeOnKey = curry((key, obj) => over(lensProp(key), capitalizeWord, obj));

// Update car object
const updateCar = compose(
    changeOnKey("interior"),
    changeOnKey("exterior"),
);

export default over(
    lensProp("placemarks"),
    map(updateCar)
);
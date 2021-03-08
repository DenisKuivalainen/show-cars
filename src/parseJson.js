import { compose, toUpper, toLower, head, tail, converge, concat, curry, __, lensProp, map, view, assoc, set, over }  from "ramda";

// Change all letters of word to lowercase and first one to uppercase
const firstLetterToUpper = compose(toUpper, head);
const restToLower = compose(toLower, tail);
const capitalizeWord = converge(concat, [firstLetterToUpper, restToLower]);

// Update value with key of an object
const changeOnKey = curry((key, obj) => over(lensProp(key), capitalizeWord, obj));

// Update car object
const updateCar = compose(
    changeOnKey("interior"),
    changeOnKey("exterior"),
);

export const parseJson = over(
    lensProp("placemarks"),
    map(updateCar)
);
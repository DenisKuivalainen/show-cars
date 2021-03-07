import { FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { compose, curry, keys, lensProp, set, uniqBy, __, map, view, toPairs, join, filter, reduce, test, length } from "ramda";
import { useState } from "react";
import table from "./table";

const option = val => <MenuItem key={val} value={val}>{val}</MenuItem>

const filterSelect = curry((title, options, value, changeValue, multiple = false) => {
    return (
        <FormControl style={{width: "15%", marginLeft: 10}}>
            <InputLabel>{title}</InputLabel>
            <Select
            multiple={multiple}
            value={value}
            onChange={e => changeValue(e.target?.value)}
            input={<Input />}
            >
                {map(option, options)}
            </Select>
        </FormControl>
    )
});

const viewOnProp = prop => view(lensProp(prop));
const getUnicValues = prop => compose(map(viewOnProp(prop)), uniqBy(viewOnProp(prop)));

export default (data) => {
    const [fuel, setFuel] = useState("any");
    const [filterParams, setFilterParams] = useState({interior: [], exterior: [], engineType: []});

    // Set filterParams
    const changeParam = param => compose(setFilterParams, set(lensProp(param), __, filterParams));

    const boolsOfDataObj = obj => compose(
        reduce((x, y) => x && y, obj["fuel"] >= (fuel === "any" ? 0 : fuel)), // result of all tests
        map(fnArr => fnArr[1](obj[fnArr[0]])), // refults of check on filterParams
        toPairs, // [[k, fn]]
        map(arr => length(arr) > 0 ? test(new RegExp(join("|", arr))) : () => true) // [{k: }
    )(filterParams);

    return [
        filterSelect("fuel", ["any", 25, 50, 75, 100], fuel, setFuel),
        compose(map(param => filterSelect(param, getUnicValues(param)(data), filterParams[param], changeParam(param), true)), keys)(filterParams),
        table(filter(boolsOfDataObj, data))
    ]
}
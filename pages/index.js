import { tabs } from "../src/tabs"
import carsData from "../locations.json";
import { parseJson } from "../src/parseJson";
import { filtration } from "../src/filtration";
import { map } from "../src/map";

export default ({placemarks}) => {


    return tabs(
        ["Section 1", "Section 2"],
        [
            filtration(placemarks),
            map(placemarks)
        ]
    )
}

// Server side fetch
export async function getServerSideProps(context) {
    return {
        props: parseJson(carsData)
    }
}
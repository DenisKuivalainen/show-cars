import { mapIndexed } from "ramda-godlike";
import { parseJson } from "../../../src/parseJson";

let fakeData = {  
    "placemarks":[  
        {  
            "address":"Lesserstraße 170, 22049 Hamburg",
            "coordinates":[  
                10.07526,
                53.59301,
                0
            ],
            "engineType":"CE",
            "exterior":"UNACCEPTABLE",
            "fuel":42,
            "interior":"UNACCEPTABLE",
            "name":"HH-GO8522",
            "vin":"WME4513341K565439"
        },
        {  
            "address":"Grosse Reichenstraße 7, 20457 Hamburg",
            "coordinates":[  
                9.99622,
                53.54847,
                0
            ],
            "engineType":"CE",
            "exterior":"UNACCEPTABLE",
            "fuel":45,
            "interior":"GOOD",
            "name":"HH-GO8480",
            "vin":"WME4513341K412697"
        }
    ]
}

let expectedResult = {  
    "placemarks":[  
        {  
            "address":"Lesserstraße 170, 22049 Hamburg",
            "coordinates":[  
                10.07526,
                53.59301,
                0
            ],
            "engineType":"CE",
            "exterior":"Unacceptable",
            "fuel":42,
            "interior":"Unacceptable",
            "name":"HH-GO8522",
            "vin":"WME4513341K565439"
        },
        {  
            "address":"Grosse Reichenstraße 7, 20457 Hamburg",
            "coordinates":[  
                9.99622,
                53.54847,
                0
            ],
            "engineType":"CE",
            "exterior":"Unacceptable",
            "fuel":45,
            "interior":"Good",
            "name":"HH-GO8480",
            "vin":"WME4513341K412697"
        }
    ]
}

it("test parseJson", () => {
    let testObj = parseJson(fakeData).placemarks;
    let expObj = expectedResult.placemarks;

    mapIndexed((obj, k) => {
        expect(obj).to.deep.equal(expObj[k]);
    }, testObj)
    
});
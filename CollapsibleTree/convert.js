//Converted 0 is the main 
var converted = {
    "name": "Locations",
    "parent": "null",
    "children": []
};
//Iterate through every single location in the array.
var locTypeList = [];
for (let i = 0; i < population.locations.length; i++) {

    /* This is to populate location types
    check if the location type is already added, so no duplicates.
    If not, then add it in; else ignore */
    if(!locTypeList.includes(population.locations[i].location_type)) {

        locTypeList.push(population.locations[i].location_type)

        let obj = {
            "name": population.locations[i].location_type,
            "parent": "Locations",
            "children": [],
        }
        converted.children.push(obj);
    }

    //Adding the individual locations into the location type
    let obj2 = {
            "name": population.locations[i].name,
            "parent": population.locations[i].location_type,
            "children": []
        }

    for (let j = 0; j < converted.children.length; j++) { //Iterating through all the location types

        if (converted.children[j].name == population.locations[i].location_type) { //If the individual location matches type, add it to that one.
            converted.children[j].children.push(obj2);
        }
    }
}

for (let i = 0; i < population.locations.length; i++) { //go through data's locations
    relationshipType = []; //unique relationships array per location
    for(let j = 0; j < population.locations[i].relationships.length; j++) { //go through the relationships

            if(!relationshipType.includes(population.locations[i].relationships[j][0])){ //if not in array, add it so no duplicates.
                relationshipType.push(population.locations[i].relationships[j][0]);

                for (let k = 0; k < converted.children.length; k++) { //iterate through our converted array for location type
                    for(let l = 0; l < converted.children[k].children.length; l++){ //iterate once more per unique location
                        if (converted.children[k].children[l].name == population.locations[i].name) { //see if the location from data matches converted data
                            converted.children[k].children[l].children.push({ //if it does, then add it along with it's first child character.
                                "name": population.locations[i].relationships[j][0],
                                "children": [{
                                    "name":getCharName(population.locations[i].relationships[j][1]),
                                    "children": []
                                }]
                            })
                        }
                    }
                }
            }
            else { //if it's in array and it's already established
                for (let k = 0; k < converted.children.length; k++) {
                    for(let l = 0; l < converted.children[k].children.length; l++){ //iterate through the converted data's specific location
                        if (converted.children[k].children[l].name == population.locations[i].name) { //if it's already in there, make sure they match
                            for(let m = 0; m < converted.children[k].children[l].children.length; m++){ //iterate through the different relationship types

                                if (converted.children[k].children[l].children[m].name == population.locations[i].relationships[j][0]){ //when it matches the character we're dealing with
                                    converted.children[k].children[l].children[m].children.push({ //push that character into existing type already.
                                        "name": getCharName(population.locations[i].relationships[j][1]),
                                        "children": [] 
                                    });

                                }
                            }
                        }
                    }
                }
            }
        
    }
}

//get character name when we pass in their ID
function getCharName(charId) {
    for (let i = 0; i < population.characters.length; i++){ //iterate through all characters
        if(population.characters[i].id == charId) {
            return population.characters[i].name;
        }
    }
}

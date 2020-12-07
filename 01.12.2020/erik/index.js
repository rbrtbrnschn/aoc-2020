const rawInput = require("./liste");
const liste = rawInput.split("\n")
let breakNeeded = false;

for (let index = 0; index < liste.length; index++) {
    const element = parseInt(liste[index]);
    if(breakNeeded == true) break;
    
    for (let index = 0; index < liste.length; index++) {
        const element2 = parseInt(liste[index]);
        if(breakNeeded == true) break;

            for (let index = 0; index < liste.length; index++) {
                const element3 = parseInt(liste[index]);
                const added = element + element2 + element3

                if(added == 2020)
                {
                    const result = element*element2*element3
                    console.log("Ergebnis: ",result)
                    breakNeeded = true;
                }

            }

    }
}

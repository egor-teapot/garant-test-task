// import { appStart } from './src/server'

// appStart()

/*
Задача

https://www.gangofcoders.net/solution/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by/
*/

const fs = require('node:fs')

// Заставить создавать динамически вложенные обьекты
const sortObject = (data) => {

    let orderedObject = {}

    // проходит по каждому обьекту массива
    for(let I = 0; I < data.length; I++) { // прохожусь по каждому элементу обьекта
        const element =  data[I].value
        const arrayOfSubstrings = element.split("\\")
        
        orderedObject = []

        // let buff = {test: {}}
        // let buffObject = {value: arrayOfSubstrings[0], dependent: []}
        // for(let J = 0; J < arrayOfSubstrings.length; J++) {


            // Object.assign(orderedObject, [{value: arrayOfSubstrings[J], dependent: []}])            
            // orderedObject.push(buffObject)            
            
            // buffObject = orderedObject[0].dependent
            // buffObject = buffObject[0].dependent         
            // console.log(buffObject)
            
            
            
            // Object.assign(Object.values(orderedObject)[0], buff)
            // Object.assign("value", arrayOfSubstrings)

            // break
        // }

        function rec(targetObject, targetArray) {
            

            return rec()
        }
        
        // Object.assign(Object.values(buff)[0], {test: "apple"})
        
    }

    return orderedObject
}

fs.readFile('./map.txt', {encoding: "utf-8"}, (err, data)=> {
    const dataJSON = JSON.parse(data)


    const out = sortObject(dataJSON)
    console.log(out)
})
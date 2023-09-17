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

function objectOrderer(data) {
    let out = []
    
    function findNextObject(arrayOfObjects, targetParameter, targetValue) {
        /*
            for (I для каждого обьекта в массиве)
                if(в списке есть обьект с искомым значением) 
                    return позицию этого обьекта
                else
                    return null
        */

        // try {
            for(let I = 0; I < arrayOfObjects.length; I++) {
                // console.log(`INSPECTING OBJECT >> ${arrayOfObjects[I]} \n`)
                if(arrayOfObjects[I][targetParameter] === targetValue) return I
                else return null
            }
        // }
        // catch(err) {
            // console.error(`FindNextObjec fun ERR: \n ${err} \n`)
            // return undefined
        // }

     
    }

    function hierarchySort(iterator = 0, targetObjectAdress, object, array) {
        // console.log(JSON.stringify(out))
        // console.log(`ITERATION >> ${iterator} \n SUBSTR >> ${array[iterator]} \n`)        
        

        // checking existing object
        let nextObject = object
        if(findNextObject(object, "value", array[iterator]) == null) {
            object.push({value: array[iterator], dependent: []})
            recursionDirection = object.length - 1
            nextObject = object[recursionDirection].dependent

        }
        else {
            recursionDirection = findNextObject(object, "value", array[iterator])
            nextObject = object[recursionDirection].dependent

        }

        
        
        // const nextObject = object[0].dependent // заглушка
        // проблема здесь         ^ смотри задачу в планшете

        
        if(iterator >= array.length - 1) return
        hierarchySort(iterator += 1, targetObjectAdress, nextObject, array)
    } // hierarchySort


    // прохожусь по каждому элементу массива
    for(let I = 0; I < data.length; I++) {
        const arrayOfSubstrings = data[I].value.split("\\")
        
        hierarchySort(0, I, out, arrayOfSubstrings)
        // break // заглушка
    } // loop for I

    return out
} // fun objectOrderer


fs.readFile('./map.txt', {encoding: "utf-8"}, (err, data)=> {
    const dataJSON = JSON.parse(data)


    const out = objectOrderer(dataJSON)
    fs.writeFile("./OUTPUT.txt", JSON.stringify(out), (err) => {
        console.log(err)
    })
    // console.log(out)
})
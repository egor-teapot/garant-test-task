const testData = [
    {value: "a\\b\\c\\d\\e\\f\\g"},
    {value: "a\\b\\c1\\d1"},
    {value: "a1\\b\\c\\d\\e"},
    {value: "a\\b"}
]


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

        try {
            for(let I = 0; I < arrayOfObjects.length; I++) {
                console.log(`INSPECTING OBJECT >> ${arrayOfObjects[I]} \n`)
                if(arrayOfObjects[I][targetParameter] == targetValue) return I
                else return null
            }
        }
        catch(err) {
            console.error(`FindNextObjec fun ERR: \n ${err} \n`)
            return undefined
        }

     
    }

    function hierarchySort(iterator = 0, targetObjectAdress, object, array) {
        console.log(JSON.stringify(out))
        console.log(`ITERATION >> ${iterator} \n SUBSTR >> ${array[iterator]} \n`)        
        

        // checking existing object
        let nextObject = object
        let recursionDirection = findNextObject(object, "value", array[iterator])
        if(recursionDirection == null) {
            object.push({value: array[iterator], dependent: []})
            recursionDirection = object.length - 1

        }
        else {
            recursionDirection = object.length - 1
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

console.log(`\n OUTPUT >> \n ${JSON.stringify(objectOrderer(testData))}`)






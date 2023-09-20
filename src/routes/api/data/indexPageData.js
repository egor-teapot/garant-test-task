const fs = require('node:fs')
const path = require('node:path')
const express = require('express')
const router = express.Router()



// Переписать вункцию так чтобы она выдавала список обьектов с такимиже параметрами + параметр глубины
function objectOrderer(data) {
    let out = []
    
    function findNextObject(arrayOfObjects, targetParameter, targetValue) {

      for(let I = 0; I < arrayOfObjects.length; I++) {
        // console.log(`SEACHING ${targetValue} COMPARE TO ${arrayOfObjects[I][targetParameter]}`)
        if(arrayOfObjects[I][targetParameter] == targetValue) {
          // console.log(">> FOUND \n")
          return I
        }
      }
      // console.log(">> NOT FOUND")
      return null
    }


    function hierarchySort(iterator = 0, targetObjectAdress, object, array) {
        // console.log(`ITERATION >> ${iterator} "${array[iterator]}" \n`)        
        if(iterator >= array.length - 1) return

        const nextObjectAdress = findNextObject(object, "value", array[iterator])

        if(nextObjectAdress == null) {
            // console.log("PUSH \n")

            object.push({value: array[iterator], dependent: []})

            hierarchySort(iterator += 1, nextObjectAdress, object[object.length - 1].dependent, array)

        } else {
            // console.log("FOLLOW \n")
            
            hierarchySort(iterator += 1, nextObjectAdress, object[nextObjectAdress].dependent, array)

        }

    } // hierarchySort

    // прохожусь по каждому элементу массива
    for(let I = 0; I < data.length; I++) {
        const arrayOfSubstrings = data[I].value.split("\\")
        
        hierarchySort(0, I, out, arrayOfSubstrings)
        // break // заглушка
    } // loop for I

    return out
} // fun objectOrderer

fs.readFile(path.join(__dirname, "../../../data/map.txt"), {encoding: "utf-8"}, (err, data)=> {

  const out = objectOrderer(JSON.parse(data))

  router.get("/", (req, res) => {
    res.send(out)
  })

})



module.exports = {router}
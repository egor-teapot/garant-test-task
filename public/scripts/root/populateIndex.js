// https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

let listNode = document.createElement('ul')

function populateIndex(listNode, data) {

    function recursion(listNode, data) {
      console.log("recursion loop " + data.value)
      console.log(data.dependent)
      
      let details = document.createElement('details')
      let summary = document.createElement('summary')
      
      let listElement = document.createElement('li')
      let subList = document.createElement('ul')
      
      summary.innerHTML = data.value
      details.appendChild(summary)
      listElement.appendChild(details)
      details.appendChild(subList)       

      if(data.dependent.length == 0) {
        listElement.innerHTML = data.value
        listNode.appendChild(listElement)       
        return
      }
      
      listNode.appendChild(listElement)

      for(let I = 0; I < data.dependent.length; I++) {
        recursion(subList, data.dependent[I])
      }
    }
    
    for(let I = 0; I < data.length; I++) {
        console.log("initial loop " + I + " " + data[I].value)
        recursion(listNode, data[I])
    }
    

}

setTimeout(function() {
    getJSON("http://localhost:3000/api/index-page-data/", function(err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
          } else {
            // console.log('Your query count: ' + data[0].value);
            populateIndex(listNode, data)

            // document.body.appendChild(listNode)
            document.body.querySelector('.result').appendChild(listNode)
          }
    })
}, 100)


var Data = '<html><body><h1>TITRE</h1><p>This is a paragraph<div><h2>TITRE 2</h2></div></p></body></html>'

Data = Data.replace(/>/gi, '>,')
Data = Data.replace(/</gi, ',<')

Data = Data.split(',')

var List = []
var Previous

var RegEx = /<(.*)>/

for (var i = 0; i < Data.length; i++) {
  var Json = {}

  if (Data[i].match(RegEx) !== null && Previous === undefined) {
    Previous = Data[i]
    Json = {'Name':Data[i],'Value':Data[i]}
    List.push(Json)
  } 

  else if (Data[i].match(RegEx) !== null && Previous !== undefined && Data[i].includes('</') === false) {

   if (Data[i+1].match(RegEx) === null) {
      for (var j = i+1; j < Data.length; j++) {
         if (Data[j].match(RegEx) !== null && Data[j].includes('</') === true) {
           Json = {'Name':Data[i],'Value':Data[i+1], 'Parent': Previous}
           break
         }
         if (Data[j].match(RegEx) !== null && Data[j].includes('</') === false) {
           Json = {'Name':Data[i],'Value':Data[i+1], 'Parent': Previous}
           Previous = Data[i]
           break
        }
      }
    } 

    else if (Data[i+1].match(RegEx) !== null) {
      Json = {'Name':Data[i],'Value':Data[i], 'Parent': Previous}
      Previous = Data[i]
    }
    List.push(Json)
  }

  if (Data[i].includes('</') === true) {
    var FindParent = Data[i].replace('/','')
    for (var j = List.length - 1; j >= 0; j--) {
       if (List[j]['Name'] === FindParent) {
         Previous = List[j]['Parent']
         break
       }
    }
  }
}

var Child = 0
for (var j = List.length - 1; j >= 0; j--) {
  for (var k = j+1; k >= 0; k--) {
    if (k < List.length - 1) {
     if (List[j]['Parent'] === List[k]['Name'] && List[j] !== List[k]) {
        List[k]['Children_'+Child] = List[j]
        Child+=1
        break
     }
    }
  }
}

console.log(JSON.stringify(List[0]))

/*
{
    "Name":"<html>","Value":"<html>","Parent":"<html>",
    "Children_4":{
        "Name":"<body>","Value":"","Parent":"<html>",
        "Children_2":{
            "Name":"<p>","Value":"This is a paragraph","Parent":"<body>",
            "Children_1":{
                "Name":"<div>","Value":"","Parent":"<p>",
                "Children_0":{
                    "Name":"<h2>","Value":"TITRE 2","Parent":"<div>"
                }
            }
        },
        "Children_3":{"Name":"<h1>","Value":"TITRE","Parent":"<body>"}
    }
}
*/

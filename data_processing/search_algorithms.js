var List = [
    [5,"Eva"],
    [6,"Marc"],
    [7,"Marius"],
    [2,"Thomas"],
    [3,"Marion"],
    [4,"Sandrine"],
    [8,"Marco"],
    [9,"Sébastien"],
    [1,"Simon"]
]

function BinarySearch (List,Index,Column) {

    var First = 0
    var Last = List.length - 1

    while (First <= Last) {
     var Middle = Math.floor((First+Last)/2)
       if (List[Middle][Column] < Index) {
         First = Middle + 1
       } else if (List[Middle][Column] > Index) {
         Last = Middle - 1
       } else {
         return List[Middle]
       }
    }
    return false
}

console.log(BinarySearch(List,1,0))
console.log(BinarySearch(List,9,0))
console.log(BinarySearch(List,12,0))

/*
[ 1, 'Simon' ]
[ 9, 'Sébastien' ]
false
*/

var List = [
    {id:1,name:"Simon"},
    {id:2,name:"Thomas"},
    {id:3,name:"Marion"},
    {id:4,name:"Sandrine"},
    {id:5,name:"Eva"},
    {id:6,name:"Marc"},
    {id:7,name:"Marius"},
    {id:8,name:"Marco"},
    {id:9,name:"Sébastien"}
]

function BinarySearchJSON (List,Index,ColumnName) {
    var First = 0
    var Last = List.length - 1
    while (First <= Last) {
       var Middle = Math.floor((First+Last)/2)
       if (List[Middle][ColumnName] < Index) {
         First = Middle + 1
       } else if (List[Middle][ColumnName] > Index) {
         Last = Middle - 1
       } else {
         return List[Middle]
       }
    }
    return false
}

console.log(BinarySearchJSON(List,1,"id"))
console.log(BinarySearchJSON(List,9,"id"))
console.log(BinarySearchJSON(List,12,"id"))

/*
{ id: 1, name: 'Simon' }
{ id: 9, name: 'Sébastien' }
false
*/

var List = [
    [1,"Simon"],
    [1,"Lea"],
    [2,"Thomas"],
    [3,"Marion"],
    [4,"Sandrine"],
    [5,"Eva"],
    [6,"Marc"],
    [7,"Marius"],
    [8,"Marco"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"]
]

function BinarySearchList (List,Index,Column) {
    var First = 0
    var Last = List.length - 1
    while (First <= Last) {
       var Middle = Math.floor((First+Last)/2)
       if (List[Middle][Column] < Index) {
         First = Middle + 1
       } else if (List[Middle][Column] > Index) {
         Last = Middle - 1
       } else {
         var Values = []
         Values.push(List[Middle])
         if (List[Middle-1] !== undefined) {
           if (List[Middle-1][Column] === Index) {
             for (var i = Middle-1; i > -1; i--) {
               if (List[i][Column] === Index) {
                 Values.push(List[i])
               } else {
                 break
               }
             }
           }
         }
         if (List[Middle+1] !== undefined) {
           if (List[Middle+1][Column] === Index) {
              for (var i = Middle+1; i < List.length; i++) {
                if (List[i][Column] === Index) {
                  Values.push(List[i])
                } else {
                  break
                }
              }
           }
         }
         return Values
       }
    }
    return false
}

console.log(BinarySearchList(List,1,0))
console.log(BinarySearchList(List,9,0))
console.log(BinarySearchList(List,6,0))
console.log(BinarySearchList(List,12,0))

/*
[ [ 1, 'Lea' ], [ 1, 'Simon' ] ]
[
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ]
]
[ [ 6, 'Marc' ] ]
false
*/

function JumpSearch (List,Index,Column) {

    var First = 0
    var Step = Math.floor(Math.sqrt(List.length))

    while (List[Step-1][Column] < Index) {
       First = Step  
       Step = Step + Math.floor(Math.sqrt(List.length))
       if (First >= List.length) {
         return false
       }
    }
    for (var i = First; i < Step; i++) {
       if (List[i][Column] === Index) {
         return List[i]
       }
    }
    return false
}

console.log(JumpSearch(List,1,0))
console.log(JumpSearch(List,9,0))
console.log(JumpSearch(List,12,0))

/*
[ 1, 'Simon' ]
[ 9, 'Sébastien' ]
false
*/

var List = [
    {id:1,name:"Simon"},
    {id:2,name:"Thomas"},
    {id:3,name:"Marion"},
    {id:4,name:"Sandrine"},
    {id:5,name:"Eva"},
    {id:6,name:"Marc"},
    {id:7,name:"Marius"},
    {id:8,name:"Marco"},
    {id:9,name:"Sébastien"}
]

function JumpSearchJSON(List,Index,ColumnName) {
    var First = 0
    var Step = Math.floor(Math.sqrt(List.length))
    while (List[Step-1][ColumnName] < Index) {
       First = Step  
       Step = Step + Math.floor(Math.sqrt(List.length))
       if (First >= List.length) {
         return false
       }
    }
    for (var i = First; i < Step; i++) {
       if (List[i][ColumnName] === Index) {
         return List[i]
       }
    }
    return false
}

console.log(JumpSearchJSON(List,1,"id"))
console.log(JumpSearchJSON(List,9,"id"))
console.log(JumpSearchJSON(List,12,"id"))

/*
{ id: 1, name: 'Simon' }
{ id: 9, name: 'Sébastien' }
false
*/

var List = [
    [1,"Simon"],
    [1,"Lea"],
    [2,"Thomas"],
    [3,"Marion"],
    [4,"Sandrine"],
    [5,"Eva"],
    [6,"Marc"],
    [7,"Marius"],
    [8,"Marco"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"],
    [9,"Sébastien"]
]

function JumpSearchList(List,Index,Column) {
  var First = 0
  var Step = Math.floor(Math.sqrt(List.length))
  while (List[Step-1][Column] < Index) {
     First = Step  
     Step = Step + Math.floor(Math.sqrt(List.length))
     if (First >= List.length) {
       return false
     }
  }
  var Values = []
  if (List[First][Column] === Index) {
    Values.push(List[First])
    if (List[First+1] !== undefined && List[First+1][Column] === Index) {
      for (var i = First+1; i < List.length; i++) {
        if (List[i][Column] === Index) {
          Values.push(List[i])
        } else {
          break
        }
      }
    } 
    if (List[First-1] !== undefined && List[First-1][Column] === Index) {
      for (var i = First-1; i > -1 ; i--) {
        if (List[i][Column] === Index) {
          Values.push(List[i])
        } else {
          break
        }
      }
    } 
  }
  if (Values.length === 0) {
    return false
  } else {
    return Values
  }
}

console.log(JumpSearchList(List,1,0))
console.log(JumpSearchList(List,9,0))
console.log(JumpSearchList(List,12,0))

/*
[ [ 1, 'Simon' ], [ 1, 'Lea' ] ]
[
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ],
  [ 9, 'Sébastien' ]
]
false
*/

var Grid = [  
   0, 1, 2,
   3, 4, 5,
   6, 7, 8
]

var AIMove

function Win (Grid) {

  var WinSituation = [
     [0,1,2],
     [3,4,5],
     [6,7,8],

     [0,3,6],
     [1,4,7],
     [2,5,8],
     
     [0,4,8],
     [6,4,2]
  ]

  for (var i = 0; i < WinSituation.length; i++) {

    var TestRow = WinSituation[i]
    var RowValues = []

    for (var j = 0; j < TestRow.length; j++) {
       RowValues.push(Grid[TestRow[j]])
    }

    var CrossesWin = function (Value) {
       return Value === 'X'
    }

    var NoughtsWin = function (Value) {
       return Value === 'O'
    }

    if ( RowValues.every(CrossesWin) ) {
      return 1
    } else if ( RowValues.every(NoughtsWin) ) {
      return -1
    }
  }
}

function Minimax (NewGrid, Player) {

   var Available = NewGrid.filter( function(a) {
       return typeof number === 'number'
   })

   if ( Win(NewGrid) === 1 ) {
      return 1
   } else if ( Win(NewGrid) === -1 ) {
      return -1
   } else if (Available.length === 0) {
      return 0
   }

   var Moves = []
   var Scores = []

   for (var i = 0; i < Available.length; i++) {
     var Move

     Move = NewGrid(Available[i])

     NewGrid(Available[i]) = Player
     
     if (Player === 'X') {
       Scores.push(Minimax(NewGrid, 'O'))
     } else {
       Scores.push(Minimax(NewGrid, 'X'))
     }
     NewGrid[Available[i]] = Move
     Moves.push(Move)
  }

  if (Player === 'X') {
    var HighScore = Math.max(...Scores)
    var HighScoreIndex = Scores.indexOf(HighScore)
    AIMove = Moves[HighScoreIndex]
    return Scores[HighScoreIndex]
  } else {
    var LowScore = Math.min(...Scores)
    var LowScoreIndex = Scores.indexOf(LowScore)
    AIMove = Moves[LowScoreIndex]
    return Scores[LowScoreIndex]
  }
}

var Play = 1
var Turn = 1
var AI

while (Play !== 0) {
  var Available = Grid.filter(function (a) {
    return typeof a === 'number'
  })
  if ( (Win(Grid) === 1)  || 
       (Win(Grid) === -1) || 
       (Available.length === 0) ) {
    Play = 0
  } else {
    if (Turn === 1) {
      AI = 'X'
      Turn = 0
    } else {
      AI = 'O'
      Turn = 1
    }
    var Choice = Minimax(Grid, AI)
    Grid[Choice.Position] = AI
    console.log('\n')
    console.log(Grid[0],Grid[1],Grid[2])
    console.log(Grid[3],Grid[4],Grid[5])
    console.log(Grid[6],Grid[7],Grid[8])
  }
}

/*

X 1 2
3 4 5      
6 7 8

X 1 2
3 O 5    
6 7 8

X X 2
3 O 5    
6 7 8

X X O
3 O 5    
6 7 8

X X O
3 O 5    
X 7 8

X X O
O O 5   
X 7 8

X X O
O O X    
X 7 8

X X O
O O X    
X O 8

X X O
O O X    
X O X

*/

var X = [1, 1.5, 2, 2.5, 3, 3.5, 4]
var Y = [1, 2, 2, 4, 3, 1, 2]

var Xcopy = [...X]
Xcopy.sort(function (a, b) {
    return b - a
})

var Middle = Math.floor(Xcopy.length / 2)
var Gammma

if (Xcopy.length % 2) {
    Gamma = Xcopy[Middle]
} else {
    Gamma = (Xcopy[Middle - 1] + Xcopy[Middle]) / 2
}

console.log('Gamma : ' + Gamma)
var TestX = X
for (var i = 0; i < TestX.length; i++) {
    var Scores = []
    var TestValue = TestX[i]
    for (var j = 0; j < X.length; j++) {
        var RepositoryX = X[j]
        var Count = Math.abs(TestValue - RepositoryX) / 2
        var RBF = Math.exp(-((Math.pow(Count, 2)) / 2 * Math.pow(Gamma, 2)))
        Scores.push(RBF)
    }
    var ScoreY = 0
    for (var l = 0; l < Scores.length; l++) {
        ScoreY += Scores[l] * Y[l]
    }
    var ScoreSum = 0
    for (var l = 0; l < X.length; l++) {
        ScoreSum += Scores[l]
    }
    console.log('X : ' + TestValue + ', Y : ' + ScoreY / ScoreSum)
}

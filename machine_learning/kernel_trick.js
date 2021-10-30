var Input = [
    [5, 1], [5, 2], [4, 1], [4, 2],
    [5, 4], [5, 5], [4, 4], [4, 5],
    [2, 1], [2, 2], [1, 1], [1, 2],
    [2, 4], [2, 5], [1, 4], [1, 5]]

var Output = [
    [1], [-1], [-1], [-1],
    [1], [-1], [1], [1],
    [1], [1], [-1], [1],
    [-1], [-1], [-1], [1]]

var TestInput = Input

for (var i = 0; i < TestInput.length; i++) {

    var Scores = []

    var TestValue = TestInput[i]

    for (var j = 0; j < Input.length; j++) {
        var Count = 0
        var RepositoryInput = Input[j]
        for (var k = 0; k < TestValue.length; k++) {
            Count += Math.abs(TestValue[k] - RepositoryInput[k])
        }

        var RBF = Math.exp(-((Math.pow(Count, 2)) / 2 * Math.pow(1, 2)))
        Scores.push(RBF)
    }

    var Sum = 0

    for (var l = 0; l < Scores.length; l++) {
        Sum += Scores[l] * Output[l]
    }

    var FinalValue

    if (Sum > 0) {
        FinalValue = 1
    } else if (Sum < 0) {
        FinalValue = -1
    } else {
        FinalValue = 0
    }
    console.log('Input : ' + TestValue + ', Output : ' + FinalValue)
}

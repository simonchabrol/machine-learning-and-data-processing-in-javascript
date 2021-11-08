var ARR = [
    ['id', 'first', 'last'],
    [1, 2, 2],
    [1, 2, 3],
    [1, 1, 4],
    [2, 1, 2],
    [2, 2, 1]]

var EXPList = [
    'id=1 OR first=2 AND last=4 OR last=3', // Expected : [ 1, 2, 2 ], [ 1, 2, 3 ], [ 1, 1, 4 ]
    'id=1 OR id=2 AND last=4', // Expected : [ 1, 2, 2 ], [ 1, 2, 3 ], [ 1, 1, 4 ]
    'first=2 AND last=1', // Expected : [ 2, 2, 1 ]
    'first=2', // Expected : [ 1, 2, 2 ], [ 1, 2, 3 ], [ 2, 2, 1 ]
    'last=3', // [ 1, 2, 3 ]
    'id=1 OR id=2 AND last=2 OR last=3', // [ 1, 2, 2 ], [ 1, 2, 3 ], [ 1, 1, 4 ], [ 2, 1, 2 ]
    'id=1 AND first>1', // Expected : [ 1, 2, 2 ], [ 1, 2, 3 ]
    'last<3', // Expected : [ 1, 2, 2 ], [ 2, 1, 2 ], [ 2, 2, 1 ]
    'id>=1 AND last>=2 AND last<3', // Expected : [ 1, 2, 2 ], [ 2, 1, 2 ]
    'id!=2 AND last!=2' // Expected : [ 1, 2, 3 ], [ 1, 1, 4 ]
]

for (var k = 0; k < EXPList.length; k++) {

    console.log(EXPList[k])

    var RawEXP = EXPList[k].split(' ')

    var EXP = []

    for (var i = 0; i < RawEXP.length; i++) {
        if (RawEXP[i] === 'OR' || RawEXP[i] === 'AND') {
            if (i !== 0 && i !== RawEXP.length) {
                EXP.push(RawEXP[i])
            }
        } else {
            var Regex = /(>=|<=|<|>|=|!=)/i
            var Value = RawEXP[i].split(Regex)
            if (ARR[0].indexOf(Value[0]) !== -1) {
                EXP.push([ARR[0].indexOf(Value[0]), Value[2], Value[1]])
            }
        }
    }

    function Check(Arr, Condition) {
        switch (Condition[2]) {
            case '=':
                if (Arr[Condition[0]] == Condition[1]) {
                    return 1
                } else {
                    return 0
                }
            case '>=':
                if (Arr[Condition[0]] >= Condition[1]) {
                    return 1
                } else {
                    return 0
                }
            case '>':
                if (Arr[Condition[0]] > Condition[1]) {
                    return 1
                } else {
                    return 0
                }
            case '<=':
                if (Arr[Condition[0]] <= Condition[1]) {
                    return 1
                } else {
                    return 0
                }
            case '<':
                if (Arr[Condition[0]] < Condition[1]) {
                    return 1
                } else {
                    return 0
                }
            case '!=':
                if (Arr[Condition[0]] != Condition[1]) {
                    return 1
                } else {
                    return 0
                }
        }
    }

    for (var i = 1; i < ARR.length; i++) {
        var Operators = []
        for (var j = 0; j < EXP.length; j++) {
            if (EXP[j] !== 'AND' && EXP[j] !== 'OR') {
                Operators.push(Check(ARR[i], EXP[j]))
            }
            if (EXP[j + 1] === 'AND') {
                Operators.push('&&')
            }
            if (EXP[j + 1] === 'OR') {
                Operators.push('||')
            }
        }
        for (var j = 0; j < Operators.length; j++) {
            if (Operators[j] === '&&') {
                Operators[j - 1] = Operators[j - 1] && Operators[j + 1]
                Operators.splice(j, 1)
                Operators.splice(j, 1)
                j = 0
            }
        }
        for (var j = 0; j < Operators.length; j++) {
            if (Operators[j] === '||') {
                Operators[j - 1] = Operators[j - 1] || Operators[j + 1]
                Operators.splice(j, 1)
                Operators.splice(j, 1)
                j = 0
            }
        }

        var Test = Operators[0]
        if (Test === 1) {
            console.log(ARR[i])
        }
    }
    console.log('\r')
}

/*
id=1 OR first=2 AND last=4 OR last=3
[ 1, 2, 2 ]
[ 1, 2, 3 ]
[ 1, 1, 4 ]

id=1 OR id=2 AND last=4
[ 1, 2, 2 ]
[ 1, 2, 3 ]
[ 1, 1, 4 ]

first=2 AND last=1
[ 2, 2, 1 ]

first=2
[ 1, 2, 2 ]
[ 1, 2, 3 ]
[ 2, 2, 1 ]

last=3
[ 1, 2, 3 ]

id=1 OR id=2 AND last=2 OR last=3
[ 1, 2, 2 ]
[ 1, 2, 3 ]
[ 1, 1, 4 ]
[ 2, 1, 2 ]

id=1 AND first>1
[ 1, 2, 2 ]
[ 1, 2, 3 ]

last<3
[ 1, 2, 2 ]
[ 2, 1, 2 ]
[ 2, 2, 1 ]

id>=1 AND last>=2 AND last<3
[ 1, 2, 2 ]
[ 2, 1, 2 ]

id!=2 AND last!=2
[ 1, 2, 3 ]
[ 1, 1, 4 ]
*/

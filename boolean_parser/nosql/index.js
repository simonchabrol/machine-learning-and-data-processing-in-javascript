var ARR = [
    { "id": 1, "first": 2, "last": 2 },
    { "id": 1, "first": 2, "last": 3 },
    { "id": 1, "first": 1, "last": 4 },
    { "id": 2, "first": 1, "last": 2 },
    { "id": 2, "first": 2, "last": 1 }
]

var EXPList = [
    'id=1 OR first=2 AND last=4 OR last=3',
    '( id=1 AND ( first=2 ) ) AND ( last=4 OR last=3 )',
    'id=1 OR id=2 AND last=4',
    'first=2 AND last=1',
    'first=2',
    'last=3',
    'id=1 OR id=2 AND last=2 OR last=3',
    'id=1 AND first>1',
    'last<3',
    '( id=1 AND ( first>1 OR last<3 ) ) OR ( id=2 AND ( first=2 AND last=1 ) )',
    'id>=1 AND last>=2 AND last<3',
    'id!=2 AND last!=2'
]

for (var k = 0; k < EXPList.length; k++) {

    console.log(EXPList[k])

    var RawEXP = EXPList[k].split(' ')

    var EXP = []

    for (var i = 0; i < RawEXP.length; i++) {
        if (RawEXP[i] === 'OR' || RawEXP[i] === 'AND' && RawEXP[i] !== '(' && RawEXP[i] !== ')') {
            if (i !== 0 && i !== RawEXP.length) {
                EXP.push(RawEXP[i])
            }
        } else if (RawEXP[i] === '(' || RawEXP[i] === ')') {
            EXP.push(RawEXP[i])
        } else {
            var Regex = /(>=|<=|<|>|=|!=)/i
            var Value = RawEXP[i].split(Regex)
            EXP.push([Value[0], Value[2], Value[1]])
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

    for (var i = 0; i < ARR.length; i++) {
        var Operators = []
        for (var j = 0; j < EXP.length; j++) {
            if (EXP[j] !== 'AND' && EXP[j] !== 'OR' && EXP[j] !== ')' && EXP[j] !== '(') {
                Operators.push(Check(ARR[i], EXP[j]))
            }
            if (EXP[j] === ')') {
                Operators.push(')')
            }
            if (EXP[j] === '(') {
                Operators.push('(')
            }
            if (EXP[j + 1] === 'AND') {
                Operators.push('&&')
            }
            if (EXP[j + 1] === 'OR') {
                Operators.push('||')
            }
        }

        if (Operators.length !== EXP.length) {
           console.log('Invalid statement')
           return
        }

        var OpenParenthesis = []
        var ClosedParenthesis = []

        function CheckParenthesis() {
            OpenParenthesis = []
            ClosedParenthesis = []
            for (var i = 0; i < Operators.length; i++) {
                if (Operators[i] === '(') {
                    for (var j = i + 1; j < Operators.length; j++) {
                        if (Operators[j] === ')') {
                            OpenParenthesis.push(i)
                            ClosedParenthesis.push(j)
                            break
                        } else if (Operators[j] === '(') {
                            break
                        }
                    }
                }
            }
        }

        CheckParenthesis()

        var PreviousOpenParenthesis
        var PreviousClosedParenthesis

        if (OpenParenthesis.length !== 0) {
            for (var l = 0; l < OpenParenthesis.length; l++) {
                for (var j = OpenParenthesis[l]; j < ClosedParenthesis[l]; j++) {
                    if (Operators[j] === '&&' && Operators[j + 1] !== '(' && Operators[j + 1] !== ')') {
                        Operators[j - 1] = Operators[j - 1] && Operators[j + 1]
                        Operators.splice(j, 1)
                        Operators.splice(j, 1)
                        j = OpenParenthesis[l]
                        CheckParenthesis()
                    }
                    if (OpenParenthesis[l] - ClosedParenthesis[l] === -2) {
                        Operators.splice(OpenParenthesis[l], 1)
                        Operators.splice(ClosedParenthesis[l] - 1, 1)
                        CheckParenthesis()
                    }
                }
                for (var j = OpenParenthesis[l]; j < ClosedParenthesis[l]; j++) {
                    if (Operators[j] === '||' && Operators[j + 1] !== '(' && Operators[j + 1] !== ')') {
                        Operators[j - 1] = Operators[j - 1] || Operators[j + 1]
                        Operators.splice(j, 1)
                        Operators.splice(j, 1)
                        j = OpenParenthesis[l]
                        CheckParenthesis()
                    }
                    if (OpenParenthesis[l] - ClosedParenthesis[l] === -2) {
                        Operators.splice(OpenParenthesis[l], 1)
                        Operators.splice(ClosedParenthesis[l] - 1, 1)
                        CheckParenthesis()
                    }
                }

                if (OpenParenthesis.length !== 0) {
                    if (OpenParenthesis === PreviousOpenParenthesis && ClosedParenthesis === PreviousClosedParenthesis) {
                          console.log('Invalid statement')
                           return
                    }
                    l--
                    PreviousClosedParenthesis = ClosedParenthesis
                    PreviousOpenParenthesis = OpenParenthesis
                }
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
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }
{ id: 1, first: 1, last: 4 }

( id=1 AND ( first=2 ) ) AND ( last=4 OR last=3 )
{ id: 1, first: 2, last: 3 }

id=1 OR id=2 AND last=4
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }
{ id: 1, first: 1, last: 4 }

first=2 AND last=1
{ id: 2, first: 2, last: 1 }

first=2
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }
{ id: 2, first: 2, last: 1 }

last=3
{ id: 1, first: 2, last: 3 }

id=1 OR id=2 AND last=2 OR last=3
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }
{ id: 1, first: 1, last: 4 }
{ id: 2, first: 1, last: 2 }

id=1 AND first>1
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }

last<3
{ id: 1, first: 2, last: 2 }
{ id: 2, first: 1, last: 2 }
{ id: 2, first: 2, last: 1 }

( id=1 AND ( first>1 OR last<3 ) ) OR ( id=2 AND ( first=2 AND last=1 ) )
{ id: 1, first: 2, last: 2 }
{ id: 1, first: 2, last: 3 }
{ id: 2, first: 2, last: 1 }

id>=1 AND last>=2 AND last<3
{ id: 1, first: 2, last: 2 }
{ id: 2, first: 1, last: 2 }

id!=2 AND last!=2
{ id: 1, first: 2, last: 3 }
{ id: 1, first: 1, last: 4 }
*/

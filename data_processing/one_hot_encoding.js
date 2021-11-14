var Input = [
    'see you later',
    'have a nice day',
    'talk to you soon',
    'give me a salad',
    'do you have hamburgers',
    'can i have a sandwich']

for (var i = 0; i < Input.length; i++) {
    Input[i] = Input[i].split(' ')
}

var UniqueWords = []

for (var i = 0; i < Input.length; i++) {
    UniqueWords.push(...new Set(Input[i]))
    UniqueWords = [...new Set(UniqueWords)]
}

var Output = []

for (var i = 0; i < Input.length; i++) {
    Output.push([])
}

for (var i = 0; i < Input.length; i++) {
   var Word = Input[i]
   for (var j = 0; j < UniqueWords.length; j++) {
    for (var k = 0; k < Word.length; k++) {
        if (Word[k] === UniqueWords[j]) {              
            Output[i].push(1)           
            break          
        } else if (k === Word.length - 1) {              
            Output[i].push(0)          
        }  
    }
  }
  console.log('\n' + Word.join(' '))
  console.log(Output[i].toString())
}

/*
see you later
1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

have a nice day
0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0

talk to you soon
0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0

give me a salad
0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0

do you have hamburgers
0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0

can i have a sandwich
0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1
*/

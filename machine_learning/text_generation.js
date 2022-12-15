var Sentences = [
  "this new humans of new-york post is gross and somewhat terrifying",
  "artificial intelligence cant think without polluting",
  "a massive asteroid collision once caused earth to cool and enter an ice age",
  "venus was potentially habitable until a mysterious event happened",
  "china releases new images of bizzare substance found in a moon crater",
  "venus could have supported life for billions of years",
  "how to predict crucial plasma pressure in future fusion facilities",
  "undeground continents may be as old as earth",
  "washington monument elevator breaks down days after landmark reopens",
  "anti-ice demonstrators and counter-protesters face off in aurora colorado",
  "police search for a suspect after 6 people are shot in downtown indianapolis",
  "hong-kong riots police curb airport protest after clashes",
  "the general motors strike will test which party will work for workers in 2020",
  "fed injects cash for fourth day as funding markets stabilize",
  "funeral held for legendary journalist today",
  "woman arrested after allegedly kicking dog in viral video",
]

var Words = []

for (var i = 0; i < Sentences.length; i++) {
  var ListWords = Sentences[i].split(" ")
  Words = Words.concat(ListWords)
}

var UniqueWords = [...new Set(Words)]

var Dictionary = []

for (var j = 0; j < UniqueWords.length; j++) {
  Dictionary.push([])
}

for (var j = 0; j < UniqueWords.length; j++) {
  var FirstWord = UniqueWords[j]
  for (var k = 0; k < Sentences.length; k++) {
    var SplitSentence = Sentences[k].split(" ")
    for (var l = 0; l < SplitSentence.length; l++) {
      if (SplitSentence[l] === FirstWord && l + 1 !== SplitSentence.length) {
        Dictionary[j] = Dictionary[j].concat(SplitSentence[l + 1])
      }
    }
  }
}

var NewSentence = []

for (var m = 0; m < 10; m++) {
  var Take = Math.floor(Math.random() * (UniqueWords.length - 0) + 0)

  if (Dictionary[Take].length !== 0) {
    var Done = 1
    FirstWord = UniqueWords[Take]
    NewSentence = NewSentence.concat(FirstWord)
    var NextWordList = Dictionary[UniqueWords.indexOf(FirstWord)]

    while (Done !== 0) {
      Take = Math.floor(Math.random() * (NextWordList.length - 0) + 0)
      var NextWord = NextWordList[Take]
      var NextWordIndex = UniqueWords.indexOf(NextWord)
      if (Dictionary[NextWordIndex].length !== 0) {
        NewSentence = NewSentence.concat(NextWord)
        NextWordList = Dictionary[UniqueWords.indexOf(NextWord)]
        if (NextWordList.length === 0) {
          Done = 0
        }
      } else {
        NewSentence = NewSentence.concat(NextWord)
        Done = 0
      }
    }
  }
  var FinalSentence = NewSentence.join(" ")
  if (
    Sentences.includes(FinalSentence) === false &&
    FinalSentence.length !== 0
  ) {
    console.log("\n" + FinalSentence)
  } else {
    m--
  }
  NewSentence = []
}

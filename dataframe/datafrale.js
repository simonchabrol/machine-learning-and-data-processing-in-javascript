var fs = require("fs")

var dataframe = {
  result:[],
  from: function (file) {
    if (fs.existsSync(file)) {
      this.file = file
      return this
    } else {
      console.log("File not found")
    }
  },

  schema: function () {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      //this["SCHEMA " + this.file] = Lines[0]
      this['SCHEMA'] = Lines[0]
    }
    return this
  },

  show: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      this.ListLines = []
      for (var i = 0; i < a; i++) {
        //console.log(Lines[i])
        this.ListLines.push(Lines[i])
      }
      return this
    }
    return this
  },

  distinct: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var UniqueValues = []
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          UniqueValues = [...new Set(UniqueValues.concat(Line[Index]))]
        }
      }
      this["DISTINCT(" + a + ")"] = UniqueValues
      return this
    }
    return this
  },

  sum: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var Sum = 0
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          Sum += parseInt(Line[Index])
        }
      }
      this["SUM(" + a + ")"] = Sum
      return this
    }
    return this
  },

  avg: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var Average = 0
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          Average += parseInt(Line[Index])
        }
      }
      this["AVG(" + a + ")"] = Average / (Lines.length - 1)
      return this
    }
    return this
  },

  count: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var Count = 0
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          Count += 1
        }
      }
      this["COUNT(" + a + ")"] = Count
      return this
    }
    return this
  },

  countd: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var UniqueValues = []
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          UniqueValues = [...new Set(UniqueValues.concat(Line[Index]))]
        }
      }
      this["COUNT DISTINCT(" + a + ")"] = UniqueValues.length
      return this
    }
    return this
  },

  max: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var Max = 0
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          if (parseInt(Line[Index]) > Max) {
            Max = parseInt(Line[Index])
          }
        }
      }
      this["MAX(" + a + ")"] = Max
      return this
    }
    return this
  },

  min: function (a) {
    if (this.file !== undefined) {
      var Lines = require("fs").readFileSync(this.file, "utf-8").split("\n")
      var Min = 0
      var Index = 0
      for (var i = 0; i < Lines.length; i++) {
        var Line = Lines[i].split(";")
        if (i === 0 && Line.includes(a)) {
          Index = Line.indexOf(a)
        } else if (i === 0 && Line.includes(a) === false) {
          console.log("Column " + a + " did not exist")
          process.exit()
        } else {
          if (i === 1) {
            Min = parseInt(Line[Index])
          } else if (Min > parseInt(Line[Index])) {
            Min = parseInt(Line[Index])
          }
        }
      }
      this["MIN(" + a + ")"] = Min
      return this
    }
    return this
  },
}

module.exports = dataframe

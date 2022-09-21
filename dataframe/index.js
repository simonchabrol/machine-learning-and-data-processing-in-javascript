const dataframe = require('./dataframe')

/*
console.log((dataframe.from("data.csv").show(6)).ListLines)
console.log((dataframe.from("data.csv").distinct("name"))['DISTINCT(name)'])
console.log((dataframe.from("data.csv").countd("name"))['COUNT DISTINCT(name)'])
console.log((dataframe.from("data.csv").count("name"))['COUNT(name)'])
console.log((dataframe.from("data.csv").schema())['SCHEMA'])
console.log((dataframe.from("data.csv").show(3))['ListLines'])
console.log((dataframe.from("data.csv").sum('revenue'))['SUM(revenue)'])
console.log((dataframe.from("data.csv").countd('country'))['COUNT DISTINCT(country)'])
console.log((dataframe.from("data.csv").sum('revenue'))['SUM(revenue)'])
console.log((dataframe.from("data.csv").avg('revenue'))['AVG(revenue)'])
*/

/*
var data = dataframe.from("data.csv").avg('revenue').show(3).sum('revenue').countd('country')
console.log(data['ListLines'])
console.log(data['AVG(revenue)'])
console.log(data['SUM(revenue)'])
console.log(data['COUNT DISTINCT(country)'])
*/

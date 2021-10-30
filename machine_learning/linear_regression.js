var X = [0,1]
var Y = [1,2]

var XSum = 0
var XMean = 0

var YSum = 0
var YMean = 0

var XDeviation = []
var XDeviationSum = 0

var YDeviation = []
var YDeviationSum = 0

var XYDeviationProduct = []
var XYDeviationProduct= 0

for (var i = 0; i < X.length; i++) {
   XSum = XSum + X[i]
   YSum = YSum + Y[i]
}
XMean = XSum / X.length
YMean = YSum / Y.length

for (var i = 0; i < X.length; i++) {
  XDeviation.push(X[i] - XMean)
  YDeviation.push(Y[i] - YMean)
}

for (var i = 0; i < X.length; i++) {
  XYDeviationProduct.push(XDeviation[i] * YDeviation[i])
  XYDeviationProductSum = XYDeviationProductSum + XYDeviationProduct[i]
}

for (var i = 0; i < X.length; i++) {
   XDeviationSum = XDeviationSum + Math.pow(XDeviation[i],2)
   YDeviationSum = YDeviationSum + Math.pow(YDeviation[i],2)
}

var CoeffLine = XYDeviationProductSum / XDeviationSum

var CoeffZeroX = YMean - CoeffLine * XMean 

var Sign = function Value () {
    if (CoeffLine > 0 ) {
      return ' +'
    } else {
      return ' '
    }
}

console.log('Trend line is : ' + CoeffZeroX + Sign() + ' ' + CoeffLine + ' * X')

var ScoreDetermination = Math.pow(( 1 / X.length)
                         * XYDeviationProductSum
                         / ((Math.sqrt(XDeviationSum / X.length))
                           * (Math.sqrt(YDeviationSum / X.length))), 2)

console.log('Determination score is : ' + ScoreDetermination)

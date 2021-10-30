var Data = [
  [1], [2], [3], [5], [6], [7]
]

var Average = 0
var NewAverage = 0

var kMeans = 3

var Centroids = []
var Clusters = []
var Distances = []

var DataCopy = [...Data]

for (var i = 0; i < kMeans; i++) {
  var Take = Math.floor(Math.random() * DataCopy.length)
  if (Data[0].length === 1) {
    Centroids.push([DataCopy[Take]])
  } else {
    Centroids.push(DataCopy[Take])
  }
  Clusters.push([])
  Distances.push([])
  DataCopy.splice(Take, 1)
}

var Done = 0
while (Done !== 1) {
  var PrevAverage = Average

  for (var i = 0; i < Data.length; i++) {
    var TestValue = Data[i]
    var CentroidDistance = []
    for (var j = 0; j < Centroids.length; j++) {
      var TestCentroid = Centroids[j]
      var Sum = 0
      for (var k = 0; k < TestCentroid.length; k++) {
        Sum += Math.abs(TestCentroid[k] - TestValue[k])
      }
      CentroidDistance.push(Sum)
    }
    var Min = Math.min(...CentroidDistance)
    for (var j = 0; j < Clusters.length; j++) {
      if (CentroidDistance[j] === Min) {
        Clusters[j].push(TestValue)
      }
    }
  }

  for (var j = 0; j < Clusters.length; j++) {
    var Cluster = Clusters[j]
    Cluster.sort(function (a, b) {
      var c
      a.some(function (d, i) {
        return c = d - b[i]
      })
      return c
    })
    var FirstValue = Cluster[0]
    var LastValue = Cluster[Cluster.length - 1]
    Sum = 0
    for (var l = 0; l < FirstValue.length; l++) {
      Sum += Math.abs(FirstValue[l] - LastValue[l])
    }
    Distances[j].push(Sum)
  }

  Average = 0
  Sum = 0
  for (var j = 0; j < Distances.length; j++) {
    Sum += Distances[j][0]
  }

Average = Sum / kMeans

for (var j = 0; j < Clusters.length; j++) {
  Cluster = Clusters[j]
  var NextCentroid = []
  for (var k = 0; k < Cluster[0].length; k++) {
    Sum = 0
    for (var l = 0; l < Cluster.length; l++) {
      Sum += Cluster[l][k]
    }
    NextCentroid.push(Sum / Cluster.length)
  }
  if (Data[0].length === 1) {
    Centroids[j] = [NextCentroid]
  } else {
    Centroids[j] = NextCentroid
  }
}

if (Average === PrevAverage) {
  console.log(Clusters)
  Done = 1
} else {
  Clusters = []
  Distances = []
  for (var i = 0; i < kMeans; i++) {
    Clusters.push([])
    Distances.push([])
  }
}
}


/*
 kMeans = 3
 [
   [
      [ 1 ], [ 2 ]
   ],
   [
      [ 3 ]
   ],
   [
      [ 5 ],
      [ 6 ],
      [ 7 ]
   ]
]

kMeans = 2
[
    [
      [ 5 ],
      [ 6 ],
      [ 7 ]
    ],
    [
      [ 1 ],
      [ 2 ],
      [ 3 ]
    ]
]
*/

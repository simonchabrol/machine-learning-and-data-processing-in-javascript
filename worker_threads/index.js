const { Worker, isMainThread, workerData, parentPort } = require('worker_threads')

var DataSet = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
]

var ColumnSum = []

for (var i = 0; i < DataSet[0].length; i++) {
  ColumnSum.push(0)
}
if (isMainThread) {

  var WorkerList = []
  for (let j = 0; j < DataSet[0].length; j++) {
    WorkerList.push(new Worker(__filename, { workerData: j }))
  }

  for (var k = 0; k < WorkerList.length; k++) {

    WorkerList[k].on('message', function (message) {
      ColumnSum[message.id] = message.sum
    })

    WorkerList[k].on('exit', function () {
      WorkerList.splice(WorkerList[k], 1)
      if (WorkerList.length === 0) {
        console.log(ColumnSum)
      }
    })
  }
} else {
  var Sum = 0
  for (var i = 0; i < DataSet.length; i++) {
    Sum += DataSet[i][workerData]
  }
  console.log('Worker thread ' + workerData + ' update array with value ' + Sum)
  parentPort.postMessage({ id: workerData, sum: Sum })
}


/*
 Worker thread 2 update array with value 15
 Worker thread 5 update array with value 30
 Worker thread 4 update array with value 25
 Worker thread 1 update array with value 10
 Worker thread 7 update array with value 40
 Worker thread 9 update array with value 50
 Worker thread 11 update array with value 60
 Worker thread 0 update array with value 5
 Worker thread 15 update array with value 80
 Worker thread 3 update array with value 20
 Worker thread 14 update array with value 75
 Worker thread 6 update array with value 35
 Worker thread 13 update array with value 70
 Worker thread 12 update array with value 65
 Worker thread 8 update array with value 45
 Worker thread 10 update array with value 55
 [
    5, 10, 15, 20, 25, 30,
   35, 40, 45, 50, 55, 60,
   65, 70, 75, 80
 ]
 */

/*
  pngjs
*/

var fs = require('fs')
var PNG = require('pngjs').PNG

fs.createReadStream('Red_10x10.png')
    .pipe(
        new PNG({
            filterType: 4
        })
    )
    .on('parsed', function () {
        var RGBAlist = []
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2
                var R = this.data[idx]
                var G = this.data[idx + 1]
                var B = this.data[idx + 2]
                RGBAlist.push(r, g, b)
            }
        }
        var GrayScale = []
        for (var i = 0; i < RGBAlist.length; i += 3) {
            R = RGBAlist[i]
            G = RGBAlist[i + 1]
            B = RGBAlist[i + 2]
            var Value = (R * 0.298) + (G * 0.587) + (B * 0.114)
            if (Value >= 50) {
                GrayScale.push(0)
            } else {
                GrayScale.push(1)
            }
        }
        console.log(GrayScale)
    })

/*
[
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 ]
*/

/*
  jimp
*/

var Jimp = require('jimp')

Jimp.read('Red_10x10.png')
    .then((image) => {
        var RGBAlist = []
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            var R = this.bitmap.data[idx + 0]
            var G = this.bitmap.data[idx + 1]
            var B = this.bitmap.data[idx + 2]
            RGBAlist.push(R, G, B)
        })
        var GrayScale = []
        for (var i = 0; i < RGBAlist.length; i += 3) {
            R = RGBAlist[i]
            G = RGBAlist[i + 1]
            B = RGBAlist[i + 2]
            var Value = (R * 0.298) + (G * 0.587) + (B * 0.114)
            if (Value >= 50) {
                GrayScale.push(0)
            } else {
                GrayScale.push(1)
            }
        }
        console.log(GrayScale)
    })

/*
[
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 ]
*/

/*
  canvas
*/

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(10, 10)
const ctx = canvas.getContext('2d')

loadImage('Red_10x10.png').then(image => {
    ctx.drawImage(image, 0, 0, 10, 10)
    var data = ctx.getImageData(0, 0, 10, 10)
    var PixelList = data
    var RGBAlist = []
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            var idx = (10 * y + x) << 2
            var r = PixelList.data[idx]
            var g = PixelList.data[idx + 1]
            var b = PixelList.data[idx + 2]
            RGBAlist.push(r, g, b)
        }
    }
    var GreyScale = []
    for (var i = 0; i < RGBAlist.length; i += 3) {
        var First = RGBAlist[i]
        var Second = RGBAlist[i + 1]
        var Third = RGBAlist[i + 2]
        var Value = (First * 0.298) + (Second * 0.587) + (Third * 0.114)
        if (Value >= 50) {
            GreyScale.push(0)
        } else {
            GreyScale.push(1)
        }
    }
    console.log(JSON.stringify(GreyScale))
})

/*
[
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 ]
 */

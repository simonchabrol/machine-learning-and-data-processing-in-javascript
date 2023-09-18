var http = require('http')

var NumClient = 0
var Previous = 0
var Responses = []

http.createServer(function(req, res) {  
    var Current = 0    
    if (req.method === 'GET' && req.url === '/') {           
       NumClient += 1           
       res.writeHead(200, {                
           'Content-Type': 'text/html'          
       })         
       Responses.push(res)        
       if (NumClient > Previous) {                      
          for (var i = 0; i < Responses.length; i++) {               
             Responses[i].write('<br> Client '+NumClient+' is connected<br>')  
             Current = NumClient 
          }   
          Previous = NumClient     
       }   
    }
    req.on('close',function(){    
      for (var i = 0; i < Responses.length; i++) {               
         Responses[i].write('<br> Client '+Current+' is disconnected<br>')  
      }   
   })
}).listen(4040)

const server = Deno.listen({ port: 8080 });
console.log('Server running at port 8080');

for await (const conn of server) {
  const httpConn = Deno.serveHttp(conn)
  for await (const requestEvent of httpConn) {
    console.log(requestEvent)
    if (requestEvent.request.url === 'http://127.0.0.1:8080/' && requestEvent.request.method === 'GET') {
      await requestEvent.respondWith(
         new Response("GET REQUEST",{status: 200})
      )
    } else if (requestEvent.request.url === 'http://127.0.0.1:8080/' && requestEvent.request.method === 'POST') {
      await requestEvent.respondWith(
         new Response("POST REQUEST",{status: 200})
      )
    }
  }
}

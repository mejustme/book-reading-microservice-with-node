const http = require('http')
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('hello world server 2')
  res.end()
})

server.listen(8081)
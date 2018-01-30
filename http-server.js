const http = require('http')
const server = http.createServer(function (req, res) {
  res.setHeader('Set-Cookie', ['name=cqh', 'phone=iphone'])
  // res.setHeader('Location', 'http://www.if-elseif-else.com/')
  // res.writeHead(302, { 'Content-Type': 'text/plain' })
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('hello world 100')
  res.end()
})

server.listen(8080)
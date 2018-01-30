const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let numReqs = 0;

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', function (msg) {
      numReqs++
      console.log(`Req count ${numReqs}`)
    });
  }
  
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world');
    process.send({ content: 'notifyRequest' });
    console.log(`Worker ${process.pid} get request`);
  }).listen(8080);

  console.log(`Worker ${process.pid} started`);
}
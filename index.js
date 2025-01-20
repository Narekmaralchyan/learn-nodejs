const http = require('http')

const port = 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200,{ 'Content-Type': 'text/plain' })
    res.end('hello world')
})

server.listen(port,()=>{
    console.log('server is running!!!')
})
import http from "http";
import {Todo, Todos} from "./todos.js";

const port = 5000;
const URLS = {
    todos:'/todos'
}
const todos = new Todos();

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === URLS.todos) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const resource = todos.getAllTodos();
        res.end(JSON.stringify({ data: resource }));
    } else if(req.method === 'POST' && req.url === URLS.todos){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const resource = JSON.parse(body); // Parse the request body as JSON
                const todo = new Todo(resource.title);
                todos.addTodo(todo);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ todo }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    }
})

server.listen(port,()=>{
    console.log('server is running!!!')
})
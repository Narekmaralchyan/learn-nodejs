import http from "http";
import {Todo, Todos} from "./todos.js";
import {runMiddlewareStack, use} from "./utils/utils.js";
import {jsonBodyParser} from "./utils/middlewares.js";

const port = 5000;
const URLS = {
    todos:'/todos',
    updateTodoTitle:'/todos/updateTitle'
}

use(jsonBodyParser)

const todos = new Todos();

const server = http.createServer((req, res) => {
    runMiddlewareStack(req,res,()=>{
            //get all
            if (req.method === 'GET' && req.url === URLS.todos) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const resource = todos.getAllTodos();
                res.end(JSON.stringify({ data: resource }));
                //add item
            } else if(req.method === 'POST' && req.url === URLS.todos){
                try {
                    const todo = new Todo(req.body.title);
                    todos.addTodo(todo);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ todo }));
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                }
            } else if(req.method === 'PATCH' && req.url === URLS.updateTodoTitle)   {
                try {
                    const title = req.body.title;
                    const id = req.body.id
                    if (id === undefined || id === null){
                        throw new Error('Required id field')
                    };
                    const todo = todos.getAllTodos().find(item=>item.id===id);
                    todo.updateTodoTitle(title)
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ todo }));
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                }
            }

    });
})

server.listen(port,()=>{
    console.log('server is running!!!')
})
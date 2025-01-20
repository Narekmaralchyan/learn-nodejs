export const middlewareStack = [];

export function use(middleware){
    middlewareStack.push(middleware)
}

export function executeMiddlewareStack (req,res,middlewares,callback){
    const next = ()=>{
        if(!middlewares.length) {
            callback();
        }
        else {
            const middleware = middlewares.shift();
            middleware(req,res,next)
        }
    }
    next()
}

export function runMiddlewareStack(req,res,callback) {
    executeMiddlewareStack(req,res,[...middlewareStack],callback)
}
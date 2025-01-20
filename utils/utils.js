const middlewareStack = [];

export function use(middleware){
    middlewareStack.push(middleware)
}

export function executeMiddlewareStack (req,res,middlewares){
    const next = ()=>{
        if(!middlewares.length) return;
        const middleware = middlewares.shift();
        middleware(req,res,next)
    }
    next()
}

export function runMiddlewareStack(req,res) {
    executeMiddlewareStack(req,res,[...middlewareStack])
}
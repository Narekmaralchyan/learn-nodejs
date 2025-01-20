export function jsonBodyParser (req,res,next){
    if (req.method==='POST' || req.method==='PATCH' || req.method==='PUT' ){
        let body = '';
        req.on('data',chunk=>{
            body += chunk;
        })
        req.on('end',()=>{
            try {
                req.aaa = JSON.parse(body);
            } catch {
                res.writeHead(400,{ 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }))
                return;
            }
            finally {
                next()
            }
        })
    } else next();
}
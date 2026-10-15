import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (req,res) => {
  if(req.url === '/health'){res.end('ok');return;}
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(!pathname.startsWith('/Portofolio/')) throw Error('missing');
    let file = path.resolve(root, pathname.slice('/Portofolio/'.length));
    if(file !== root && !file.startsWith(root + path.sep)) throw Error('missing');
    if((await stat(file)).isDirectory()) file = path.join(file,'index.html');
    const bytes = await readFile(file); res.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream'}); res.end(bytes);
  } catch { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); try{res.end(await readFile(path.join(root,'404.html')));}catch{res.end('Not found');} }
}).listen(4185,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4185/Portofolio/'));

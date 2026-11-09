const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||3000;const ROOT=path.join(__dirname,'public');
const send=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj))};
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/player'){
  const name=(url.searchParams.get('player')||'').trim(),platform=url.searchParams.get('platform')||'PC';
  if(!name||name.length>64||!['PC','PS4','X1'].includes(platform))return send(res,400,{error:'Enter a valid EA account name and platform.'});
  if(!process.env.APEX_API_KEY)return send(res,503,{error:'API key missing. Set APEX_API_KEY in your server environment.'});
  try{const upstream=new URL('https://api.apexlegendsstatus.com/bridge');upstream.searchParams.set('player',name);upstream.searchParams.set('platform',platform);
   const response=await fetch(upstream,{headers:{Authorization:process.env.APEX_API_KEY},signal:AbortSignal.timeout(15000)});
   const raw=await response.text();let data;try{data=JSON.parse(raw)}catch{throw Error('The stats provider returned an invalid response.')}
   if(!response.ok||data.Error||data.error)return send(res,response.ok?404:response.status,{error:typeof(data.Error||data.error)==='string'?(data.Error||data.error):'Player lookup failed.'});
   return send(res,200,data);
  }catch(err){return send(res,502,{error:err.name==='TimeoutError'?'Stats provider timed out.':err.message})}
 }
 const pathname=url.pathname==='/'?'/index.html':url.pathname;const file=path.resolve(ROOT,'.'+pathname);
 if(!file.startsWith(ROOT+path.sep))return send(res,403,{error:'Forbidden'});
 fs.readFile(file,(err,buf)=>{if(err){res.writeHead(404);return res.end('Not found')};res.writeHead(200,{'Content-Type':file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html'});res.end(buf)});
});server.listen(PORT,()=>console.log(`APEX // TRACKER running at http://localhost:${PORT}`));

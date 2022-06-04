const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
        //요청 바디를 스트림 형식으로 받기
        req.on('data',(data) => {
          body += data;
        });
        //요청 바디 다 받고 나머지 실행됨

        return req.on('end', () => {
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }  
    }    else if (req.method === 'PUT'){
        
      if(req.url.startsWith('/user/')){
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });

        return req.on('end', () => {
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        })
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }

    try{
      const data = await fs.readFile(`.${req.url}`);
      return res.end(data);
    } catch (err) {
      // console.error(err);
    }

    res.writeHead(404);
    return res.end("NOT FOUND")


  } catch (err){
    console.error(err);
    res.writeHead(500,{'Content-Type':'text/plain; charset = utf-8'} )
    res.end(err.message);
  }

})
.listen(8082, () => {
  console.log('8082 is on');
})
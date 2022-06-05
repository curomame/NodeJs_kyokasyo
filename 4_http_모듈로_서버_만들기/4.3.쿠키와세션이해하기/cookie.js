const http = require('http');

http.createServer((req,res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, {'Set-Cookie':'mycookie=test'});
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('8083');
  })

  //쿠키는 name=lee;yeae=1195 처럼 문자열 형식으로 존재
  //쿠키간 세미콜론으로 구분
  
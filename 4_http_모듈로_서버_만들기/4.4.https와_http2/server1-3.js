const http = require('http');
const fs= require('fs');

http.createServer({

  cert:fs.readFileSync('도메인 인증서 경로'),
  key:fs.readFileSync('도메인 비밀키 경로'),
  ca:[
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ]
},
  (req,res) => {
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
  res.write('<h1>Hello!</h1>')
  res.end('<p>Hello Server!</p>')
})
  .listen(443, () => {
    console.log('8080 prot in');
  })
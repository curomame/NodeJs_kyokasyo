//서버는 클라가 있어야 동작함
//클라에서 req 보내면 서버에서 res 보냄
//클라로부터 요청 왔을때 어떤 작업을 수행할지 이벤트 리스너를 미리 등록해둬야함

const http = require('http');
http.createServer((req,res) => {
  //what to do
})
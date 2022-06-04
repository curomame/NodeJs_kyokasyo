const http = require('http');
const fs = require('fs').promises;

http.createServer( async (req,res) => {

  try{
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, {'Content-Type' : 'text/html; charset = utf-8'});
    res.end(data);
  } catch (err){
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=uft-8'});
    res.end(err.message);
  }

})
  .listen(8081, () => {
    console.log('8081');
  })


  //클라이언트의 요청이 실패든 성공이든 서버에서는 그에 응당하는 리스폰스를 보내야함.
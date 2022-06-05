const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc,[k,v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http.createServer(async (req,res) => {
      const cookies = parseCookies(req.headers.cookie);
      
      
      //주소가 login으로 시작하는 경우

      if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        //쿠키 유효 시간 설정
        expires.setMinutes(expires.getMinutes() + 5);

        const uniqueInt = Date.now();
        session[uniqueInt] = {
          name,
          expires
        };

        res.writeHead(302, {
          Location:'/',
          'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`});
        res.end();

        
          //name이라는 쿠키가 있는 경우
      }
      else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 헬로우`);
      } 
      else {
        try{
          const data = await fs.readFile('./cookie2.html');
          res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
          res.end(data);
        } catch(err){
          res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
          res.end(err.message);
        }
      }
    })
    .listen(8085, () => {
      console.log('8085');
    })





    //서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통
    //세션 아이디는 꼭 쿠기 이용하지 않아도 되는데 보통 쿠키 사용함
    //이걸 세션 쿠키라고 부름

    
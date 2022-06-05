//싱글 프로세스로 동작하는 노드가 cpu 코어를 모두 사용할 수 있게 해주는 모듈

const cluster = require('cluster');
const http = require('http');

const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
  console.log(`${process.pid}`);//마스터 프로세서 아디이
  for(let i=0; i<numCPUs;i+=1){
    cluster.fork();
  }

  //워커가 종료되었을 때

  cluster.on('exit', (worker, code, signal) => {

    console.log(`${worker.process.pid}번 워커가 종료`);
    console.log('code',code,'signal',signal);

    cluster.fork();
  })

} else {
  http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    res.write('<h1>Hello!</h1>')
    res.end('<p>Hello Server!</p>')
   
    setTimeout(() => {
      process.exit(1);
    },1000)

  } 
    )
    .listen(8086);

    console.log(`${process.pid}번 워커 실행`);
  }
  //워커들이 포트에서 대기
  

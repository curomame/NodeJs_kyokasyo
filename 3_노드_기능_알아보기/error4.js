process.on('uncaughtException',(err) => {
  console.error('예기치 못한 에러', err);
})

setInterval(() => {
  throw new Error('서버를 고장내주망')
},1000);

setTimeout(() => {
  console.log('실행됩니다');
},2000)

//서버의 운영은 에러와의 싸움
//모든 상황에 대비하는 것이 최고지만, 시간이나 비용 인력의 제약이 당연히 발생함.

//node : command not foundg
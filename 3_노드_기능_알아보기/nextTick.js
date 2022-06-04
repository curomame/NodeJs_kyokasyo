setImmediate(() => {
  console.log('immediate');
})

process.nextTick(() => { //얘는 제일 먼저 실행
  console.log('next tick');
})

setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve().then(() => console.log('promise'));

//이애를 마이크로태스크 라고 따로 구분지어 부르고, 얘네들을 재귀호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로태스크를 우선하여 처리하므로, 콜백 함수들이 실행되지 않을 수도 있음


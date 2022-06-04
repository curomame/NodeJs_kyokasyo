const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt',(err,data)=>{
  if(err) throw err;
  console.log('1번',data.toString());
});

fs.readFile('./readme2.txt',(err,data)=>{
  if(err) throw err;
  console.log('2번',data.toString());
});

fs.readFile('./readme2.txt',(err,data)=>{
  if(err) throw err;
  console.log('3번',data.toString());
});

console.log('끝');


//동기와 비동기. 블로킹과 논 블로킹s
//동기와 비동기 - 백끄라운드 자업 완료 확인 여부
//블로킹과 논 블룅 함수가 바로 return 되는지 여부

//노드에서는 동기 - 블로킹 / 비동기 - 논블로킹 방식이 대부분
//

let data = fs.readFileSync('./readme2.txt');
console.log('1번',data.toString());

//readfilesyn는 동기적으로 받아들이기 때문에 문딜레이 되는 문제가 발생할 수 있음

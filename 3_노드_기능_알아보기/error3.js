const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdefg.js')
},1000)
//프로미스의 error는 캐치하지 않아도 알아서 작동함
//하지만 catch 붙이는 편이 좋음
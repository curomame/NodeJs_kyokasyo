setInterval(() => {
  console.log('시작');
  try{
    throw new Error('쾅')
  } catch (err){
    console.error(err);
  }
},1000)
setInterval(() => {
  console.log('ěě');
  try{
    throw new Error('ěž')
  } catch (err){
    console.error(err);
  }
},1000)
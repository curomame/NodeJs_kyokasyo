const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


dotenv.config();


const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const router = require('./routes');

try{
  fs.readdirSync('uploads');
} catch (error){
  console.error('폴더가 없어서 생성합니다')
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage:multer.diskStorage({
    destination(req,file,done){
      done(null,'uploads/');
    },
    filename(req,file,done){
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits : { fileSize : 5 * 1024 * 1024 }
})


const app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave:false, //요청이 올때 세션에 수정 사항이 생기지 않더라도 세션다시 저장할지 설정
  saveUninitialized:false, // 세션에 저장할 내역 없더라도 처음부터 세션 생성할지
  cookie:{
    httpOnly:true, //클라에서 쿠키 확인 못함
    secure:false //https 아닌 환경에서도 사용 가능
  },
  name:'session-cookie'
}))

// app.get('/', (req,res) => {
//   // res.send('Hello Express');
//   res.sendFile(path.join(__dirname,'/index.html'));
// })



app.use((req,res,next) => {
  console.log('모든 요청에 전부 실행');
  next();
});




app.get('/',(req,res,next) => {
  next('route');
},(req,res, next) => {
  console.log('실행되지 않습니다.');
  next()
},(req,res,next) => {
  console.log('실행되지 않습니다');
  next();
})

router.get('/', (req,res) => {
  console.log('실행됨');;
  res.send('Hello Express')
})

router.get('/user/like', (req,res) => {
  console.log(req.params, req.query);
})

router.get('/user/:id', (req,res) => { //와일드 카드라 맨 뒤에 위치해야함
  console.log(req.params, req.query);
})


app.use('/', indexRouter);
app.use('/user',userRouter);
// app.use((req,res,next) => {
//   res.status(404).send('Not Found')
// })


app.get('/upload',(req,res) => {
  res.sendFile(path.join(__dirname,'multipart.html'));
});

app.post('/upload',upload.fields([{name:'image1'},{name:'image2'}]),(req,res) => {
  console.log(req.file, req.body);
  res.send('ok')
})

app.use((err,req,res,next) => {
  const error = new Error(`${req.method}${req.url} 라우터가 없습니다.` );
  error.status = 404;
  next(error);
})

app.use((err,req,res,next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error')
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 대기중');
})



//const bodyParser = require('body-parser')
//app.use(bodyParser.raw());
//app.use(bodyParser.text());
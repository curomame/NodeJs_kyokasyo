const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
dotenv.config();

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
  console.log('get에서 실행');
  next();
},(req,res) => {
  throw new Error('에러 처리 미들 웨어')
})

app.get('/upload',(req,res) => {
  res.sendFile(path.join(__dirname,'multipart.html'));
});

app.post('/upload',upload.fields([{name:'image1'},{name:'image2'}]),(req,res) => {
  console.log(req.file, req.body);
  res.send('ok')
})

app.use((err,req,res,next) => {
  console.error(err);
  res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 대기중');
})



//const bodyParser = require('body-parser')
//app.use(bodyParser.raw());
//app.use(bodyParser.text());
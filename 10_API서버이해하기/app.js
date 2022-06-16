const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv =require('dotenv');

dotenv.config();
const authRouter = require('../9_익스프레스로_SNS_서비스_만들기/routes/auth');
const indexRouter = require('./routes');
const {Sequelize, sequelize} = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();

app.set('port',process.env.PORT || 8002);
app.set('view engine','html');
nunjucks.configure('views',{
  express:app,
  watch:true
});
sequelize.sync({force : false})
  .then(()=> {
    console.log('db 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly : true,
    secure:false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);
app.use('/',indexRouter);

app.use((req,res,next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err,req,res,next) => {
  res.locals.message = err.messgae;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'));
})
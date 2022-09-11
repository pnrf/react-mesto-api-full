require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const allowedCors = require('./middlewares/allowedCors');

console.log('aaa', allowedCors);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const allRouters = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const { PORT = 3001 } = process.env;
// const PORT = process.env.PORT || 3001;
const app = express();

// --- альтернативное подключение CORS ---
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://pankratov.nomorepartiesxyz.ru',
    'http://pankratov.nomorepartiesxyz.ru',
    'https://api.pankratov.nomorepartiesxyz.ru',
    'http://api.pankratov.nomorepartiesxyz.ru',
  ],
  credentials: true,
}));

app.use(allowedCors);
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Не забудьте удалить этот код после успешного прохождения ревью:
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(allRouters);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});

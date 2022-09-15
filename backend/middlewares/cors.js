// --- альтернативное подключение CORS ---
// const allowedCors = [
//   'http://localhost:3000',
//   'https://localhost:3000',
//   'http://localhost:3001',
//   'https://localhost:3001',
//   'https://pankratov.nomorepartiesxyz.ru',
//   'http://pankratov.nomorepartiesxyz.ru',
//   'https://api.pankratov.nomorepartiesxyz.ru',
//   'http://api.pankratov.nomorepartiesxyz.ru',
//   'https://www.api.pankratov.nomorepartiesxyz.ru',
//   'http://www.api.pankratov.nomorepartiesxyz.ru',
// ];

// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const METHODS = 'GET,POST,PATCH,DELETE,HEAD,PUT';

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);

//     return res.end();
//   }

//   return next();
// };

// module.exports = cors;

// --- альтернативное подключение CORS ---
const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://pankratov.nomorepartiesxyz.ru',
  'http://pankratov.nomorepartiesxyz.ru',
  'https://www.pankratov.nomorepartiesxyz.ru',
  'http://www.pankratov.nomorepartiesxyz.ru',
  'https://api.pankratov.nomorepartiesxyz.ru',
  'http://api.pankratov.nomorepartiesxyz.ru',
  'https://www.api.pankratov.nomorepartiesxyz.ru',
  'http://www.api.pankratov.nomorepartiesxyz.ru',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', requestHeaders);
    return res.end();
  }

  return next();
};

// --- альтернативное подключение CORS (нужен пакет npm cors) ---
// const cors = require('cors');
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://localhost:3000',
//     'http://localhost:3001',
//     'https://localhost:3001',
//     'https://pankratov.nomorepartiesxyz.ru',
//     'http://pankratov.nomorepartiesxyz.ru',
//     'https://api.pankratov.nomorepartiesxyz.ru',
//     'http://api.pankratov.nomorepartiesxyz.ru',
//   ],
//   credentials: true,
// }));

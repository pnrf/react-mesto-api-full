// const allowedCors = [
//   'http://localhost:3000',
//   'https://localhost:3000',
//   'http://localhost:3001',
//   'https://localhost:3001',
//   'https://pankratov.nomorepartiesxyz.ru',
//   'http://pankratov.nomorepartiesxyz.ru',
//   'https://www.pankratov.nomorepartiesxyz.ru',
//   'http://www.pankratov.nomorepartiesxyz.ru',
//   'https://api.pankratov.nomorepartiesxyz.ru',
//   'http://api.pankratov.nomorepartiesxyz.ru',
//   'https://www.api.pankratov.nomorepartiesxyz.ru',
//   'http://www.api.pankratov.nomorepartiesxyz.ru',
// ];

// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     console.log('Проверяю cors 1', origin);
//   }

//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', requestHeaders);
//     console.log('Проверяю cors 2', requestHeaders);
//     return res.end();
//   }

//   console.log('Проверяю cors 3');
//   return next();
// };

// --- альтернативное подключение CORS ---
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

import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';
import cors from 'cors'; // Thêm import cors
require('dotenv').config();

let app = express();

// Bật CORS cho tất cả các tuyến
app.use(cors({
  origin: 'http://localhost:5173', // Chỉ cho phép nguồn này
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các tiêu đề được phép
}));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("Backend Nodejs is running on the port: " + port);
});
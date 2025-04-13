const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');
const helmet = require('helmet');
const compression = require('compression');

// Import routes
const userRoutes = require('./routes/users');
const artifactRoutes = require('./routes/artifacts');
const gameRoutes = require('./routes/games');
const timelineRoutes = require('./routes/timelines');
const authRoutes = require('./routes/auth');

// Import SQL configuration
const { testConnection } = require('./config/db');

// Config
dotenv.config({ path: '../.env' });
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kiểm tra kết nối đến SQL
testConnection()
  .then(sqlConnected => {
    console.log(sqlConnected 
      ? 'Kết nối SQL thành công!'
      : 'Không thể kết nối đến SQL, kiểm tra lại cấu hình trong .env');
  })
  .catch(err => {
    console.error('Lỗi kết nối SQL:', err.message);
  });

// Replace <db_password> placeholder with environment variable if needed
const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('MongoDB URI không được định nghĩa trong file .env!');
  process.exit(1);
}

// Kết nối đến MongoDB
console.log('Đang kết nối đến MongoDB...');
mongoose.connect(dbUri)
  .then(() => {
    console.log('Kết nối thành công đến MongoDB!');
    console.log(`Địa chỉ kết nối: ${dbUri.split('@')[1].split('/')[0]}`);
  })
  .catch(err => {
    console.error('Lỗi kết nối MongoDB:', err.message);
    
    // Hiển thị thông tin lỗi chi tiết hơn
    if (err.message.includes('ENOTFOUND')) {
      console.error('Không thể tìm thấy máy chủ MongoDB. Vui lòng kiểm tra lại tên máy chủ.');
    } else if (err.message.includes('ETIMEDOUT')) {
      console.error('Kết nối đến MongoDB bị timeout. Vui lòng kiểm tra mạng hoặc firewall.');
    } else if (err.message.includes('Authentication failed')) {
      console.error('Xác thực MongoDB thất bại. Vui lòng kiểm tra lại username và password.');
      console.error('Lưu ý: Bạn cần thay thế <db_password> trong connection string bằng mật khẩu thực.');
    } else if (err.message.includes('bad auth')) {
      console.error('Xác thực MongoDB thất bại. Vui lòng kiểm tra lại username và password.');
    }
    
    process.exit(1);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/artifacts', artifactRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/timelines', timelineRoutes);
app.use('/api/auth', authRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join_museum', (museumId) => {
    socket.join(museumId);
    console.log(`User joined museum: ${museumId}`);
  });
  
  socket.on('send_message', (data) => {
    socket.to(data.museumId).emit('receive_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
  console.log(`Truy cập frontend tại: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`API có sẵn tại: http://localhost:${PORT}/api`);
});

module.exports = { app, server, io }; 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Không có token xác thực!' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'heritage_journey_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
    req.user = user;
    next();
  });
};

// API đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp username và password!' });
    }
    
    // Truy vấn SQL để tìm user theo username
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1',
      [username, username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
    }
    
    const user = users[0];
    
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác!' });
    }
    
    // Cập nhật thời gian đăng nhập cuối
    await pool.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );
    
    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'heritage_journey_secret',
      { expiresIn: '1h' }
    );
    
    // Tạo refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'heritage_journey_refresh_secret',
      { expiresIn: '7d' }
    );
    
    // Lưu refresh token vào cơ sở dữ liệu
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Hết hạn sau 7 ngày
    
    await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, refreshToken, expiresAt]
    );
    
    // Trả về thông tin người dùng và token
    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        avatar: user.avatar,
        role: user.role
      },
      token,
      refreshToken
    });
    
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
  }
});

// API đăng ký người dùng mới
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    
    // Kiểm tra thông tin bắt buộc
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }
    
    // Kiểm tra username và email đã tồn tại chưa
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existingUsers.length > 0) {
      if (existingUsers[0].username === username) {
        return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
      }
      if (existingUsers[0].email === email) {
        return res.status(400).json({ message: 'Email đã tồn tại!' });
      }
    }
    
    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Thêm người dùng mới vào cơ sở dữ liệu
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, fullName || username]
    );
    
    if (result.affectedRows === 1) {
      // Tạo token
      const token = jwt.sign(
        { id: result.insertId, username, role: 'user' },
        process.env.JWT_SECRET || 'heritage_journey_secret',
        { expiresIn: '1h' }
      );
      
      return res.status(201).json({
        message: 'Đăng ký thành công!',
        user: {
          id: result.insertId,
          username,
          email,
          fullName: fullName || username,
          role: 'user'
        },
        token
      });
    } else {
      return res.status(500).json({ message: 'Không thể tạo người dùng!' });
    }
    
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
  }
});

// API refresh token
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token không được cung cấp!' });
  }
  
  try {
    // Kiểm tra token có trong cơ sở dữ liệu không
    const [tokens] = await pool.execute(
      'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > CURRENT_TIMESTAMP',
      [refreshToken]
    );
    
    if (tokens.length === 0) {
      return res.status(403).json({ message: 'Refresh token không hợp lệ hoặc đã hết hạn!' });
    }
    
    // Xác thực refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'heritage_journey_refresh_secret'
    );
    
    // Lấy thông tin người dùng
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [decoded.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }
    
    const user = users[0];
    
    // Tạo token mới
    const newToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'heritage_journey_secret',
      { expiresIn: '1h' }
    );
    
    return res.status(200).json({
      message: 'Làm mới token thành công!',
      token: newToken
    });
    
  } catch (error) {
    console.error('Lỗi refresh token:', error);
    return res.status(403).json({ message: 'Refresh token không hợp lệ!', error: error.message });
  }
});

// API đăng xuất
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      // Xóa refresh token khỏi cơ sở dữ liệu
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE token = ?',
        [refreshToken]
      );
    }
    
    return res.status(200).json({ message: 'Đăng xuất thành công!' });
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
  }
});

// API kiểm tra thông tin người dùng hiện tại
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const [users] = await pool.execute(
      'SELECT id, username, email, full_name, avatar, role, created_at, last_login FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    }
    
    const user = users[0];
    
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.created_at,
        lastLogin: user.last_login
      }
    });
    
  } catch (error) {
    console.error('Lỗi lấy thông tin người dùng:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
  }
});

module.exports = router; 
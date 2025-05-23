# Hướng dẫn chạy dự án "Hành trình di sản"

## 1. Cài đặt môi trường

### Yêu cầu
- Node.js (v14+)
- npm (v6+) hoặc yarn
- MongoDB (chúng ta sẽ sử dụng MongoDB Atlas)

### Cài đặt dependencies

```bash
# Đi vào thư mục dự án
cd heritage-journey

# Cài đặt các dependencies cho phần frontend
npm install

# Cài đặt các dependencies cho phần backend
cd server
npm install
cd ..
```

## 2. Cấu hình MongoDB

File `.env` đã được tạo với connection string MongoDB. Trước khi chạy, bạn cần thay thế `<db_password>` bằng mật khẩu thực của bạn:

1. Mở file `.env` trong thư mục gốc dự án
2. Tìm dòng MONGODB_URI
3. Thay thế `<db_password>` bằng mật khẩu thực của tài khoản MongoDB
4. Lưu file

```
MONGODB_URI=mongodb+srv://atlas-sample-dataset-load-67fa9b9a4e33ef2959cb8b47:your_actual_password@wda2025.jpb6d3u.mongodb.net/heritage-journey?retryWrites=true&w=majority&appName=WDA2025
```

## 3. Chuẩn bị các hình ảnh và tài nguyên

Để website hiển thị đúng, bạn cần chuẩn bị các hình ảnh sau:

```bash
# Tạo các thư mục cần thiết
mkdir -p public/images/icons
mkdir -p public/images/characters
mkdir -p public/images/avatars
```

Đặt các hình ảnh vào thư mục tương ứng:

1. **Logo**: Đặt logo ở `public/images/logo.png`
2. **Icons**: Đặt các biểu tượng như home.png, leaderboard.png, shop.png, calendar.png, gold.png, silver.png, gift.png trong `public/images/icons/`
3. **Nhân vật**: Đặt hình ảnh nhân vật trong `public/images/characters/`
4. **Avatar**: Đặt hình ảnh avatar người dùng trong `public/images/avatars/`

## 4. Chạy dự án

### Chạy cả frontend và backend

```bash
# Từ thư mục gốc của dự án
npm run dev
```

### Chạy riêng phần frontend

```bash
# Từ thư mục gốc của dự án
npm run start
```

### Chạy riêng phần backend

```bash
# Từ thư mục gốc của dự án
npm run server
```

## 5. Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 6. Xử lý lỗi phổ biến

### Lỗi kết nối MongoDB

Nếu gặp lỗi "Authentication failed", kiểm tra:
- Đảm bảo đã thay thế `<db_password>` bằng mật khẩu thực
- Đảm bảo tên người dùng và mật khẩu chính xác

### Lỗi "Cannot find module"

Nếu gặp lỗi này, kiểm tra:
- Đã cài đặt đủ dependencies cho cả frontend và backend
- Chạy lại lệnh `npm install` trong thư mục gốc và thư mục server

### Lỗi "Port already in use"

Nếu cổng 3000 hoặc 5000 đã được sử dụng, bạn có thể thay đổi cổng:
- Thay đổi PORT trong file `.env`
- Hoặc dừng ứng dụng đang sử dụng cổng đó trước khi chạy

## 7. Các lệnh hữu ích

```bash
# Kiểm tra phiên bản Node.js
node -v

# Kiểm tra phiên bản npm
npm -v

# Xem danh sách các cổng đang sử dụng
# Windows
netstat -ano | findstr 3000
netstat -ano | findstr 5000

# Mac/Linux
lsof -i :3000
lsof -i :5000
```

## Hỗ trợ

Nếu bạn gặp vấn đề khi cài đặt hoặc chạy dự án, vui lòng liên hệ với người phát triển. 
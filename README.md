# Hành trình di sản (Heritage Journey)

Dự án "Hành trình di sản" là một trò chơi mô phỏng du hành thời gian, cho phép người chơi tham gia vào một bảo tàng giả tưởng từ tương lai (Museum of the Future) nơi kết hợp giữa yếu tố hiện đại như trí tuệ nhân tạo, chuyển đổi số đan xen quá khứ bao gồm những hiện vật lịch sử và di sản văn hóa độc đáo của Việt Nam.

## Tính năng chính

- **Chế độ du hành thời gian**: Tương tác với cổ vật và du hành về thời điểm chúng được tạo ra
- **Cốt truyện và mini game**: Cốt truyện lịch sử và các mini game tương tác
- **Khám phá môi trường ảo**: Mô phỏng không gian bảo tàng và các địa điểm lịch sử
- **Chế độ giáo dục**: Bài học, câu hỏi trắc nghiệm và thông tin tham khảo
- **Hệ thống nhân vật**: Nhân vật chibi có thể tùy chỉnh với trang phục truyền thống
- **Bảo tàng cá nhân**: Xây dựng bảo tàng ảo riêng và trưng bày cổ vật đã mở khóa

## Cài đặt và Sử dụng

### Yêu cầu

- Node.js (v14+)
- MongoDB
- NPM hoặc Yarn

### Cài đặt

1. Clone repository:
```
git clone https://github.com/your-username/heritage-journey.git
cd heritage-journey
```

2. Cài đặt các dependencies cho frontend:
```
npm install
```

3. Cài đặt các dependencies cho backend:
```
cd server
npm install
```

4. Tạo file .env:
```
MONGODB_URI=mongodb+srv://atlas-sample-dataset-load-67fa9b9a4e33ef2959cb8b47:Minhtienhuynh5@wda2025.jpb6d3u.mongodb.net/heritage-journey?retryWrites=true&w=majority&appName=WDA2025
JWT_SECRET=your_jwt_secret
```

5. Chạy ứng dụng ở chế độ development:
```
npm run dev
```

## Công nghệ sử dụng

### Frontend
- HTML5 & CSS3
- React.js
- WebGL & Three.js
- Socket.IO Client

### Backend
- Node.js với Express.js
- MongoDB
- Socket.IO

## Đóng góp

Mọi đóng góp đều được chào đón. Vui lòng tạo pull request hoặc issue để đóng góp cho dự án. 
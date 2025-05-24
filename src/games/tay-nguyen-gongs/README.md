# Không Gian Văn Hóa Cồng Chiêng Tây Nguyên

Module game demo độc lập dành cho dự án "Hành trình di sản" (Heritage Journey).

## Giới thiệu

Đây là một trò chơi demo tương tác 2D mô phỏng không gian văn hóa cồng chiêng Tây Nguyên, được công nhận là di sản văn hóa phi vật thể của UNESCO năm 2005. Trò chơi tái hiện khung cảnh buôn làng Tây Nguyên với giao diện đơn giản, cho phép người dùng tương tác với trợ lý và già làng để tìm hiểu về văn hóa cồng chiêng cũng như tham dự một lễ hội cồng chiêng truyền thống.

## Cấu trúc thư mục

```
tay-nguyen-gongs/
├── assets/                     # Hình ảnh và tài nguyên
│   ├── village-background.webp  # Nền làng Tây Nguyên
│   ├── character.webp           # Nhân vật người chơi
│   ├── elder.webp               # Nhân vật già làng
│   └── assistant.webp           # Nhân vật trợ lý
├── TayNguyenGongsGame.jsx      # Component chính của game
├── TayNguyenGongsPage.jsx      # Component trang hiển thị
├── index.js                    # File export
└── README.md                   # Tài liệu
```

## Tính năng

1. **Môi trường 2D**: Tái hiện khung cảnh buôn làng Tây Nguyên đơn giản.
2. **Nhân vật tương tác**: Người chơi có thể giao tiếp với các nhân vật NPC.
3. **Hệ thống đối thoại**: Các cuộc trò chuyện phong phú với nhiều lựa chọn.
4. **Nội dung giáo dục**: Thông tin về lịch sử, văn hóa và ý nghĩa của cồng chiêng.
5. **Mô phỏng lễ hội**: Trải nghiệm một lễ hội cồng chiêng truyền thống.

## Cách sử dụng

### Tích hợp vào dự án chính

Để tích hợp module game này vào dự án Heritage Journey chính, bạn có thể import component TayNguyenGongsPage hoặc TayNguyenGongsGame:

```jsx
// Trong file router hoặc App.js của dự án chính
import TayNguyenGongsPage from './games/tay-nguyen-gongs/TayNguyenGongsPage';

// Sau đó thêm vào Route
<Route path="/games/tay-nguyen-gongs" element={<TayNguyenGongsPage />} />
```

### Phát triển độc lập

Module này có thể được phát triển và kiểm thử độc lập trước khi tích hợp vào dự án chính:

1. Chạy dự án development:
```
npm run dev
```

2. Truy cập đường dẫn:
```
http://localhost:3000/games/tay-nguyen-gongs
```

## Phát triển trong tương lai

- Thêm các hiệu ứng âm thanh đặc trưng của cồng chiêng
- Tích hợp mini-game cho phép người chơi thử chơi cồng chiêng
- Mở rộng không gian làng với nhiều địa điểm tham quan hơn
- Thêm các hiệu ứng hoạt hình và chuyển động cho nhân vật
- Hỗ trợ đa ngôn ngữ (Việt, Anh, các ngôn ngữ dân tộc Tây Nguyên)

## Tác giả

Dự án Heritage Journey Team

## Giấy phép

Nội dung thuộc về dự án "Hành trình di sản" (Heritage Journey). 
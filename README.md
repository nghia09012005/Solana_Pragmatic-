# 🏛️ Hành trình di sản (Heritage Journey)

Dự án "Hành trình di sản" là một trò chơi mô phỏng du hành thời gian, cho phép người chơi tham gia vào một bảo tàng giả tưởng từ tương lai (Museum of the Future) nơi kết hợp giữa yếu tố hiện đại như blockchain, trí tuệ nhân tạo, chuyển đổi số đan xen quá khứ bao gồm những hiện vật lịch sử và di sản văn hóa độc đáo của Việt Nam.

## Tính năng chính

- **Chế độ du hành thời gian**: Tương tác với cổ vật và du hành về thời điểm chúng được tạo ra
- **Cốt truyện và mini game**: Cốt truyện lịch sử và các mini game tương tác
- **Khám phá môi trường ảo**: Mô phỏng không gian bảo tàng và các địa điểm lịch sử
- **Chế độ giáo dục**: Bài học, câu hỏi trắc nghiệm và thông tin tham khảo
- **Hệ thống nhân vật**: Nhân vật chibi có thể tùy chỉnh với trang phục truyền thống
- **Bảo tàng cá nhân**: Xây dựng bảo tàng ảo riêng và trưng bày cổ vật đã mở khóa
- **Tích hợp Blockchain Solana**:
  - **Kết nối ví Phantom**: Người chơi có thể kết nối ví Phantom để tương tác với blockchain Solana trực tiếp từ trình duyệt.
  - **Cổ vật NFT được mint trên Solana**: Mỗi cổ vật hoặc nhân vật lịch sử là một NFT duy nhất, được tạo theo tiêu chuẩn Metaplex trên Solana.
  - **Mini game gắn với địa điểm**: Mỗi mini game đại diện cho một địa danh hoặc sự kiện lịch sử. Khi người chơi hoàn thành đủ số lượng thử thách tại các địa điểm này, họ sẽ nhận được phần thưởng là NFT đặc biệt.
  - **Lưu tiến trình và lựa chọn qua smart contract**: Tiến trình chơi và các lựa chọn quan trọng của người chơi sẽ được ghi nhận và lưu trữ trên blockchain thông qua smart contract viết bằng Rust (Anchor framework).
  - **Giao dịch NFT**: Các NFT thu thập được có thể được giao dịch thông qua:
    - [Magic Eden](https://magiceden.io/)
    - Marketplace tùy chỉnh được tích hợp trong game

## Cài đặt và Sử dụng

### Yêu cầu

- Node.js (v14+)
- NPM hoặc Yarn

### Cài đặt

1. Clone repository:
```
git clone https://github.com/nghia09012005/Solana_Pragmatic-.git
cd heritage-journey
```

2. Cài đặt các dependencies cho frontend:
```
npm install
```


5. Chạy ứng dụng ở chế độ development:
```
npm start
```

## Công nghệ sử dụng

### Frontend
- HTML5 & CSS3
- React.js

### Blockchain
- Solana blockchain
- Smart contract (Rust + Anchor)
- Metaplex NFT standard
- Wallet: Phantom, Solflare
- Marketplace: Magic Eden hoặc marketplace tùy chỉnh trong game

## Tool chuyển các file ảnh thành .webp
Chuyển thành webp: convertToWebP.js
Đổi references: updateImageReferences.js
Chuyển các file không phải webp vào src: moveNonWebPImages.js
Chạy tất cả file trên: runAll.js

### Cách chạy
node <file-name>


## Truy cập tại
```
https://wda2025.vercel.app/
```


## Đóng góp

Mọi đóng góp đều được chào đón. Vui lòng tạo pull request hoặc issue để đóng góp cho dự án. 

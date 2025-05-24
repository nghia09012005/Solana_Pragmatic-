import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GameCanvas = ({ onMount }) => {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let game;
    class MainScene extends Phaser.Scene {
      constructor() {
        super({ key: "MainScene" });
        this.player = null;
        this.cursors = null;
        this.score = 0;
        this.lives = 3;
        this.scoreText = null;
        this.livesText = null;
        this.canJump = true; // Thêm biến cờ kiểm soát nhảy
        this.isDead = false; // Cờ kiểm tra trạng thái chết
      }
      preload() {
        // Tạo texture cho cable car trực tiếp trong code thay vì tải từ file
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Vẽ thân cabin
        graphics.fillStyle(0xA0522D); // Màu nâu gỗ
        graphics.fillRect(10, 10, 60, 40);
        
        // Vẽ mái cabin
        graphics.fillStyle(0x8B4513); // Màu nâu đậm hơn
        graphics.fillRect(5, 5, 70, 10);
        
        // Vẽ cửa sổ
        graphics.fillStyle(0x87CEEB); // Màu xanh da trời
        graphics.fillRect(20, 20, 15, 15);
        graphics.fillRect(45, 20, 15, 15);
        
        // Vẽ dây cáp
        graphics.lineStyle(2, 0x333333);
        graphics.moveTo(40, 0);
        graphics.lineTo(40, 5);
        
        // Tạo texture từ đồ họa
        graphics.generateTexture('cableCar', 80, 60);
        graphics.destroy();
      }
      create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        // Sky
        this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);
        // Platforms group
        this.platforms = this.physics.add.staticGroup();
        // Mặt đất cao gần bằng 1/3 màn hình
        const groundHeight = Math.floor(height / 3);
        // Ground vật lý dài hơn màn hình một chút
        const groundWidth = width * 1.3;
        const groundX = groundWidth / 2; // ground sát trái
        this.ground = this.platforms
          .create(groundX, height - groundHeight / 2, "ground")
          .setDisplaySize(groundWidth, groundHeight)
          .refreshBody();
        // Ground mới xuất hiện ở vị trí thấp hơn so với trước đây
        const ground2Y = Math.floor(height / 2); // Thay đổi từ height/4 thành height/3 để ground2 thấp hơn
        this.ground2 = this.platforms
          .create(
            this.ground.x + this.ground.displayWidth / 2 + 2000,
            ground2Y,
            "ground2"
          )
          .setDisplaySize(groundWidth, groundHeight)
          .refreshBody();
          
        // Vẽ dây cáp treo trước khi tạo các platform
        this.drawCableLines();
        // Tạo 10 plat dạng cầu thang đi xuống, xuất phát ở cuối mặt đất
        this.platCount = 10;
        this.platGapX = 300; // khoảng cách ngang giữa các plat (tăng lên cho xa hơn)
        this.platGapY = 80; // khoảng cách dọc giữa các plat (tăng lên cho xa hơn)
        this.plats = [];
        this.platOriginX = [];
        this.platOriginY = [];
        this.cableCars = []; // Mảng chứa các cable car
        const groundEndX = this.ground.x + this.ground.displayWidth / 2;
        for (let i = 0; i < this.platCount; i++) {
          const platX = groundEndX + i * this.platGapX;
          const platY =
            this.ground.y -
            this.ground.displayHeight / 2 -
            60 -
            i * this.platGapY - 60;
          
          // Tạo platform ẩn (va chạm) - làm nhỏ hơn để phù hợp với cable car
          const plat = this.platforms
            .create(platX, platY, `plat${(i % 4) + 1}`)
            .setDisplaySize(80, 10)
            .setAlpha(0) // Ẩn platform hoàn toàn, chỉ giữ lại va chạm
            .refreshBody();
          
          this.plats.push(plat);
          this.platOriginX.push(platX);
          this.platOriginY.push(platY);
          
          // Tạo cable car và gắn vào platform
          const cableCar = this.add.image(platX, platY - 25, 'cableCar');
          cableCar.setDisplaySize(80, 60); // Điều chỉnh kích thước cable car cho phù hợp
          this.cableCars.push(cableCar);
          
          // Vẽ dây nối từ cable car lên trên
          const cableY = this.sys.game.config.height / 4 - (platX / this.sys.game.config.width) * 50;
          const cableConnector = this.add.graphics();
          cableConnector.lineStyle(2, 0x333333, 1);
          cableConnector.beginPath();
          cableConnector.moveTo(platX, platY - 50);
          cableConnector.lineTo(platX, cableY);
          cableConnector.strokePath();
          
          // Lưu tham chiếu đến connector
          cableCar.connector = cableConnector;
        }
        
        // Player xuất phát ở giữa màn hình
        this.player = this.physics.add.sprite(
          width / 2,
          height - groundHeight + 1 - 15,
          "player"
        );
        this.player.displayWidth = 30;
        this.player.displayHeight = 30;
        // this.player.setCollideWorldBounds(true);
        // Cho phép player di chuyển tự do toàn màn hình (không setBoundsRectangle)
        this.physics.add.collider(this.player, this.platforms);
        // Items
        this.items = this.physics.add.group();
        this.items
          .create(width * 0.18 + 80, height - 230, "item1")
          .setDisplaySize(15, 15);
        this.items
          .create(width * 0.38 + 20, height - 300, "item2")
          .setDisplaySize(15, 15);
        this.items.children.iterate((child) => child.setTint(0x0000ff));
        // Obstacles
        this.obstacles = this.physics.add.group();
        this.obstacles
          .create(width * 0.55 + 90, height - 340, "obs1")
          .setDisplaySize(30, 20)
          .setTint(0x222222);
        // Score & lives
        // Colliders
        this.physics.add.overlap(
          this.player,
          this.items,
          this.collectItem,
          null,
          this
        );
        this.physics.add.overlap(
          this.player,
          this.obstacles,
          this.hitObstacle,
          null,
          this
        );
        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        // Camera follow player, focus chính giữa player với theo dõi mượt mà hơn
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09, 0, -50); // Giảm lerp để chuyển động mượt hơn, offset Y để nhìn thấy phía trên player
        // Camera chỉ giới hạn không xuống dưới ground
        const cam = this.cameras.main;
        const groundTop = this.ground.y;
        const infiniteWidth = 999999; // giá trị rất lớn để mô phỏng vô tận
        cam.setBounds(0, 0, infiniteWidth, height); // Camera không xuống dưới ground
        
        // Cài đặt thêm cho camera
        cam.setDeadzone(100, 200); // Tạo deadzone để camera không di chuyển với các chuyển động nhỏ
        cam.setLerp(0.1, 0.1); // Làm mượt chuyển động camera
        // Cho camera và world dài vô tận cả chiều ngang lẫn chiều dọc
        const infiniteHeight = 999999; // giá trị rất lớn để mô phỏng vô tận
        this.physics.world.setBounds(0, 0, infiniteWidth, infiniteHeight); // Player không bị giới hạn ngang/dọc
        this.player.x = width / 2; // Đặt player ở giữa màn hình khi bắt đầu
      }
      update() {
        if (!this.player) return;
        // Nếu player đã chết thì không update nữa
        if (this.isDead) return;
        
        // Đảm bảo camera luôn theo dõi player và hướng cao hơn
        const cam = this.cameras.main;
        
        // Lấy kích thước của game
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        
        // Điều chỉnh lerp của camera dựa trên tốc độ di chuyển của player
        // Khi player nhảy cao hoặc rơi nhanh, camera cần theo kịp
        if (Math.abs(this.player.body.velocity.y) > 200) {
          // Tăng lerp khi di chuyển nhanh để camera theo kịp
          cam.setLerp(0.3, 0.3);
        } else {
          // Giảm lerp khi di chuyển chậm để chuyển động mượt hơn
          cam.setLerp(0.2, 0.2);
        }
        // Di chuyển ngang đều cho cả hai chiều
        const moveSpeed = 400;
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-moveSpeed);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(moveSpeed);
        } else {
          this.player.setVelocityX(0);
        }
        // Nhảy nhanh và cao hơn
        if (
          this.cursors.space.isDown &&
          this.player.body.onFloor() &&
          this.canJump
        ) {
          this.player.setVelocityY(-400); // tăng lực nhảy để nhảy cao hơn
          this.canJump = false;
        }
        if (!this.cursors.space.isDown && this.player.body.onFloor()) {
          this.canJump = true;
        }
        // Hiệu ứng cáp treo cầu thang: các plat di chuyển từ từ theo dốc, lặp lại vô hạn
        const slope = 0.25; // Độ dốc cầu thang
        const speed = 1.2; // tốc độ di chuyển ngang
        const groundEndX = this.ground.x + this.ground.displayWidth / 2;
        const platLength = this.platGapX * this.platCount;
        for (let i = 0; i < this.platCount; i++) {
          let x =
            groundEndX +
            (this.platGapX * i - (((this.time.now / 16) * speed) % platLength));
          if (x < groundEndX) x += platLength;
          // Tính y như cũ
          let y =
            this.ground.y -
            this.ground.displayHeight / 2 -
            60 -
            i * this.platGapY +
            (this.platOriginX[i] - x) * slope + 60;
          // Nếu plat đã chạm mặt đất thì ẩn đi (hoặc reset lại vị trí ngoài vòng lặp)
          const platBottom = y + 5; // 5 là nửa chiều cao plat
          const groundTop = this.ground.y - this.ground.displayHeight / 2;
          if (platBottom >= groundTop) {
            // Đưa plat ra khỏi màn hình để chuẩn bị lặp lại
            x = groundEndX + platLength;
            // Reset lại đúng vị trí ban đầu trên cao
            y = this.ground.y - this.ground.displayHeight / 2 - 120 - i * this.platGapY;
          }
          this.plats[i].x = x;
          this.plats[i].y = y;
          
          // Cập nhật vị trí cable car theo platform
          if (this.cableCars[i]) {
            this.cableCars[i].x = x;
            this.cableCars[i].y = y - 25; // Đặt cable car ở trên platform
            
            // Thêm hiệu ứng lắc nhẹ cho cable car
            const swingFactor = Math.sin(this.time.now / 500 + i) * 2;
            this.cableCars[i].angle = swingFactor;
            
            // Cập nhật dây nối
            if (this.cableCars[i].connector) {
              const cableY = this.sys.game.config.height / 4 - (x / this.sys.game.config.width) * 50;
              this.cableCars[i].connector.clear();
              this.cableCars[i].connector.lineStyle(2, 0x333333, 1);
              this.cableCars[i].connector.beginPath();
              this.cableCars[i].connector.moveTo(x, y - 50);
              this.cableCars[i].connector.lineTo(x, cableY);
              this.cableCars[i].connector.strokePath();
            }
          }
        }
        this.platforms.refresh();
        // Kiểm tra nếu player rơi xuống hole (dưới ground)
        const groundTop = this.ground.y - this.ground.displayHeight / 2;
        if (this.player.y > groundTop + 20) {
          this.isDead = true;
          // Hiệu ứng chết: nháy đỏ, delay rồi reset vị trí
          this.player.setTint(0xff0000);
          this.time.delayedCall(700, () => {
            this.player.clearTint();
            // this.player.x = width / 2;
            this.player.y = groundTop - 15;
            this.player.setVelocity(0, 0);
            this.isDead = false;
            this.scene.restart();
            return;
          });
        }
      }
      collectItem(player, item) {
        item.disableBody(true, true);
        this.score += 10;
        if (this.scoreText) this.scoreText.setText(`Score: ${this.score}`);
      }
      hitObstacle(player, obs) {
        obs.disableBody(true, true);
        this.lives = Math.max(0, this.lives - 1);
        if (this.livesText) this.livesText.setText(`Lives: ${this.lives}`);
      }
      
      // Phương thức để lấy vị trí của cable car
      getCableCarPositions() {
        return this.cableCars;
      }

      // Hàm vẽ dây cáp treo
      drawCableLines() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        
        // Tạo đường dây cáp chính
        const graphics = this.add.graphics();
        graphics.lineStyle(3, 0x333333, 1);
        
        // Dây cáp 1 - dây chính
        graphics.beginPath();
        graphics.moveTo(0, height / 4);
        graphics.lineTo(width * 2, height / 4 - 100);
        graphics.strokePath();
        
        // Dây cáp 2 - dây phụ
        graphics.lineStyle(2, 0x333333, 1);
        graphics.beginPath();
        graphics.moveTo(0, height / 4 + 20);
        graphics.lineTo(width * 2, height / 4 - 80);
        graphics.strokePath();
        
        // Tạo các cột trụ dọc theo dây cáp
        const poleCount = 5;
        for (let i = 0; i < poleCount; i++) {
          const poleX = width / 5 * i + 200;
          const poleY = height / 4 - i * 10;
          
          // Vẽ cột
          graphics.lineStyle(8, 0x444444, 1);
          graphics.beginPath();
          graphics.moveTo(poleX, poleY);
          graphics.lineTo(poleX, poleY + 150);
          graphics.strokePath();
          
          // Vẽ đế cột
          graphics.fillStyle(0x333333, 1);
          graphics.fillRect(poleX - 15, poleY + 150, 30, 20);
        }
      }
    }
    // Khởi tạo game
    game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#87ceeb",
      parent: containerRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
          debug: false,
        },
      },
      audio: {
        noAudio: true, // Tắt hoàn toàn hệ thống âm thanh để tránh lỗi AudioContext
      },
      scene: MainScene,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      loader: {
        baseURL: window.location.origin
      }
    });
    gameRef.current = game;
    
    // Gọi callback onMount nếu được cung cấp
    if (onMount && typeof onMount === 'function') {
      onMount(game);
    }
    
    // Cleanup
    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [onMount]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    />
  );
};

export default GameCanvas;

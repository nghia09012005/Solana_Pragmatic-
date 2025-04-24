/**
 * Các hằng số và tiện ích cho game Cồng Chiêng Tây Nguyên
 */

// Game constants
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 700;
export const CHARACTER_WIDTH = 400;
export const CHARACTER_HEIGHT = 400;

// Âm thanh
export const SOUND_PATHS = {
  BACKGROUND: '../../assets/TayNguyenGame/sound/nhac_nen.mp3'
};

// Game data
export const MESSAGE_INBOX = [
  "Không gian văn hóa Cồng chiêng Tây Nguyên là di sản văn hóa phi vật thể được UNESCO công nhận vào năm 2005.",
  "Cồng chiêng gắn liền với đời sống văn hóa tâm linh của người Tây Nguyên trong các nghi lễ quan trọng.",
  "Mỗi bộ cồng chiêng truyền thống có thể bao gồm từ 2 đến 20 chiếc với kích thước và âm sắc đa dạng.",
  "Văn hóa cồng chiêng là cầu nối giữa con người với thế giới tâm linh, được lưu truyền qua nhiều thế hệ.",
  "Âm thanh cồng chiêng tạo nên không gian văn hóa đặc sắc và kết nối cộng đồng các dân tộc Tây Nguyên.",
  "Nghệ thuật diễn tấu cồng chiêng thể hiện sự hòa hợp và tinh thần cộng đồng của các dân tộc.",
  "Các nhạc cụ truyền thống như đàn đá, đàn t'rưng là một phần không thể thiếu của văn hóa Tây Nguyên.",
  "Lễ hội truyền thống như mừng lúa mới và lễ cầu mưa là dịp để thưởng thức văn hóa cồng chiêng.",
  "Không gian văn hóa cồng chiêng Tây Nguyên bao gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng.",
  "Di sản văn hóa phi vật thể cồng chiêng Tây Nguyên cần được bảo tồn và phát huy giá trị."
];

// Săn Hồn Chiêng minigame data
export const MINIGAME_PIECES = {
  TRONG_DAT: {
    id: "trong_dat",
    name: "Trống Đất",
    description: "Không gian văn hóa cồng chiêng Tây Nguyên bao gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng.",
    collected: false,
    question: "Không gian văn hoá Cồng chiêng Tây Nguyên thuộc địa bàn các tỉnh nào?",
    options: [
      "Kon Tum, Gia Lai, Đắk Nông, Lâm Đồng",
      "Đắk Lắk, Đắk Nông, Gia Lai, Kon Tum",
      "Gia Lai, Đắk Lắk, Đắk Nông",
      "Lâm Đồng, Kon Tum"
    ],
    correctAnswer: 0
  },
  HOI_LUA: {
    id: "hoi_lua",
    name: "Hơi Lửa",
    description: "Lễ hội cồng chiêng thường diễn ra vào mùa xuân, thời điểm sau vụ thu hoạch, để tạ ơn thần linh và cầu mong mùa màng bội thu.",
    collected: false,
    question: "Lễ hội cồng chiêng Tây Nguyên thường được tổ chức vào thời điểm nào trong năm?",
    options: [
      "Mùa xuân",
      "Mùa hè",
      "Mùa thu",
      "Mùa đông"
    ],
    correctAnswer: 0
  },
  BONG_RUNG: {
    id: "bong_rung",
    name: "Bóng Rừng",
    description: "Không",
    collected: false,
    question: "Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận là di sản văn hóa vào năm nào?",
    options: [
      "1999",
      "2002",
      "2004",
      "2005"
    ],
    correctAnswer: 3
  }
};

// Game stages
export const GAME_STAGES = {
  INTRO: "intro",
  MINIGAME: "minigame",
  RONG_HOUSE: "rong_house",
  FESTIVAL: "festival"
};

export const getRandomFact = () => {
  const randomIndex = Math.floor(Math.random() * MESSAGE_INBOX.length);
  return MESSAGE_INBOX[randomIndex];
};

// Âm thanh game
export const playGongSound = () => {
  try {
    // Tạo âm thanh mới mỗi lần gọi
    const gongSound = new Audio('/assets/TayNguyenGame/gong.mp3');
    gongSound.volume = 0.7;
    gongSound.play().catch(error => {
      console.error("Không thể phát âm thanh gong:", error);
    });
  } catch (error) {
    console.error("Lỗi khi phát âm thanh gong:", error);
    console.log("Đang phát tiếng gong (giả lập)");
  }
};

export const playFestivalSound = () => {
  console.log("Playing festival sound (placeholder)");
  // Implementation for actual sound will be added later
};

export default {
  GAME_WIDTH,
  GAME_HEIGHT,
  CHARACTER_WIDTH,
  CHARACTER_HEIGHT,
  MESSAGE_INBOX,
  MINIGAME_PIECES,
  GAME_STAGES,
  SOUND_PATHS,
  getRandomFact,
  playGongSound,
  playFestivalSound
}; 
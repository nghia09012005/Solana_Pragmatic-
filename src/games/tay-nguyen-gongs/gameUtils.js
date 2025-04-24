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
  BACKGROUND: '/assets/tay-nguyen-gongs/nhac_nen.mp3'
};

// Game data
export const GONG_FACTS = [
  "Cồng chiêng Tây Nguyên được UNESCO công nhận là di sản văn hóa phi vật thể của nhân loại vào năm 2005.",
  "Một bộ cồng chiêng truyền thống có thể gồm từ 2 đến 20 chiếc, kích thước và âm sắc khác nhau.",
  "Người Tây Nguyên tin rằng mỗi chiếc chiêng đều có linh hồn riêng.",
  "Cồng chiêng được sử dụng trong hầu hết các nghi lễ quan trọng như mừng lúa mới, cầu mưa, cưới hỏi, chữa bệnh và tang ma.",
  "Nghệ thuật diễn tấu cồng chiêng đòi hỏi sự phối hợp nhịp nhàng của nhiều người.",
  "Âm sắc độc đáo của cồng chiêng Tây Nguyên được tạo ra bằng kỹ thuật đúc và gò đặc biệt.",
  "Nhiều dân tộc ở Tây Nguyên như Ê Đê, Ba Na, Gia Rai, Xơ Đăng... đều có văn hóa cồng chiêng đặc sắc.",
  "Chiêng thường được phân thành 'mái' (cái) và 'đực' (đực) với âm sắc khác nhau.",
  "Cồng có núm ở giữa, còn chiêng thì không có núm.",
  "Trẻ em được làm quen với âm thanh cồng chiêng từ khi còn nhỏ và học chơi từ các nghệ nhân lớn tuổi."
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
  const randomIndex = Math.floor(Math.random() * GONG_FACTS.length);
  return GONG_FACTS[randomIndex];
};

// Âm thanh game
export const playGongSound = () => {
  try {
    // Tạo âm thanh mới mỗi lần gọi
    const gongSound = new Audio('/assets/tay-nguyen-gongs/gong.mp3');
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
  GONG_FACTS,
  MINIGAME_PIECES,
  GAME_STAGES,
  SOUND_PATHS,
  getRandomFact,
  playGongSound,
  playFestivalSound
}; 
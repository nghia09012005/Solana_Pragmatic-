import React, { useState, useEffect, useRef } from 'react';
import '../styles/PersonalMuseum.css';
import museumbg from '../assets/PersonalMuseum/museum1.png';
import artifact1 from '../assets/PersonalMuseum/Comattran.png';
import artifact2 from '../assets/PersonalMuseum/successletter.png';
import artifact3 from '../assets/PersonalMuseum/tranh-dong-ho.png';
import artifact4 from '../assets/PersonalMuseum/cong_chieng.png';
import museumMusic from '../assets/PersonalMuseum/audio/acoustic.mp3';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const addPositions = [
  { top: '60%', left: '15%', scale: 0.5 },
  { top: '35%', left: '25%', scale: 0.5 },
  { top: '30%', left: '46%', scale: 0.5 },
  { top: '40%', left: '70%', scale: 0.5 },
  { top: '65%', left: '83%', scale: 0.5 },
];

const artifacts = [
  {
    id: 1,
    name: 'Cờ Mặt Trận Giải phóng Dân tộc miền Nam Việt Nam',
    image: artifact1,
    imageName: 'Comattran.svg',
    description: 'Cờ của Mặt trận Dân tộc Giải phóng miền Nam, Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam (Cờ giải phóng) được sử dụng từ năm 1960 đến năm 1975. Đây là lá cờ lấy khuôn mẫu của quốc kỳ Việt Nam dân chủ cộng hòa, và chia một nửa màu đỏ để thay bằng màu xanh. Lá cờ có hình ngôi sao vàng trên nền cờ đỏ và xanh dương. Nửa phần trên đại diện cho miền Bắc đã độc lập. Nửa màu xanh dương tượng trưng cho miền Nam còn trong vòng kềm kẹp của Mỹ và chế độ Sài Gòn, song miền Nam đấu tranh cho khát vọng hòa bình, thống nhất (màu xanh hòa bình).\n\tNgày 30/4/1975, cờ giải phóng phấp phới tung bay trên nóc Dinh Độc Lập, chính quyền Sài Gòn theo Mỹ hoàn toàn bị sụp đổ, đánh dấu sự toàn thắng của cuộc kháng chiến chống Mỹ cứu nước. Thắng lợi đó cho thấy rõ vai trò to lớn của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, Chính phủ cách mạng lâm thời Cộng hòa miền Nam Việt Nam đối với công cuộc kháng chiến chống Mỹ cứu nước. Nước ta sau đó, ở các trụ sở công quyền, trường học,... trong nghi lễ thường thấy hai lá cờ đứng cạnh nhau. Một lá cờ đỏ sao vàng của Việt Nam dân chủ cộng hòa, một lá cờ với ngôi sao vàng trên nền hai màu xanh đỏ - lá cờ của Cộng hòa miền Nam Việt Nam.Trong bài thơ "Nước non ngàn dặm" của nhà thơ Tố Hữu, có một khổ thơ viết:\n\tLá cờ nửa đỏ nửa xanh\n\tMàu đỏ của đất, màu xanh của trời\n\tNgôi sao, chân lý của đời\n\tViệt Nam, vàng của lòng người hôm nay.\n\tCàng nhìn ta, lại càng say\n\tBiển Đông lồng lộng gió lay ngọn cờ...',
    message: 'Đoàn kết là sức mạnh lớn nhất để vượt qua mọi thử thách!'
  },
  {
    id: 2,
    name: 'Lá thư từ chốn "Đất thép thành đồng"',
    image: artifact2,
    imageName: 'successletter.png',
    description: 'Trong một lá thư gửi về gia đình ngày 25/2/1967, nhạc sĩ Nguyễn Vĩnh Bảo viết về một trận càn lớn ở đất Củ Chi: "…Ba ngày ba đêm chịu tám, chín trận B52, ấy thế mà em vẫn bình thường, khỏe mạnh. Xe lội nước của chúng thọt ra, thọt vào thường xuyên nhưng có làm sao đâu, mà có lúc còn dám ra đứng ngó xe lội nước của thằng Mỹ xem nó hung hăng đến mức nào nữa. Nào là M113, M41, nào là xe phòng lửa, rồi Mỹ đen, Mỹ trắng… đủ loại". Và "ngồi ở đất Củ Chi này mới thấy được thế nào là khí thế cách mạng, là sức mạnh của quần chúng, ngày thắng lợi chắc cũng chẳng còn bao xa nữa".\n\tSuốt một thời gian dài, địch liên tục tấn công đánh phá vùng căn cứ và hệ thống địa đạo Củ Chi hết sức khốc liệt, bằng những thủ đoạn như: Bơm nước vào lòng địa đạo, dùng đội quân "chuột cống" đánh phá, dùng chó béc-giê săn lùng phát hiện địa đạo để phá, dùng xe cơ giới ủi phá, gieo cỏ Mỹ phá địa hình,… lực lượng Mỹ-ngụy đã thực hiện hơn 5.000 cuộc hành quân càn quét vào vùng căn cứ cách mạng Củ Chi.\n\tTrung bình, mỗi năm có khoảng 330 trận càn, với đủ sắc lính, các cấp hành quân, loại hình chiến thuật. Tính từ năm 1954-1975, khối lượng bom đạn Mỹ trút xuống Củ Chi khoảng 500.000 tấn. Tính trung bình, mỗi người dân ở đây phải hứng chịu khoảng 1,5 tấn bom. Ngoài ra, có khoảng 480 tấn chất độc hóa học các loại đã được quân địch rải xuống vùng đất này. Thế nhưng, dựa vào hệ thống địa đạo, quân và dân Củ Chi kiên cường bám trụ, đánh địch bằng cả 3 mũi giáp công (quân sự, chính trị, binh vận) với phương châm "nắm thắt lưng địch mà đánh", thực hiện lối đánh áp sát với những chiến thuật bắn tỉa, phục kích, tập kích, phát huy tối đa sức mạnh tổng hợp của chiến tranh nhân dân, vô hiệu hóa được nhiều loại vũ khí hiện đại nhất và làm thất bại âm mưu của địch. \n\tTrải qua hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, quân và dân huyện Củ Chi đã lập được những chiến công xuất sắc. Đó là: đánh 4.269 trận lớn, nhỏ; loại khỏi vòng chiến đấu 22.582 tên địch (bắt sống hơn 10.000 tên lính Mỹ, 710 lính ngụy); binh vận làm rã ngũ 32.000 tên; phá hủy và đánh chiếm hơn 5.168 xe quân sự (phần lớn là xe tăng và xe bọc thép); bắn rơi và làm hư hỏng 256 máy bay (chủ yếu là trực thăng); bắn chìm và cháy 22 tàu, xuồng chiến đấu; đánh sập và hỏng 173 cầu cống, thu 8.581 súng các loại; bức hàng, bức rút, đánh sập 270 lượt đồn bốt địch.\n\tVới những chiến công vang dội đó, toàn huyện Củ Chi đã được Đảng, Nhà nước tặng thưởng nhiều phần thưởng cao quý. Tuy nhiên, trong hai cuộc chiến trường kỳ đó, Củ Chi cũng chịu nhiều tổn thất: 10.101 dân thường bị chết; hơn 10.000 chiến sĩ, thanh niên đã hy sinh, 28.421 nhà bị cháy, 20.000ha ruộng, rẫy và rừng bị tàn phá.\n\tĐi qua hai cuộc chiến tranh, theo một thống kê chưa đầy đủ, Củ Chi có 2.135 Mẹ Việt Nam Anh hùng; 40 Anh hùng Lực lượng vũ trang nhân dân; 13.598 gia đình thương binh, liệt sĩ và 20.208 gia đình có công cách mạng.\n\tHuyện Củ Chi được Ủy ban Trung ương Mặt trận Dân tộc giải phóng miền nam Việt Nam phong tặng danh hiệu "Đất thép thành đồng" vào ngày 17/9/1967 và được Chính phủ hai lần trao tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.',
    message: 'Mỗi thành quả đều xứng đáng được ghi nhận và trân trọng.'
  },
  {
    id: 3,
    name: 'Tranh Đông Hồ',
    image: artifact3,
    imageName: 'tranh-dong-ho.png',
    description: 'Tranh Đông Hồ, hay tên đầy đủ là tranh khắc gỗ dân gian Đông Hồ, đây là một dòng tranh dân gian Việt Nam với xuất xứ từ làng Đông Hồ thuộc xã Song Hồ, huyện Thuận Thành, tỉnh Bắc Ninh. Theo tìm hiểu, trước kia tranh được bán ra chủ yếu phục vụ cho dịp Tết Nguyên Đán, người dân nông thôn mua tranh về dán trên tường, hết năm lại lột bỏ, dùng tranh mới.\n\tVới những nét tinh túy riêng và mang đậm những giá trị văn hóa to lớn, tranh tết Đông Hồ bằng những hình ảnh biểu tượng dân dã, gần gũi nhưng lại chứa đựng những thông điệp ẩn ngữ đầy tính nhân văn. Sự phong phú và đa dạng cả về mẫu mã, thể loại, chủ đề, tranh dân gian Đông Hồ phản ánh hầu như tất cả những gì diễn ra trong đời sống bình dị của người lao động như: Chăn trâu thổi sáo, Hứng dừa, Đấu vật, Đánh ghen… cho tới những ước mơ, khát vọng cuộc sống tốt đẹp hơn như Lễ trí, Nhân nghĩa, Vinh hoa, Phú quý, Lợn đàn, Gà đàn… Nét hấp dẫn của tranh dân gian Đông Hồ không chỉ đề cập đến cuộc sống: thóc đầy bồ, gà đầy sân, mong ước vinh hoa phú quý… mà còn đề cập đến cuộc sống lứa đôi, vợ chồng với cái nhìn hóm hỉnh mà sâu sắc.\nVề chất liệu và màu sắc:\n\tNét độc đáo đầu tiên thu hút cảm quan người xem của tranh chính là ở màu sắc và chất liệu giấy in. Giấy dùng in tranh là giấy dó được làm từ vỏ cây dó, với đặc tính xốp, mềm, mỏng, dai, dễ hút màu mà khi in không bị nhòe. Trên giấy được quét lên một lớp hồ điệp có nét sáng óng ánh rất đặc thù bằng cách: người ta nghiền nát vỏ con điệp (một loại sò vỏ mỏng ở biển) trộn với hồ (loại bột gạo tẻ, hoặc gạo nếp, có khi là bột sắn), dùng chổi lá thông quét lên mặt giấy dó. Với chổi lá thông sẽ tạo thành những đường ganh chạy theo đường quét và vỏ điệp tự nhiên cho màu trắng có ánh lấp lánh của những mảnh điệp nhỏ dưới ánh sáng, trong quá trình làm giấy điệp có thể pha thêm màu khác vào hồ. Màu sắc được sử dụng trong tranh là màu tự nhiên từ cây cỏ như màu đen từ than cây xoan hay than lá tre, màu xanh từ gỉ đồng, lá chàm, màu vàng từ hoa hòe, màu đỏ từ sỏi son, gỗ vang,… Đây là những màu cơ bản, không pha trộn.\n\tVề thể loại, theo nội dung chủ đề, tranh Đông Hồ có thể chia thành 7 loại chính: tranh thờ, tranh chúc tụng, tranh lịch sử, tranh truyện, tranh phương ngôn, tranh cảnh vật và tranh phản ánh sinh hoạt.\n\tVề qui trình sản xuất tranh có nhiều công đoạn, trong đó có 2 khâu chính gồm: sáng tác mẫu (khắc ván) và in (vẽ tranh). Ở đây có thể thấy mỗi nghệ nhân đòi hỏi có ít nhiều năng khiếu bẩm sinh cũng như kỹ năng lao động cao.\n\tVán khắc in tranh có 2 loại: ván in nét và ván in màu. Ván in nét được làm từ gỗ thị hoặc gỗ thừng mực. Dụng cụ khắc ván là những mũi đục hay còn gọi là bộ ve làm bằng thép cứng (khoảng 30 - 40 chiếc/bộ).\n\tCác nghệ nhân làng Hồ sáng tác mẫu vẽ tranh bằng tay còn các công đoạn khác thì dùng ván in.\n\tVề giá trị nghệ thuật thì dòng tranh dân gian Đông Hồ mang tính biểu trưng, trang trí nhưng vẫn giữ được nét mộc mạc, dễ hiểu, rất gần với đời sống người dân vùng đồng bằng Bắc Bộ.\n\tVề nội dung, tranh dân gian Đông Hồ phản ánh sâu sắc đời sống tinh thần, vật chất của con người, xã hội theo quan điểm mỹ học dân gian của người dân vùng này. Những bức tranh nói lên ước mơ ngàn đời của người lao động về một cuộc sống gia đình thuận hòa, ấm no, hạnh phúc và một xã hội công bằng, tốt đẹp.',
    message: 'Giữ gìn và phát huy giá trị văn hóa dân tộc là trách nhiệm của mỗi người.'
  },
  {
    id: 4,
    name: 'Cồng Chiêng Tây Nguyên',
    image: artifact4,
    imageName: 'cong_chieng.png',
    description: '\tĐến với Tây Nguyên, ai cũng muốn được thưởng thức những âm thanh trầm bổng, vang vọng của cồng chiêng giữa núi rừng đại ngàn.\n\tCồng chiêng Tây Nguyên không chỉ có sức hấp dẫn đặc biệt bởi sự đa dạng, độc đáo của kĩ thuật diễn tấu, mà còn là tiếng nói tâm linh, là biểu tượng cho cuộc sống của con người nơi đây.\nKhông gian văn hóa Cồng chiêng trải rộng suốt 5 tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng và chủ nhân của loại hình văn hóa đặc sắc này là cư dân các dân tộc Tây Nguyên, như Êđê, Bana, Xơ đăng, Jrai, M\'nông, Cơ ho,.\tCồng chiêng xuất hiện trên mảnh đất Tây Nguyên chan hòa nắng gió từ bao giờ không ai rõ. Nó như mạch nước ngầm thấm đẫm hơi thở cuộc sống. Theo quan niệm của người Tây Nguyên, cồng chiêng là ngôn ngữ giao tiếp hàng đầu của con người với thế giới siêu nhiên. Nó được coi là biểu hiện cho tài sản, quyền lực, sự an toàn trong mỗi gia đình và cộng đồng.\n\tTrải qua năm tháng, cồng chiêng đã trở thành nét văn hóa đặc trưng, đầy sức quyến rũ và hấp dẫn của vùng đất Tây Nguyên. Những âm thanh khi ngân nga sâu lắng, khi thôi thúc trầm hùng, hòa quyện với tiếng suối, tiếng gió và tiếng lòng, đã sống mãi cùng đất trời và con người Tây Nguyên.\n\tÂm thanh của cồng chiêng như xoa dịu nỗi buồn, sự đớn đau, nỗi cô đơn, trống vắng hay tủi hờn trong bất hạnh. Người giàu sang, kẻ nghèo hèn, giả trẻ, gái trai như bị thôi miên, khao khát tìm về cội nguồn, gắn kết trong vũ điệu cồng chiêng say lòng người.\n\tÂm nhạc ở đây không đơn thuần là nghệ thuật mà có chức năng phục vụ một sự kiện đặc biệt trong xã hội hoặc trong đời sống hằng ngày. Lúc đứa trẻ mới chào đời, tiếng cồng chiêng vang lên chào đón thành viên mới. Khi đứa trẻ lớn lên, mỗi giai đoạn của đời sống, từ việc ruộng đồng cho đến những buổi gặp gỡ nam nữ, khỉ đón khách, lên nhà mới hay tang lễ,... đều không thể thiếu tiếng cồng chiêng. Tiếng cồng chiêng âm vang gợi cho người nghe như thấy được cả không gian săn bắn, không gian làm rẫy, không gian lễ hội,... của con người Tây Nguyên.',
    message: 'Âm vang cồng chiêng là tiếng gọi của đại ngàn, kết nối cộng đồng.'
  },
];

const imageMap = {
  'Comattran.svg': artifact1,
  'successletter.png': artifact2,
  'tranh-dong-ho.png': artifact3,
  'cong_chieng.png': artifact4,
};

const PersonalMuseum = () => {
  const [selectedPos, setSelectedPos] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [placedArtifacts, setPlacedArtifacts] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedArtifactIndex, setSelectedArtifactIndex] = useState(null); // chỉ số cổ vật đang xem
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [originalArtifacts, setOriginalArtifacts] = useState(null); // Lưu trạng thái ban đầu khi tải trang
  const audioRef = useRef(null);

  const navigate = useNavigate();
  if(!localStorage.getItem('username') || !localStorage.getItem('username') ){navigate("/");}

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(museumMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Start playing when component mounts
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.log("Error playing audio:", err));

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Load saved artifacts
  useEffect(() => {
    const saved = localStorage.getItem('museumArtifacts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = Object.entries(parsed).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            image: imageMap[value.imageName] || null,
          };
          return acc;
        }, {});
        setPlacedArtifacts(restored);
        setOriginalArtifacts(restored); // Lưu trạng thái ban đầu khi tải trang
      } catch (error) {
        console.error('Lỗi khi load hiện vật:', error);
      }
    } else {
      setOriginalArtifacts({});
    }
  }, []);

  // Hàm xử lý lưu thay đổi
  const handleSaveChanges = () => {
    try {
      const toSave = Object.entries(placedArtifacts).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          imageName: value.imageName,
        };
        return acc;
      }, {});
      localStorage.setItem('museumArtifacts', JSON.stringify(toSave));
      setOriginalArtifacts({...placedArtifacts}); // Cập nhật trạng thái ban đầu
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Lỗi khi lưu hiện vật:', error);
    }
  };
  
  // Hàm xử lý đặt lại hiện vật
  const handleResetArtifacts = () => {
    setShowConfirmReset(true);
  };
  
  // Xác nhận đặt lại hiện vật
  const confirmReset = () => {
    if (originalArtifacts) {
      // Đảm bảo rằng các đối tượng hình ảnh được khôi phục đúng cách
      const restoredArtifacts = Object.entries(originalArtifacts).reduce((acc, [key, value]) => {
        acc[key] = {
          ...value,
          // Đảm bảo rằng đối tượng hình ảnh được khôi phục từ imageMap
          image: imageMap[value.imageName] || null,
        };
        return acc;
      }, {});
      setPlacedArtifacts(restoredArtifacts);
    } else {
      // Nếu không có trạng thái ban đầu, đặt lại về rỗng
      setPlacedArtifacts({});
    }
    setShowConfirmReset(false);
  };

  // Get available artifacts (those not yet placed)
  const getAvailableArtifacts = () => {
    const placedImageNames = Object.values(placedArtifacts).map(artifact => artifact.imageName);
    return artifacts.filter(artifact => !placedImageNames.includes(artifact.imageName));
  };

  const handleAddClick = (index) => {
    setSelectedPos(index);
    setShowMenu(true);
  };

  const handleArtifactSelect = (artifact) => {
    if (selectedPos !== null) {
      setPlacedArtifacts((prev) => ({
        ...prev,
        [selectedPos]: {
          name: artifact.name,
          image: artifact.image,
          imageName: artifact.imageName,
        },
      }));
    }
    setShowMenu(false);
  };

  const handleRemoveArtifact = (index, e) => {
    e.stopPropagation();
    setPlacedArtifacts((prev) => {
      const newArtifacts = { ...prev };
      delete newArtifacts[index];
      return newArtifacts;
    });
  };

  return (
    <div
      className="museum-container"
      style={{ backgroundImage: `url(${museumbg})` }}
    >
      <Link to="/" className="home-button">
        <FaArrowLeft size={24} />
      </Link>
      
      <div className="museum-controls">
        <button className="control-button save-button" onClick={handleSaveChanges}>
          <FaSave />
          <span>Lưu thay đổi</span>
        </button>
        
        <button className="control-button reset-button" onClick={handleResetArtifacts}>
          <FaUndo />
          <span>Đặt lại hiện vật</span>
        </button>
      </div>
      
      {showSaveSuccess && (
        <div className="notification success-notification">
          <p>✅ Đã lưu thay đổi thành công!</p>
        </div>
      )}

      {addPositions.map((pos, index) => (
        <div
          key={index}
          style={{ position: 'absolute', top: pos.top, left: pos.left }}
        >
          {placedArtifacts[index] ? (
            <div className="placed-artifact" onClick={() => setSelectedArtifactIndex(index)}>
              <button
                className="remove-artifact"
                onClick={(e) => handleRemoveArtifact(index, e)}
              >
                ×
              </button>
              <img
                src={placedArtifacts[index].image}
                alt={placedArtifacts[index].name}
                className="artifact-image"
              />
            </div>
          ) : (
            <button onClick={() => handleAddClick(index)} className="add-button">
              +
            </button>
          )}
        </div>
      ))}

      {showMenu && (
        <div className="artifact-menu">
          <div className="menu-header">
            <h3>Chọn hiện vật</h3>
            <button onClick={() => setShowMenu(false)}>×</button>
          </div>
          <div className="menu-content">
            {getAvailableArtifacts().map((artifact) => (
              <div
                key={artifact.id}
                className="artifact-item"
                onClick={() => handleArtifactSelect(artifact)}
              >
                <img src={artifact.image} alt={artifact.name} />
                <p>{artifact.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Popup hiển thị nội dung cổ vật */}
      {selectedArtifactIndex !== null && placedArtifacts[selectedArtifactIndex] && (() => {
        const placed = placedArtifacts[selectedArtifactIndex];
        const artifactDetail = artifacts.find(a => a.imageName === placed.imageName || a.name === placed.name);
        if (!artifactDetail) return null;
        return (
          <div className="artifact-popup" onClick={() => setSelectedArtifactIndex(null)}>
            <div className="artifact-popup-content" onClick={e => e.stopPropagation()}>
              <div className="menu-header">
                <h3>Thông tin hiện vật</h3>
                <button onClick={() => setSelectedArtifactIndex(null)}>×</button>
              </div>
              <div className="popup-content">
                <div className="artifact-detail-item">
                  <img
                    src={artifactDetail.image}
                    alt={artifactDetail.name}
                    className="popup-image"
                  />
                  <h4 className="popup-title">{artifactDetail.name}</h4>
                  <div className="popup-desc">
                {artifactDetail.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
                  <div className="popup-message">{artifactDetail.message}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Xác nhận đặt lại hiện vật */}
      {showConfirmReset && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <h3>Xác nhận đặt lại</h3>
            <p>Bạn có chắc chắn muốn đặt lại vị trí của tất cả hiện vật về trạng thái đã lưu trước đó không?</p>
            <div className="confirmation-buttons">
              <button onClick={() => setShowConfirmReset(false)}>Hủy</button>
              <button onClick={confirmReset}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalMuseum;

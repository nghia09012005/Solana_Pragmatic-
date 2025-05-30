import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import VoucherCard from "../components/VoucherCard";
import VoucherDetail from "../components/VoucherDetail";
import "../styles/voucher.css";
import { useNavigate } from "react-router-dom";
import sendTokenFromUserToAdmin from "../hooks/sendTokenFromUserToAdmin";
import emailjs from '@emailjs/browser';

const mockVouchers = [
  {
    id: 1,
    name: "10% OFF at Traveloka",
    description: "Get 10% off hotel bookings on Traveloka with this voucher.",
    price: 90,
    expires: "2025-12-31",
  },
  {
    id: 2,
    name: "5% OFF at Dien Hai Citadel",
    description: "Get 5% off admission to Dien Hai Citadel.",
    price: 10,
    expires: "2025-08-15",
  },
  {
    id: 3,
    name: "15% OFF at Ba Na Hills",
    description: "Get 15% off entrance ticket to Ba Na Hills.",
    price: 90,
    expires: "2025-09-01",
  },
  {
    id: 4,
    name: "10% OFF at booking.com",
    description: "Enjoy a 10% discount when booking a hotel with bill above 1 million VND Booking.com using this promo code.",
    price: 90,
    expires: "2025-09-01",
  },
  {
    id: 5,
    name: "Free to LangBiang",
    description: "Enjoy free entrance to LangBiang Land in Da Lat.",
    price: 100,
    expires: "2025-09-01",
  },
];

const VoucherMarketplace = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [boughtVouchers, setBoughtVouchers] = useState([]); // Lưu id các voucher đã mua
  const navigate = useNavigate();
  const [qrReady, setQrReady] = useState(false);

    // handle chưa đăng nhập hoặc chưa đăng ký ví

    // ...............

    // 
    


  const goHome = () => {
    navigate("/");
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("voucher-overlay")) {
      setSelectedVoucher(null);
      setShowQR(false);
    }
  };

  const qrData = selectedVoucher
    ? JSON.stringify({
        id: selectedVoucher.id,
        name: selectedVoucher.name,
        price: selectedVoucher.price,
        expires: selectedVoucher.expires,
      })
    : "";

  const downloadQR = () => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${selectedVoucher.name}_voucher_qr.webp`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  };

  // Hàm xử lý khi mua voucher
  const handleBuy = async () => {
    if (selectedVoucher) {
      try {
        await sendTokenFromUserToAdmin(1);
  
        
        
      } catch {
        alert("Please check your connection and your token amount!");
        return;
      }

// 1. Hiện QR trước

setBoughtVouchers([...boughtVouchers, selectedVoucher.id]);
// 2. Chờ 100ms để QR render xong
setTimeout(() => {
  alert("Your Qr has been downloaded!!");
  downloadQR();
}, 300);
setShowQR(true);


// 3. Send email 
await emailjs.send(
'service_49yef2t',
'template_5cqkafj',
{
  email:localStorage.getItem("email"),
  name:selectedVoucher.name,
  description: selectedVoucher.description ,
  price: selectedVoucher.price ,
  date: selectedVoucher.expires


},
'bxs-YPBAAiKd1ytyP'
);


    }
  };
  

 

  return (
    <div className="voucher-marketplace">
      <button className="back-to-home" onClick={goHome}>
        Home
      </button>

      <h2>
        <img src="/images/icons/logo.webp" alt="Logo" className="logo-icon" />
        Voucher Marketplace
      </h2>

      <div className="voucher-grid">
        {mockVouchers.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            voucher={voucher}
            onSelect={setSelectedVoucher}
            disabled={boughtVouchers.includes(voucher.id)} // truyền prop disabled
          />
        ))}
      </div>

      {selectedVoucher && (
        <div className="voucher-overlay" onClick={handleOverlayClick}>
          <div className="voucher-overlay-content" onClick={(e) => e.stopPropagation()}>

            {!showQR ? (
              <>
                <VoucherDetail voucher={selectedVoucher} />

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    className="buy-button"
                    onClick={handleBuy}
                    disabled={boughtVouchers.includes(selectedVoucher.id)} // disable nút nếu đã mua
                  >
                    {boughtVouchers.includes(selectedVoucher.id) ? "Already Bought" : "Buy"}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h3>QR Code Voucher</h3>
                <QRCodeCanvas
                  id="qrCode"
                  value={qrData}
                  size={250}
                  bgColor="#ffffff"
                  fgColor="#00796b"
                  level="H"
              
                />
                <br />
                {/* <button className="buy-button" onClick={downloadQR}>
                  Download QR
                </button> */}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherMarketplace;

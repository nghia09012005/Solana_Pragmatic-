import React, { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import sendTokenSPL from "../hooks/sendTokenSPL";



const SendTokenTest = () => {
  const wallet = useWallet();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (!wallet.publicKey) {
      alert("Bạn cần kết nối ví Phantom");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const signature = await sendTokenSPL({
        clientPublicKeyString: wallet.publicKey.toBase58(),
        amount: 1 * 1_000_000, // gửi 1 token, giả sử token có 6 decimals
        network: "devnet",
      });
      setResult(`✅ Gửi thành công! Tx signature: ${signature}`);
    } catch (error) {
      setResult("❌ Gửi thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div style={{ padding: 20 }}>
      <h3>🎮 Gửi SPL Token từ admin → Phantom</h3>
      <button onClick={handleSend} disabled={loading || !wallet.publicKey}>
        {loading ? "Đang gửi..." : "Gửi 1 token cho ví của tôi"}
      </button>
      <p style={{ marginTop: 10 }}>{result}</p>
    </div>
  );
};

export default SendTokenTest;

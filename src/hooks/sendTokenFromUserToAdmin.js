import {
    Connection,
    PublicKey,
    Transaction,
    clusterApiUrl,
  } from "@solana/web3.js";
  import {
    getOrCreateAssociatedTokenAccount,
    createTransferInstruction,
  } from "@solana/spl-token";
  
  const MINT_ADDRESS = new PublicKey("8u6RLoUAxMFhXZTMeQ4uFMPPu9HHGyDVVgrgAyXw4HCy"); // SPL Token
  const ADMIN_PUBLIC_KEY = new PublicKey("EwUaDKLFC4cukzHNWyhwAKttbogLs7KGm8SEQPpAkcjj"); // 👈 Thay bằng public key admin thật
  
  /**
   * Gửi token SPL từ ví Phantom (người dùng) sang ví admin
   * @param {number} amount - Số lượng token (chưa nhân với decimals)
   * @param {string} network - Mạng Solana ('devnet' hoặc 'mainnet-beta'), mặc định là 'devnet'
   * @returns {Promise<string>} - Transaction signature
   */
  async function sendTokenFromUserToAdmin(amount, network = "devnet") {
    try {
      if (typeof amount !== "number" || amount <= 0) {
        throw new Error("Amount phải là số nguyên dương");
      }
  
      const DECIMALS = 6; // Số decimals của token, đổi nếu token khác
  
      const provider = window.solana;
      if (!provider?.isPhantom) throw new Error("Phantom wallet không được tìm thấy");
  
      // 1. Kết nối ví Phantom (nếu đã kết nối thì có thể tái sử dụng)
      const { publicKey: userPublicKey } = await provider.connect();
  
      const connection = new Connection(clusterApiUrl(network), "confirmed");
  
      // 2. Lấy hoặc tạo ATA cho người dùng và admin
      const userTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        userPublicKey,     // payer chịu phí
        MINT_ADDRESS,
        userPublicKey
      );
  
      const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        userPublicKey,     // payer vẫn là user
        MINT_ADDRESS,
        ADMIN_PUBLIC_KEY
      );
  
      // 3. Chuẩn bị amount dưới dạng bigint
      const amountToSend = BigInt(Math.floor(amount * 10 ** DECIMALS));
  
      // 4. Tạo giao dịch chuyển token
      const tx = new Transaction().add(
        createTransferInstruction(
          userTokenAccount.address,
          adminTokenAccount.address,
          userPublicKey,
          amountToSend
        )
      );
  
      tx.feePayer = userPublicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
      // 5. Ký giao dịch
      const signed = await provider.signTransaction(tx);
  
      // 6. Gửi giao dịch lên mạng
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);
  
      console.log("Giao dịch thành công:", txid);
      return txid;
  
    } catch (err) {
      console.error("Lỗi khi chuyển token:", err);
      throw err;
    }
  }
  
  export default sendTokenFromUserToAdmin;
  
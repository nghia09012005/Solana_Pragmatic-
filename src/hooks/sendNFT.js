import {
    Connection,
    PublicKey,
    Keypair,
    clusterApiUrl,
  } from "@solana/web3.js";
  import {
    getOrCreateAssociatedTokenAccount,
    transfer,
  } from "@solana/spl-token";
  
  async function fetchPrivateKey() {
    try {
      const response = await fetch("http://localhost:8080/api/walletkey", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Lỗi khi lấy private key");
      const privateKeyArray = await response.json();
      return privateKeyArray;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }
  
  /**
   * Gửi NFT (SPL Token dạng NFT) từ ví admin sang ví client
   * @param {string} nftMintAddress - địa chỉ NFT (SPL token mint)
   * @param {string} clientPublicKeyString - địa chỉ ví người nhận (base58 string)
   * @param {string} network - 'devnet' | 'mainnet-beta' (default: devnet)
   */
  async function sendNFT({
    nftMintAddress,
    clientPublicKeyString,
    network = "devnet",
  }) {
    const privateKeyArray = await fetchPrivateKey();
    if (!privateKeyArray) throw new Error("Không lấy được private key admin");
  
    const secretKeyUint8 = Uint8Array.from(privateKeyArray);
    const admin = Keypair.fromSecretKey(secretKeyUint8);
    const connection = new Connection(clusterApiUrl(network), "confirmed");
  
    const mint = new PublicKey(nftMintAddress);
    const clientPublicKey = new PublicKey(clientPublicKeyString);
  
    // Tài khoản chứa NFT hiện tại
    const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      admin,
      mint,
      admin.publicKey
    );
  
    // Tài khoản ATA người nhận
    const clientTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      admin, // fee payer
      mint,
      clientPublicKey
    );
  
    // Gửi NFT (amount = 1 vì là NFT)
    const signature = await transfer(
      connection,
      admin, // payer
      adminTokenAccount.address,
      clientTokenAccount.address,
      admin, // owner
      1 // always 1 for NFT
    );
  
    console.log("NFT sent with tx:", signature);
    return signature;
  }
  
  export default sendNFT;
  
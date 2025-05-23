import { Connection, PublicKey, Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  transfer,
} from "@solana/spl-token";
import bs58 from "bs58";

async function fetchPrivateKey() {
  try {
    const response = await fetch('http://localhost:8080/api/walletkey', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Lỗi khi lấy private key');
    const privateKeyArray = await response.json();

    return privateKeyArray;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

const MINT_ADDRESS = "8u6RLoUAxMFhXZTMeQ4uFMPPu9HHGyDVVgrgAyXw4HCy"; // SPL token address

/**
 * Gửi token SPL từ ví admin sang ví client
 * @param {string} clientPublicKeyString - public key ví client dạng base58 string
 * @param {number} amount - số token muốn gửi (đã nhân với decimals)
 * @param {string} network - 'devnet' hoặc 'mainnet-beta' (mặc định 'devnet')
 */
async function sendTokenSPL({ clientPublicKeyString, amount, network = "devnet" }) {
  const privateKeyArray = await fetchPrivateKey();
  if (!privateKeyArray) throw new Error("Không lấy được private key admin");

  const secretKeyUint8 = Uint8Array.from(privateKeyArray);

  const admin = Keypair.fromSecretKey(secretKeyUint8);

  const connection = new Connection(clusterApiUrl(network), "confirmed");
  const clientPublicKey = new PublicKey(clientPublicKeyString);
  const mint = new PublicKey(MINT_ADDRESS);

  // Lấy hoặc tạo ATA admin
  const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    admin,
    mint,
    admin.publicKey
  );

  // Lấy hoặc tạo ATA client
  const clientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    admin,
    mint,
    clientPublicKey
  );

  // Gửi token
  const signature = await transfer(
    connection,
    admin,
    adminTokenAccount.address,
    clientTokenAccount.address,
    admin,
    amount
  );

  return signature;
}

export default sendTokenSPL;

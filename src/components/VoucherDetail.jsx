const VoucherDetail = ({ voucher }) => {
    if (!voucher) return null;
  
    return (
      <div className="voucher-detail">
        <h3>🎫 {voucher.name}</h3>
        <p><strong>Description:</strong> {voucher.description}</p>
        <p><strong>Price:</strong> {voucher.price} Gold</p>
        <p><strong>Expiration date:</strong> {voucher.expires}</p>
      </div>
    );
  };
  
  export default VoucherDetail;
  
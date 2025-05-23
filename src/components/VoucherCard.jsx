import React from "react";

const VoucherCard = ({ voucher, onSelect, disabled }) => {
  return (
    <div
      className={`voucher-card ${disabled ? "voucher-disabled" : ""}`}
      onClick={() => !disabled && onSelect(voucher)}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
      }}
    >
      <h3>{voucher.name}</h3>
      <p>{voucher.description}</p>
      <p>Price: {voucher.price}</p>
      <p>Expires: {voucher.expires}</p>
      {disabled && <div className="bought-label">Already Bought</div>}
    </div>
  );
};

export default VoucherCard;

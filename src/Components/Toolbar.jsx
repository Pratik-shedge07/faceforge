import React from "react";

function Toolbar({ emojiSize, setEmojiSize, rotation, setRotation, onClear }) {
  const toolbarStyle = {
    background: "#1f1f1f",
    padding: "12px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  };

  const labelStyle = { fontSize: "14px", fontWeight: "bold" };

  const buttonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#ff4444",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div style={toolbarStyle}>
      <div>
        <label style={labelStyle}>Size: {emojiSize}px</label>
        <input
          type="range"
          min="20"
          max="200"
          value={emojiSize}
          onChange={(e) => setEmojiSize(e.target.value)}
        />
      </div>

      <div>
        <label style={labelStyle}>Rotate: {rotation}°</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(e.target.value)}
        />
      </div>

      <button style={buttonStyle} onClick={onClear}>
        🗑 Clear Canvas
      </button>
    </div>
  );
}

export default Toolbar;

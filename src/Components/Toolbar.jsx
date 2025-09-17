import React from "react";

function Toolbar({ emojiSize, setEmojiSize }) {
  const toolbarStyle = {
    background: "#1f1f1f",
    padding: "10px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div style={toolbarStyle}>
      <label style={labelStyle}>Size: {emojiSize}px</label>
      <input
        type="range"
        min="20"
        max="150"
        value={emojiSize}
        onChange={(e) => setEmojiSize(e.target.value)}
      />
    </div>
  );
}

export default Toolbar;

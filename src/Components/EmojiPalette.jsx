import React from "react";

function EmojiPalette({ setSelectedEmoji }) {
  const emojis = ["😀", "😂", "😍", "😎", "🤖", "🔥", "✨", "👽", "🥳"];

  const paletteStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    background: "#1f1f1f",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  };

  const emojiStyle = {
    fontSize: "30px",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <div style={paletteStyle}>
      {emojis.map((emoji, index) => (
        <span
          key={index}
          style={emojiStyle}
          onClick={() => setSelectedEmoji(emoji)}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.3)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiPalette;

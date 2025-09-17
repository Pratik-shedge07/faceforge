import React from "react";

function EmojiPalette({ setSelectedEmoji }) {
  const emojis = [
    "😀", "😂", "😍", "🤔", "😎", "😭", "🥳", "😡",
    "👻", "👽", "🤖", "🐶", "🐱", "🦊", "🐼", "🐸",
    "🍕", "🍔", "🍩", "🍎", "⚽", "🏀", "🎮", "🎸"
  ];

  const paletteStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    margin: "20px 0",
    background: "#1e1e1e",
    padding: "15px",
    borderRadius: "12px",
    maxWidth: "500px",
    justifyContent: "center",
  };

  const emojiStyle = {
    fontSize: "28px",
    cursor: "pointer",
  };

  return (
    <div style={paletteStyle}>
      {emojis.map((emoji, index) => (
        <span
          key={index}
          style={emojiStyle}
          onClick={() => setSelectedEmoji(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiPalette;

import React, { useState } from "react";

function Canvas({ selectedEmoji, emojiSize }) {
  const [placedEmojis, setPlacedEmojis] = useState([]);

  const canvasStyle = {
    width: "500px",
    height: "400px",
    background: "#222",
    borderRadius: "12px",
    border: "2px dashed #555",
    position: "relative",
    overflow: "hidden",
    cursor: "crosshair",
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - emojiSize / 2;
    const y = e.clientY - rect.top - emojiSize / 2;

    setPlacedEmojis([...placedEmojis, { emoji: selectedEmoji, x, y }]);
  };

  return (
    <div style={canvasStyle} onClick={handleClick}>
      {placedEmojis.map((item, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            fontSize: `${emojiSize}px`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

export default Canvas;

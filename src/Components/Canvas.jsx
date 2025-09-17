import React, { useState } from "react";

function Canvas({ selectedEmoji, emojiSize, rotation }) {
  const [emojisOnCanvas, setEmojisOnCanvas] = useState([]);

  const canvasStyle = {
    width: "80%",
    height: "400px",
    background: "#1e1e1e",
    border: "2px dashed #444",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
  };

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - emojiSize / 2;
    const y = e.clientY - rect.top - emojiSize / 2;

    setEmojisOnCanvas([
      ...emojisOnCanvas,
      { x, y, emoji: selectedEmoji, size: emojiSize, rotation }
    ]);
  };

  return (
    <div style={canvasStyle} onClick={handleCanvasClick}>
      {emojisOnCanvas.map((item, index) => (
        <span
          key={index}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            fontSize: `${item.size}px`,
            transform: `rotate(${item.rotation}deg)`,
            cursor: "move",
            userSelect: "none",
          }}
          draggable
          onDragEnd={(e) => {
            const rect = e.target.parentElement.getBoundingClientRect();
            const newX = e.clientX - rect.left - item.size / 2;
            const newY = e.clientY - rect.top - item.size / 2;

            const updatedEmojis = [...emojisOnCanvas];
            updatedEmojis[index] = { ...item, x: newX, y: newY };
            setEmojisOnCanvas(updatedEmojis);
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

export default Canvas;

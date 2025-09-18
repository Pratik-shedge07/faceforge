import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

function Canvas({ selectedEmoji, emojiSize, rotation }) {
  const [emojisOnCanvas, setEmojisOnCanvas] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const canvasRef = useRef();

  const gridSize = 40;

  const canvasStyle = {
    width: "80%",
    height: `${canvasHeight}px`,
    background: "#1e1e1e",
    border: "2px dashed #444",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "12px",
  };

  // Helper for undo/redo
  const pushUndo = (state) => {
    setUndoStack((prev) => [...prev, state]);
    setRedoStack([]);
  };

  // Snap to grid helper
  const snap = (val) => (snapToGrid ? Math.round(val / gridSize) * gridSize : val);

  // Place emoji
  const handleCanvasClick = (e) => {
    if (selectedIndex !== null) return; // Don't place if editing
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left - emojiSize / 2;
    let y = e.clientY - rect.top - emojiSize / 2;
    x = snap(x);
    y = snap(y);

    pushUndo(emojisOnCanvas);
    setEmojisOnCanvas([
      ...emojisOnCanvas,
      {
        x,
        y,
        emoji: selectedEmoji,
        size: emojiSize,
        rotation,
        z: emojisOnCanvas.length,
        animate: true,
      },
    ]);
  };

  // Drag emoji
  const handleDragEnd = (e, index) => {
    const rect = e.target.parentElement.getBoundingClientRect();
    let newX = e.clientX - rect.left - emojisOnCanvas[index].size / 2;
    let newY = e.clientY - rect.top - emojisOnCanvas[index].size / 2;
    newX = snap(newX);
    newY = snap(newY);

    pushUndo(emojisOnCanvas);
    const updated = [...emojisOnCanvas];
    updated[index] = { ...updated[index], x: newX, y: newY };
    setEmojisOnCanvas(updated);
  };

  // Select emoji for editing
  const handleEmojiClick = (index) => {
    setSelectedIndex(index);
  };

  // Delete emoji (double-click)
  const handleEmojiDoubleClick = (index) => {
    pushUndo(emojisOnCanvas);
    setEmojisOnCanvas(emojisOnCanvas.filter((_, i) => i !== index));
    setSelectedIndex(null);
  };

  // Edit selected emoji
  const handleEditChange = (field, value) => {
    if (selectedIndex === null) return;
    pushUndo(emojisOnCanvas);
    const updated = [...emojisOnCanvas];
    updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
    setEmojisOnCanvas(updated);
  };

  // Layering
  const bringForward = () => {
    if (selectedIndex === null) return;
    pushUndo(emojisOnCanvas);
    const updated = [...emojisOnCanvas];
    if (selectedIndex < updated.length - 1) {
      [updated[selectedIndex], updated[selectedIndex + 1]] = [
        updated[selectedIndex + 1],
        updated[selectedIndex],
      ];
      setSelectedIndex(selectedIndex + 1);
    }
    setEmojisOnCanvas(updated);
  };

  const sendBackward = () => {
    if (selectedIndex === null) return;
    pushUndo(emojisOnCanvas);
    const updated = [...emojisOnCanvas];
    if (selectedIndex > 0) {
      [updated[selectedIndex], updated[selectedIndex - 1]] = [
        updated[selectedIndex - 1],
        updated[selectedIndex],
      ];
      setSelectedIndex(selectedIndex - 1);
    }
    setEmojisOnCanvas(updated);
  };

  // Undo/Redo
  const undo = () => {
    if (undoStack.length === 0) return;
    setRedoStack((prev) => [...prev, emojisOnCanvas]);
    setEmojisOnCanvas(undoStack[undoStack.length - 1]);
    setUndoStack(undoStack.slice(0, -1));
    setSelectedIndex(null);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setUndoStack((prev) => [...prev, emojisOnCanvas]);
    setEmojisOnCanvas(redoStack[redoStack.length - 1]);
    setRedoStack(redoStack.slice(0, -1));
    setSelectedIndex(null);
  };

  // Export canvas
  const exportCanvas = async () => {
    if (!canvasRef.current) return;
    const canvasElem = canvasRef.current;
    const canvasImg = await html2canvas(canvasElem);
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvasImg.toDataURL();
    link.click();
  };

  // Clear canvas
  const clearCanvas = () => {
    pushUndo(emojisOnCanvas);
    setEmojisOnCanvas([]);
    setSelectedIndex(null);
  };

  // Animation end
  const handleAnimationEnd = (index) => {
    const updated = [...emojisOnCanvas];
    updated[index].animate = false;
    setEmojisOnCanvas(updated);
  };

  // Touch support
  const handleTouchEnd = (e, index) => {
    const rect = e.target.parentElement.getBoundingClientRect();
    const touch = e.changedTouches[0];
    let newX = touch.clientX - rect.left - emojisOnCanvas[index].size / 2;
    let newY = touch.clientY - rect.top - emojisOnCanvas[index].size / 2;
    newX = snap(newX);
    newY = snap(newY);

    pushUndo(emojisOnCanvas);
    const updated = [...emojisOnCanvas];
    updated[index] = { ...updated[index], x: newX, y: newY };
    setEmojisOnCanvas(updated);
  };

  // Grid background
  const gridBg = snapToGrid
    ? `repeating-linear-gradient(
        to right, #222 0, #222 1px, transparent 1px, transparent ${gridSize}px
      ),
      repeating-linear-gradient(
        to bottom, #222 0, #222 1px, transparent 1px, transparent ${gridSize}px
      )`
    : canvasStyle.background;

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={undo} disabled={undoStack.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </button>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={exportCanvas}>Export PNG</button>
        <label style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => setSnapToGrid(e.target.checked)}
          />
          Snap to Grid
        </label>
        <label style={{ marginLeft: 8 }}>
          Canvas Height:
          <input
            type="range"
            min={200}
            max={800}
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(Number(e.target.value))}
            style={{ verticalAlign: "middle", marginLeft: 4 }}
          />
          {canvasHeight}px
        </label>
      </div>
      <div
        ref={canvasRef}
        style={{ ...canvasStyle, background: gridBg }}
        onClick={handleCanvasClick}
      >
        {emojisOnCanvas.map((item, index) => (
          <span
            key={index}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              fontSize: `${item.size}px`,
              transform: `rotate(${item.rotation}deg)`,
              cursor: selectedIndex === index ? "pointer" : "move",
              userSelect: "none",
              zIndex: index,
              transition: "opacity 0.4s",
              opacity: item.animate ? 0 : 1,
              animation: item.animate ? "fadeIn 0.4s forwards" : undefined,
              outline: selectedIndex === index ? "2px solid #ff0" : "none",
            }}
            draggable
            onDragEnd={(e) => handleDragEnd(e, index)}
            onTouchEnd={(e) => handleTouchEnd(e, index)}
            onClick={(e) => {
              e.stopPropagation();
              handleEmojiClick(index);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleEmojiDoubleClick(index);
            }}
            onAnimationEnd={() => handleAnimationEnd(index)}
          >
            {item.emoji}
          </span>
        ))}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
      </div>
      {selectedIndex !== null && (
        <div
          style={{
            marginTop: 8,
            padding: 8,
            background: "#222",
            borderRadius: 8,
            color: "#fff",
            display: "inline-block",
          }}
        >
          <div>
            <label>
              Emoji:
              <input
                type="text"
                value={emojisOnCanvas[selectedIndex].emoji}
                maxLength={2}
                onChange={(e) => handleEditChange("emoji", e.target.value)}
                style={{ width: 40, fontSize: 24, marginLeft: 4 }}
              />
            </label>
          </div>
          <div>
            <label>
              Size:
              <input
                type="number"
                min={16}
                max={200}
                value={emojisOnCanvas[selectedIndex].size}
                onChange={(e) => handleEditChange("size", Number(e.target.value))}
                style={{ width: 60, marginLeft: 4 }}
              />
            </label>
          </div>
          <div>
            <label>
              Rotation:
              <input
                type="number"
                min={-180}
                max={180}
                value={emojisOnCanvas[selectedIndex].rotation}
                onChange={(e) => handleEditChange("rotation", Number(e.target.value))}
                style={{ width: 60, marginLeft: 4 }}
              />
            </label>
          </div>
          <div style={{ marginTop: 4 }}>
            <button onClick={bringForward}>Bring Forward</button>
            <button onClick={sendBackward}>Send Backward</button>
            <button onClick={() => setSelectedIndex(null)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;

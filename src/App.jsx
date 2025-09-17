import React, { useState } from "react";
import EmojiPalette from "../src/Components/EmojiPalette";
import Canvas from "../src/Components/Canvas";
import Toolbar from "../src/Components/Toolbar";

function App() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀");
  const [emojiSize, setEmojiSize] = useState(50);

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    background: "#121212",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: "20px" }}>🌟 FaceForge – Emoji Editor</h1>
      <Toolbar emojiSize={emojiSize} setEmojiSize={setEmojiSize} />
      <EmojiPalette setSelectedEmoji={setSelectedEmoji} />
      <Canvas selectedEmoji={selectedEmoji} emojiSize={emojiSize} />
    </div>
  );
}

export default App;

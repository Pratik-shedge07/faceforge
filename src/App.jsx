import React, { useState } from "react";
import EmojiPalette from "./components/EmojiPalette";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";


function App() {
  const [selectedEmoji, setSelectedEmoji] = useState("😀");
  const [emojiSize, setEmojiSize] = useState(50);
  const [rotation, setRotation] = useState(0);

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
      
      <Toolbar
        emojiSize={emojiSize}
        setEmojiSize={setEmojiSize}
        rotation={rotation}
        setRotation={setRotation}
      />
      
      <EmojiPalette setSelectedEmoji={setSelectedEmoji} />
      
      <Canvas
        selectedEmoji={selectedEmoji}
        emojiSize={emojiSize}
        rotation={rotation}
      />
    </div>
  );
}

export default App;

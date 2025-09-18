import React, { useState, useRef, useEffect } from "react";

const emojiCategories = {
  Faces: ["😀", "😂", "😍", "🤔", "😎", "😭", "🥳", "😡"],
  Creatures: ["👻", "👽", "🤖", "🐶", "🐱", "🦊", "🐼", "🐸"],
  Food: ["🍕", "🍔", "🍩", "🍎"],
  Sports: ["⚽", "🏀"],
  Fun: ["🎮", "🎸"],
};

function EmojiPalette({ selectedEmoji, setSelectedEmoji }) {
  const [search, setSearch] = useState("");
  const [customEmoji, setCustomEmoji] = useState("");
  const [category, setCategory] = useState("Faces");
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [hoveredEmoji, setHoveredEmoji] = useState(null);
  const emojiRefs = useRef([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);

  // Combine recent, custom, and category emojis
  useEffect(() => {
    let emojis = [...emojiCategories[category]];
    if (customEmoji) emojis = [customEmoji, ...emojis];
    if (search) {
      emojis = emojis.filter((e) => e.includes(search));
    }
    setFilteredEmojis(emojis);
  }, [category, customEmoji, search]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!filteredEmojis.length) return;
      const idx = filteredEmojis.indexOf(selectedEmoji);
      let nextIdx = idx;
      if (e.key === "ArrowRight") nextIdx = Math.min(idx + 1, filteredEmojis.length - 1);
      if (e.key === "ArrowLeft") nextIdx = Math.max(idx - 1, 0);
      if (e.key === "ArrowDown") nextIdx = Math.min(idx + 4, filteredEmojis.length - 1);
      if (e.key === "ArrowUp") nextIdx = Math.max(idx - 4, 0);
      if (nextIdx !== idx) {
        setSelectedEmoji(filteredEmojis[nextIdx]);
        emojiRefs.current[nextIdx]?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredEmojis, selectedEmoji, setSelectedEmoji]);

  // Handle emoji selection and recent
  const handleSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setRecentEmojis((prev) => {
      const arr = [emoji, ...prev.filter((e) => e !== emoji)];
      return arr.slice(0, 8);
    });
  };

  // Tooltip names (simple demo)
  const emojiNames = {
    "😀": "Grinning Face", "😂": "Laughing", "😍": "Heart Eyes", "🤔": "Thinking",
    "😎": "Cool", "😭": "Crying", "🥳": "Party", "😡": "Angry",
    "👻": "Ghost", "👽": "Alien", "🤖": "Robot", "🐶": "Dog",
    "🐱": "Cat", "🦊": "Fox", "🐼": "Panda", "🐸": "Frog",
    "🍕": "Pizza", "🍔": "Burger", "🍩": "Donut", "🍎": "Apple",
    "⚽": "Soccer", "🏀": "Basketball", "🎮": "Game", "🎸": "Guitar"
  };

  return (
    <div style={{
      background: "#232323",
      padding: "18px",
      borderRadius: "16px",
      maxWidth: "540px",
      margin: "20px auto",
      boxShadow: "0 2px 16px #0006"
    }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {Object.keys(emojiCategories).map((cat) => (
          <button
            key={cat}
            style={{
              background: category === cat ? "#444" : "#222",
              color: "#fff",
              border: "none",
              borderRadius: "8px 8px 0 0",
              padding: "6px 18px",
              cursor: "pointer",
              fontWeight: category === cat ? "bold" : "normal"
            }}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Search & Custom */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search emoji..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #333",
            background: "#181818",
            color: "#fff",
            fontSize: 16
          }}
        />
        <input
          type="text"
          placeholder="Add custom emoji"
          value={customEmoji}
          maxLength={2}
          onChange={e => setCustomEmoji(e.target.value)}
          style={{
            width: 60,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #333",
            background: "#181818",
            color: "#fff",
            fontSize: 22,
            textAlign: "center"
          }}
        />
      </div>
      {/* Recently Used */}
      {recentEmojis.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ color: "#aaa", fontSize: 13, marginBottom: 2 }}>Recently Used:</div>
          <div style={{ display: "flex", gap: 8 }}>
            {recentEmojis.map((emoji, idx) => (
              <span
                key={emoji}
                style={{
                  fontSize: "26px",
                  cursor: "pointer",
                  borderRadius: 8,
                  background: selectedEmoji === emoji ? "#ff0" : "#333",
                  boxShadow: selectedEmoji === emoji ? "0 0 0 2px #ff0" : "none",
                  padding: "2px 8px"
                }}
                title={emojiNames[emoji] || emoji}
                onClick={() => handleSelect(emoji)}
                tabIndex={0}
                ref={el => emojiRefs.current[idx] = el}
                onMouseEnter={() => setHoveredEmoji(emoji)}
                onMouseLeave={() => setHoveredEmoji(null)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Palette */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        maxHeight: "160px",
        overflowY: "auto",
        background: "#181818",
        padding: "10px",
        borderRadius: "10px",
        justifyContent: "center"
      }}>
        {filteredEmojis.map((emoji, index) => (
          <span
            key={emoji}
            style={{
              fontSize: "32px",
              cursor: "pointer",
              borderRadius: 8,
              background: selectedEmoji === emoji ? "#ff0" : "#222",
              boxShadow: selectedEmoji === emoji ? "0 0 0 2px #ff0" : "none",
              padding: "4px 10px",
              transition: "background 0.2s, box-shadow 0.2s"
            }}
            title={emojiNames[emoji] || emoji}
            onClick={() => handleSelect(emoji)}
            tabIndex={0}
            ref={el => emojiRefs.current[index + recentEmojis.length] = el}
            onMouseEnter={() => setHoveredEmoji(emoji)}
            onMouseLeave={() => setHoveredEmoji(null)}
          >
            {emoji}
            {/* Tooltip */}
            {hoveredEmoji === emoji && (
              <span style={{
                position: "absolute",
                background: "#333",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: 6,
                fontSize: 13,
                marginTop: 36,
                marginLeft: -10,
                zIndex: 10,
                pointerEvents: "none",
                boxShadow: "0 2px 8px #0008"
              }}>
                {emojiNames[emoji] || emoji}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EmojiPalette;

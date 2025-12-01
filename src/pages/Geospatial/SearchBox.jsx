import React, { useState } from "react";

function SearchBox({ onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Nominatim API
  const searchLocation = async (value) => {
    setInput(value);
    if (value.length < 3) return setSuggestions([]);

    setLoading(true);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    const data = await res.json();

    setSuggestions(data);
    setLoading(false);
  };

  const handleSelect = (place) => {
    onSelect(place);
    setInput(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="geo-search-box">
      <input
        type="text"
        value={input}
        placeholder="Cari lokasi… (contoh: Jakarta)"
        onChange={(e) => searchLocation(e.target.value)}
      />

      {loading && <div className="geo-loading">Loading...</div>}

      {suggestions.length > 0 && (
        <ul className="geo-suggestion-list">
          {suggestions.map((place) => (
            <li key={place.place_id} onClick={() => handleSelect(place)}>
              <b>{place.display_name}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;

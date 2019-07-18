import React, { useState } from "react";
import "./Metronome.css";

const Metronome = () => {
  const [metronome, setMetronome] = useState({
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4
  });

  const handleBpmChange = e => {
    const bpm = event.target.value;
    setMetronome({ ...metronome, bpm });
  };

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{metronome.bpm} BPM</div>
        <input
          type="range"
          min="60"
          max="240"
          value={metronome.bpm}
          onChange={handleBpmChange}
        />
      </div>
      <button>{metronome.playing ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Metronome;

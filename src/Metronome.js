import React, { useState } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

const Metronome = () => {
  const [metronome, setMetronome] = useState({
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4
  });

  const _click1 = new Audio(click1);
  const _click2 = new Audio(click2);

  const startStop = () => {
    if (metronome.playing) {
      clearInterval(this.timer);
      setMetronome({ ...metronome, playing: false });
    } else {
      this.timer = setInterval(this.playClick, (60 / metronome.bpm) * 1000);
      setMetronome({ ...metronome, count: 0, playing: true }, this.playClick);
    }
    _click1.play();
  };

  const handleBpmChange = e => {
    const bpm = e.target.value;
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
      <button onClick={startStop}>
        {metronome.playing ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Metronome;

import React, { useState, useEffect } from "react";
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

  const playClick = () => {
    if (metronome.count % metronome.beatsPerMeasure === 0) {
      _click1.play();
    } else {
      _click2.play();
    }
    setMetronome({
      ...metronome,
      count: (metronome.count + 1) % metronome.beatsPerMeasure
    });
  };

  let timer;
  const startStop = () => {
    if (metronome.playing) {
      clearInterval(timer);
      setMetronome({ ...metronome, playing: false });
    } else {
      timer = setInterval(playClick, (60 / metronome.bpm) * 1000);
      setMetronome({ ...metronome, count: 0, playing: true }, playClick);
    }
    _click1.play();
  };

  // useEffect(() => {
  //   let interval = null;
  //   if (metronome.playing) {
  //     interval = setInterval(() => {});
  //   }
  // });

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

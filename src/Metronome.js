import React, { Component } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.click1.play();
    } else {
      this.click2.play();
    }
    this.setState(prevState => ({
      count: (prevState.count + 1) % prevState.beatsPerMeasure
    }));
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({ playing: false });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({ count: 0, playing: true }, this.playClick);
    }
  };

  handleBpmChange = e => {
    const bpm = e.target.value;
    if (this.state.playing) {
      // stop timer
      clearInterval(this.timer);
      // start new timer
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      // set new bpm, reset counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // update bpm
      this.setState({ bpm });
    }
  };
  render() {
    const { playing, bpm } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
      </div>
    );
  }
}

export default Metronome;

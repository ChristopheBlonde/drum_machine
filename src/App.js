import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";

const type1 = [
  {
    name: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    id: "Q",
  },
  {
    name: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    id: "W",
  },
  {
    name: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    id: "E",
  },
  {
    name: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    id: "A",
  },
  {
    name: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    id: "S",
  },
  {
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    id: "D",
  },
  {
    name: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    id: "Z",
  },
  {
    name: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    id: "X",
  },
  {
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    id: "C",
  },
];
const type2 = [
  {
    name: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    id: "Q",
  },

  {
    name: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    id: "W",
  },
  {
    name: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    id: "E",
  },
  {
    name: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    id: "A",
  },
  {
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    id: "S",
  },
  {
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    id: "D",
  },
  {
    name: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    id: "Z",
  },
  {
    name: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    id: "X",
  },
  {
    name: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    id: "C",
  },
];

function App() {
  const [currentDrum, setCurrentDrum] = useState(type1);
  const [drumPads, setDrumPads] = useState([]);
  const [drum, setDrum] = useState(false);
  const [power, setPower] = useState(true);
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(70);

  const audioRefs = useRef([]);

  const handleChangeDrum = () => {
    setDrum(!drum);
    setDisplay(!drum ? "Smooth Piano Kit" : "Heater Kit");
  };

  const handleChangePower = () => {
    setPower(!power);
    setDisplay(!power ? "Drum On" : "Drum Off");
  };

  const handleChangeDisplay = (string) => {
    setDisplay(string);
  };

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
    setDisplay(`Volume:${event.target.value}`);
  };

  const soundPlay = useCallback(
    (id) => {
      const elem = audioRefs.current[id];
      const parent = document.getElementById(id);
      if (elem === null || parent === null) return;
      parent.style.backgroundColor = "antiquewhite";
      parent.style.boxShadow = "none";
      parent.style.scale = 0.9;
      elem.volume = power ? volume / 100 : 0;
      elem.currentTime = 0;
      elem.play();
      setTimeout(() => {
        parent.style.backgroundColor = "";
        parent.style.boxShadow = "";
        parent.style.scale = 1;
      }, 100);
      return console.log(power);
    },
    [audioRefs, volume, power]
  );

  const DrumPad = ({ name, src, id }) => {
    const audioRef = (el) => (audioRefs.current[name] = el);
    return (
      <div className="drum-pad" id={name}>
        <audio ref={audioRef} className="clip" id={id} src={src}></audio>
        {id}
      </div>
    );
  };

  useEffect(() => {
    if (drum) {
      setCurrentDrum(type2);
    } else {
      setCurrentDrum(type1);
    }
  }, [drum]);

  useEffect(() => {
    setDrumPads(
      currentDrum.map((elem, index) => (
        <DrumPad key={index} name={elem.name} src={elem.src} id={elem.id} />
      ))
    );
    const playSoundKey = (key) => {
      const keys = currentDrum.map((elem) => elem.id);
      const name = currentDrum.map((elem) => elem.name);
      const keyCase = key.toUpperCase();
      if (keys.indexOf(keyCase) === -1 && name.indexOf(key) === -1) {
        return;
      }

      const index =
        keys.indexOf(keyCase) !== -1
          ? keys.indexOf(keyCase)
          : name.indexOf(key);
      soundPlay(name[index]);
      handleChangeDisplay(name[index]);
    };

    document.addEventListener("keydown", (event) => {
      return playSoundKey(event.key);
    });
    document.addEventListener("mousedown", (event) => {
      return playSoundKey(event.target.id);
    });
    return () => {
      document.removeEventListener("keydown", (event) => {
        playSoundKey(event.key);
        return;
      });
      document.removeEventListener("mousedown", (event) => {
        playSoundKey(event.target.id);
        return;
      });
    };
  }, [currentDrum, soundPlay]);

  return (
    <div id="drum-machine" className="drum_machine_container">
      <div className="logo">
        <h3>Drum Machine</h3>
        <img
          src="https://dragonasmusic.com/images/Dragon%20Logo06.png"
          alt="logo"
          className="img_logo"
        />
      </div>
      <div className="column-container">
        <div className="column1">
          <div className="pad_bank">{drumPads}</div>
        </div>
        <div className="column2">
          <div className="control">
            <p>Power</p>
            <div
              className="switch"
              id="power"
              onClick={handleChangePower}
              style={{
                justifyContent: power ? "flex-end" : "flex-start",
              }}
            >
              <div className="checked"></div>
            </div>
          </div>
          <div className="controls_container">
            <div className="display" id="display">
              {display}
            </div>
            <input
              type="range"
              className="range"
              max={100}
              min={0}
              step={1}
              value={volume}
              onChange={handleChangeVolume}
            />
            <p>Bank</p>
            <div
              id="type-switch"
              className="switch"
              onClick={handleChangeDrum}
              style={{
                justifyContent: drum ? "flex-end" : "flex-start",
              }}
            >
              <div className="checked"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

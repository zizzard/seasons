import "./App.css";
import "./nes.css";

import React, { useState, useEffect } from "react";

import Navigator from "./Navigator";
import SongDisplay from "./SongDisplay";
import Speaker from "./Speaker";
import ControlDeck from "./ControlDeck";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [audioUI, setAudioUI] = useState(null);
  const [data, setData] = useState(null);
  const [dataFailure, setDataFailure] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [entry, setEntry] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [songIndex, setSongIndex] = useState(null);
  const [songEnded, setSongEnded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    fetch("https://zizzard-music.herokuapp.com/holiday")
      .then(
        (response) => {
          return response.json();
        },
        (error) => {
          return { error: "failed" };
        }
      )
      .then((data) => {
        if (data["success"]) {
          setData(data["payload"]);
          setLoaded(true);
        } else {
          setDataFailure(true);
        }
      });
  }, [loaded]);

  useEffect(() => {
    if (!songEnded) return;

    if (audioUI !== null) audioUI.pause();
    setCurrentlyPlaying(false);

    let song_index = songIndex + 1;

    if (data.length === song_index) {
      clearSong();
      return;
    }

    updateCurrentSong(data[song_index]);
    setSongEnded(false);
  }, [songEnded]);

  function songEndedFunc() {
    setSongEnded(true);
  }

  function updateCurrentSong(song) {
    if (audioUI != null) audioUI.pause();

    setDownloading(true);
    setCurrentSong(song);

    let index = song["date"];
    setSongIndex(index);

    let url = song.url;
    let audio = new Audio(url);
    audio.volume = 0.2;
    audio.addEventListener("ended", songEndedFunc);

    audio.play().then(() => {
      setAudioUI(audio);
      setDownloading(false);
      setCurrentlyPlaying(true);
    });
  }

  function play() {
    if (currentSong === null) return;
    audioUI.play();
    setCurrentlyPlaying(true);
  }

  function pause() {
    audioUI.pause();
    setCurrentlyPlaying(false);
  }

  function prev() {
    if (currentlyPlaying) {
      audioUI.pause();
      setCurrentlyPlaying(false);
    }

    let current_song_index = currentSong["date"] - 1;
    let prev_song_index = current_song_index - 1;
    if (-1 === prev_song_index) {
      clearSong();
      return;
    }

    updateCurrentSong(data[prev_song_index]);
  }

  function next() {
    if (currentlyPlaying) {
      audioUI.pause();
      setCurrentlyPlaying(false);
    }

    let current_song_index = currentSong["date"] - 1;
    let next_song_index = current_song_index + 1;
    if (data.length === next_song_index) {
      clearSong();
      return;
    }

    updateCurrentSong(data[next_song_index]);
  }

  function clearSong() {
    setCurrentSong(null);
    setCurrentlyPlaying(false);
  }

  return (
    <div className="App">
      <div className="player nes-container is-rounded">
        <div className="display nes-container">
          {entry ? (
            <>
              <Navigator
                loaded={loaded}
                data={data}
                updateCurrentSong={updateCurrentSong}
                dataFailure={dataFailure}
              />
              <SongDisplay
                currentlyPlaying={currentlyPlaying}
                currentSong={currentSong}
                downloading={downloading}
              />
            </>
          ) : (
            <div className="home nes-container">
              <div
                className="home-btn nes-btn wide margin-bottom"
                onClick={() => setEntry(true)}
              >
                <div className="nes-btn-text">Listen Live</div>
              </div>
              <div
                className="home-btn nes-btn wide"
                onClick={() =>
                  window.location.replace(
                    "https://open.spotify.com/playlist/60Aoyx14boHFyaqb5OJa1l?si=3c197e0a12ee4472"
                  )
                }
              >
                <div className="nes-btn-text">Spotify</div>
              </div>
            </div>
          )}
        </div>
        <div className="deck">
          <Speaker side="left" />
          <ControlDeck
            prev={prev}
            next={next}
            play={play}
            pause={pause}
            currentlyPlaying={currentlyPlaying}
          />
          <Speaker side="right" />
        </div>
      </div>
      <div className="player background"></div>
    </div>
  );
}

export default App;

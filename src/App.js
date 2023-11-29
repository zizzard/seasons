import "./App.css";
import "./nes.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import Spotify from "./Spotify";
import SpotifySongs from "./SpotifySongs";
import SpotifyArtists from "./SpotifyArtists";
import Login from "./Login";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navigator from "./Navigator";
import SongDisplay from "./SongDisplay";
import Speaker from "./Speaker";
import ControlDeck from "./ControlDeck";

function App() {
  return (
    <div className="App">
      <div className="player nes-container is-rounded">
        <div className="display nes-container">
          <div className="loading-center">
            <p className="loading-text">coming soon...</p>
          </div>
        </div>
        <div className="deck">
          <Speaker side="left" />
          <Speaker side="right" />
        </div>
      </div>
      <div className="player background"></div>
    </div>
  );
}

export default App;

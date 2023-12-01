import React from "react";

import Song from "./Song";

function Navigator({ loaded, updateCurrentSong, data, dataFailure }) {
  return (
    <div className="navigator nes-container">
      {!loaded ? (
        <div className="loading-center">
          <div className="loading-text">
            {dataFailure
              ? "Failed to load library, please try again..."
              : "Downloading music library..."}
          </div>
        </div>
      ) : (
        <div className="artists">
          {data.map((song) => {
            return (
              <Song
                key={song.date}
                song={song}
                song_title={song.title}
                song_date={song.date}
                updateCurrentSong={updateCurrentSong}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Navigator;

function Song({ song, song_title, song_date, updateCurrentSong }) {
  function playSong() {
    updateCurrentSong(song);
  }

  return (
    <div className="song-container">
      <div className="song-title" onClick={playSong}>
        {song_date} - {song_title}
      </div>
    </div>
  );
}

export default Song;

function Song({ song, song_title, song_date, updateCurrentSong }) {
  function playSong() {
    updateCurrentSong(song);
  }

  let date = parseInt(song_date);
  if (date < 10) {
    date = "0" + date;
  }

  return (
    <div className="song-container">
      <div className="song-title" onClick={playSong}>
        {date} - {song_title}
      </div>
    </div>
  );
}

export default Song;

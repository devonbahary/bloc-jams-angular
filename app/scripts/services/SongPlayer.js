/*
  bloc-jams-angular
    app
      scripts
        services
          SongPlayer.js
*/

(function() {
  function SongPlayer(Fixtures) {
    /*
    * @desc Object returned from SongPlayer holding public attributes + methods
    * @type {Object}
    */
    var SongPlayer = {};
    /*
    * @desc Fixtures album Object
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();
    /*
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /*
     * @function playSong
     * @desc Plays the current Buzz object and sets the playing property of the song
     * object to true
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /*
     * @function getSongIndex
     * @desc Returns the index of the song from the currentAlbum
     * @return {Number}
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /*
    * @desc song object from Fixtures.js
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /*
     * @function SongPlayer.play
     * @desc Plays a new song if song parameter is different from currentSong or
     * plays paused song if currentSong is the same as song parameter and the
     * currentBuzzObject is paused
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /*
     * @function SongPlayer.pause
     * @desc Pauses the currentBuzzObject from playing and sets the song object's
     * playing property to false
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /*
     * @function SongPlayer.previous
     * @desc Plays the song previous to the currentSong, or stops the currentSong
     * if there is no previous song
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

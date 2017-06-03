/*
  bloc-jams-angular
    app
      scripts
        services
          SongPlayer.js
*/

(function() {
  function SongPlayer() {
    /*
    * @desc Object returned from SongPlayer holding public attributes + methods
    * @type {Object}
    */
    var SongPlayer = {};
    /*
    * @desc song object from Fixtures.js
    * @type {Object}
    */
    var currentSong = null;
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
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
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
     * @function songPlayer.play
     * @desc Plays a new song if song parameter is different from currentSong or
     * plays paused song if currentSong is the same as song parameter and the
     * currentBuzzObject is paused
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);

      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /*
     * @function songPlayer.pause
     * @desc Pauses the currentBuzzObject from playing and sets the song object's
     * playing property to false
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();

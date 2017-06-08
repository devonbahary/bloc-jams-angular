/*
  bloc-jams-angular
    app
      scripts
        services
          SongPlayer.js
*/

(function() {
  function SongPlayer($rootScope, Fixtures) {
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
        stopSong(SongPlayer.currentSong);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /*
     * @function playSong
     * @desc Plays the current Buzz object and sets the playing property of the song
     * object to true
     * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /*
     * @function stopSong
     * @desc Stops the currentBuzzObject and sets the playing property of the song
     * object to null
     * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

    /*
     * @function getSongIndex
     * @desc Returns the index of the song from the currentAlbum
     * @return {Number}
     * @param {Object} song
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
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
    */
    SongPlayer.currentTime = null;

    /*
     * @desc Current volume of currently playing song
     * @type {Number}
    */
    SongPlayer.volume = null;

    /*
     * @function play
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
     * @function pause
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
     * @function previous
     * @desc Plays the song previous to the currentSong, or stops the currentSong
     * if there is no previous song
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /*
     * @function next
     * @desc Plays the song following the currentSong, or stops the currentSong
     * if there is no following song
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /*
     * @func setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /*
     * @func setVolume
     * @desc Set volume of currently playing song
     * @param {Number} volume
    */
    SongPlayer.setVolume = function(vol) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(vol);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

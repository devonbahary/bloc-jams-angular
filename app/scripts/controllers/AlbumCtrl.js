/*
  bloc-jams-angular
    app
      scripts
        controllers
          AlbumCtrl.js
*/

(function() {
  function AlbumCtrl() {
    this.albumData = angular.copy(albumPicasso);
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();

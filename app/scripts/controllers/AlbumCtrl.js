/*
  bloc-jams-angular
    app
      scripts
        controllers
          AlbumCtrl.js
*/

(function() {
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl);
})();

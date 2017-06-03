/*
  bloc-jams-angular
    app
      scripts
        controllers
          CollectionCtrl.js
*/

(function() {
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(12);
  }

  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();

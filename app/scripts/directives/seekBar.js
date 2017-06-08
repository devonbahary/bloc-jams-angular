/*
  bloc-jams-angular
    app
      scripts
        directives
          seekBar.js
*/

(function() {
  function seekBar($document) {

    /*
     * @func calculatePercent
     * @desc Calculates the horizontal percent along the seek bar where the
     * event (passed in from the view as ''$event') occured
     * @param {Object, Object}
     * @return {Number}
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
        // replace
        //  -> true : the template replaces the directive's element
        //  -> false : the template replaces the contents of the directive's
        //     element
      restrict: 'E',
        // restrict
        //  restricts the directive to a specific declaration style:
        //    -> 'E' : element (default)
        //    -> 'A' : attributes (default)
        //    -> 'C' : class
        //    -> 'M' : comment
        //  can string together (e.g., 'EA', 'AEC')
      scope: { },
      link: function(scope, element, attributes) {
        /*
         * @desc Holds the value of the seek bar (currently playing song time
         * or the current volume). Default 0
         * @type {Number}
        */
        scope.value = 0;
        /*
         * @desc Holds the maximum value of the song and volume seek bars.
         * Default 100
         * @type {Number}
        */
        scope.max = 100;

        /*
         * @desc Holds the element that matches the directive (<seek-bar>) as
         * a jQuery object so we can call jQuery methods on it
         * @type {Object}
        */
        var seekBar = $(element);

        /*
         * @func percentString
         * @desc Calculates a percent based on the 'value' and 'max' value of
         * a seek bar
         * @return {String}
        */
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + '%';
        };

        /*
         * @func fillStyle
         * @desc Returns the width of the seek bar fill element based on the
         * calculated percent
         * @return {Object}
        */
        scope.fillStyle = function() {
          return { width: percentString() };
        };

        /*
         * @func thumbStyle
         * @desc Returns the position of the seek bar thumb element based on the
         * calculated percent
         * @return {Object}
        */
        scope.thumbStyle = function() {
          return { left: percentString() }
        }

        /*
         * @func onClickSeekBar
         * @desc Updates the seek bar value based on the seek bar's width and
         * the location of the user's click on the seek bar
         * @param {Object}
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        /*
         * @func trackThumb
         * @desc Similar to 'onClickSeekBar()', but uses '$apply' to constantly
         * apply the change in value of 'scope.value' as the user drags the
         * seek bar thumb
        */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);

})();

(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		var currentAlbum = Fixtures.getAlbum();
		 
		
		var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
		};
		
		SongPlayer.currentSong = null;
/**
* @desc Buzz object audio file
* @type {Object}
*/
     	var currentBuzzObject = null;
		
/**
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
		
		function playsong(){
        	currentBuzzObject.play();
        	Song.playing = true;
    		}		
		
/**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
         		playsong;
            } else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playsong;
         		}
     		}
		};
 /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */		
        
     	currentBuzzObject.play();
		song.playing = true;
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
     		song.playing = false;
		};
		
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
        .factory('SongPlayer', ['Fixtures' , SongPlayer]);
})();


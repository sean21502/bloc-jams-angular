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
        	stopSong();
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
         		playSong();
            } else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong();
         		}
     		}
		};
		
		SongPlayer.stop = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
         		stopSong();
            } else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.stop()) {
					stopSong();
         		}
     		}
		};
 /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */		
        
     
		
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
        		stopSong();
			} else {
         		var song = currentAlbum.songs[currentSongIndex];
         		setSong(song);
         		playSong(song);	
				
     		}	
 		};
		
		SongPlayer.next = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex++;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
        		stopSong();
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


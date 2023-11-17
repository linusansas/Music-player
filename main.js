window.addEventListener("DOMContentLoaded", main);

function main() {
   setMusic();
}

/**
 * Retrieves the initial value for the current music from local storage.
 * @function
 * @returns {number} The initial value for the current music.
 * @example
 * // Usage example:
 * const initialCurrentMusic = getInitialCurrentMusic();
 * console.log(initialCurrentMusic); // Output: 0
*/

function getInitialCurrentMusic(){
   return localStorage.getItem("storedCurrentMusic") || 0;
}

let currentMusic = getInitialCurrentMusic();

const music = document.querySelector('#audio');

const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const songStory = document.querySelector('.song-story');

const disk = document.querySelector('.disk');
const seekBar = document.querySelector('.seek-bar');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');

const backwardBtn = document.querySelector('.backward-btn');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');

// lägger till / tar bort class för pause och play till divarna 

playBtn.addEventListener('click', () => {
   
   if(playBtn.className.includes('pause')){
      music.play();
   } 
   
   else {
      music.pause();
   }

   playBtn.classList.toggle('pause');
   disk.classList.toggle('play');
})

/**
 * Sets music information and properties based on the current music.
 * @function
 */

function setMusic() {
   seekBar.value = 0;
   const song = songs[currentMusic];
   music.src = song.path;

   songName.innerHTML = song.name;
   artistName.innerHTML = song.artist;
   songStory.innerHTML = song.story;
   disk.style.backgroundImage = `url(${song.cover})`;

   currentTime.innerHTML = '00:00';
   setTimeout(() => {
      seekBar.max = music.duration;
      musicDuration.innerHTML = formatTime(music.duration);
   }, 300);
   localStorage.setItem("storedCurrentMusic", currentMusic)
}

/**
 * Formats time into a string representation in the format 'mm:ss'.
 * @param {number} time - The time value in seconds.
 * @returns {string} A formatted time string in the 'mm:ss' format.
 * @example
 * // Usage example:
 * const timeInSeconds = 125;
 * const formattedTime = formatTime(timeInSeconds);
 * console.log(formattedTime); // Output: '02:05'
 */

function formatTime(time) {
   let min = Math.floor(time / 60);
   if(min < 10){
      min = `0${min}`;
   }
   let sec = Math.floor(time % 60);
   if(sec < 10){
      sec = `0${sec}`;
   }
   return `${min} : ${sec}`;
}

// slider

setInterval(() => {
   seekBar.value = music.currentTime;
   currentTime.innerHTML = formatTime(music.currentTime);
   if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
      forwardBtn.click();
   }
}, 500)

seekBar.addEventListener('change', () => {
   music.currentTime = seekBar.value;
})

const playMusic = () => {
   music.play();
   playBtn.classList.remove('pause');
   disk.classList.add('play');
}

// Byt låt funktioner

forwardBtn.addEventListener('click', () => {
   if(currentMusic >= songs.length - 1){
      currentMusic = 0;
   }
   else{
      currentMusic++;
   }
   setMusic();
   playMusic();
})

backwardBtn.addEventListener('click', () => {
   if(currentMusic <= 0){
      currentMusic = songs.length - 1;
   }
   else{
      currentMusic--;
   }
   setMusic();
   playMusic();
})
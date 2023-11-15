window.addEventListener("DOMContentLoaded", main);

function main() {
   //renderScene();
}

//Variabler för att hämta från DOMen

let currentMusic = 0;

const music = document.querySelector('#audio');

const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name')

const disk = document.querySelector('.disk');
const seekBar = document.querySelector('.seek-bar');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');

const backwardBtn = document.querySelector('.backward-btn');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');

// Arrowfunktion - lägger till / tar bort classen pause och play till divarna 

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

// Musiksetup

const setMusic = (i) => {
   seekBar.value = 0;
   let song = songs[i];
   currentMusic = i;
   music.src = song.path;

   songName.innerHTML = song.name;
   artistName.innerHTML = song.artist;
   disk.style.backgroundImage = `url(${song.cover})`;

   currentTime.innerHTML = '00:00';
   setTimeout(() => {
      seekBar.max = music.duration;
      musicDuration.innerHTML = formatTime(music.duration);
   }, 300);
}

setMusic(0);

// formaterar tid till minuter och sekunder

const formatTime = (time) => {
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

// seekBar

setInterval(() => {
   seekBar.value = music.currentTime;
   currentTime.innerHTML = formatTime(music.currentTime);
}, 500)
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
console.log(Player);
const vimeoPlayer = new Player('vimeo-player');
const timeStorage = 'videoplayer-current-time';

let playDuration = 0;

Player.getDuration().then(duration => {
  playDuration = duration;
});

vimeoPlayer.on('timeupdate', throttle(updateTime, 1000));
vimeoPlayer.on('ended', () => {
  localStorage.removeItem(timeStorage);
});

function updateTime(e) {
  const currentTime = e.seconds;
  localStorage.setItem(timeStorage, currentTime.toString());
}

function loadVideo() {
  const savedTime = localStorage.getItem(timeStorage);
  if (savedTime) {
    vimeoPlayer.setCurrentTime(parseFloat(savedTime));
  }
}
function onVideoEnd() {
  if (savedTime < playDuration) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
}
loadVideo();
onVideoEnd();

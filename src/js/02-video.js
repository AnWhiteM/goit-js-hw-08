import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.getElementById('vimeo-player');

const player = new VimeoPlayer(playerElement);

player.on('play', () => {
  console.log('played the video!');
});

player.getVideoTitle().then(title => {
  console.log('title:', title);
});

const updateAndStoreTime = throttle(() => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000);

player.on('timeupdate', updateAndStoreTime);

const setCurrentTimeFromStorage = () => {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null) {
    player.setCurrentTime(parseFloat(storedTime));
  }
};

player.on('loaded', setCurrentTimeFromStorage);

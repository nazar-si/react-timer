const links = {
  digital: '/sounds/digital_alarm.mp3',
};

function play(link: string) {
  const audio = new Audio(link);
  audio.play();
}

const plays = {
  digital: () => {
    const link = links.digital;
    setTimeout(() => {
      play(link);
    }, 0);
    setTimeout(() => {
      play(link);
    }, 1000);
    setTimeout(() => {
      play(link);
    }, 2000);
  },
};

export default plays;

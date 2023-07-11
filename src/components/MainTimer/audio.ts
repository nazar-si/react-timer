const links = {
  digital: '/sounds/digital_alarm.mp3',
};

function play(link: string) {
  const audio = new Audio(link);
  audio.play();
}

const plays = {
  digital: () => {
    play(links.digital);
  },
};

export default plays;

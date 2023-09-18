export function countDown(date: any) {
  const countDownDate = date.getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const currentTime = `${days !== 0 ? days + ':' : ''}${
    hours !== 0 ? hours + ':' : ''
  }${minutes !== 0 ? minutes + ':' : ''}${seconds}`;

  return currentTime;
}

export const formatTrackDuration = (duration) => {
  let mins = Math.round(Number(duration) / 60);
  let seconds = Number(duration) % 60;
  //   return `${Math.round(mins)}:${seconds}`
  return `${mins > 0 ? mins : 1} ${mins > 1 ? 'minutes' : 'minute'}`;
};

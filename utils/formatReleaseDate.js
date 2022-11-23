const formatMonth = (month) => {
  switch (month) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      break;
  }
};

export default function formatReleaseDate(releaseDate) {
  let dateFormat = releaseDate.split('T0')[0];
  let yearAndMonth = dateFormat.split('-');
  let year = yearAndMonth[0];
  let month = yearAndMonth[1];
  formattedMonth = formatMonth(month);
  return `${formattedMonth} ${year}`;
}

const timeSince = (date: Date | string, lang: string = "en") => {
  if (typeof date !== "object") {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  }

  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = lang === "id" ? "tahun" : "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = lang === "id" ? "bulan" : "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = lang === "id" ? "hari" : "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = lang === "id" ? "jam" : "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = lang === "id" ? "menit" : "minute";
          } else {
            interval = seconds;
            intervalType = lang === "id" ? "detik" : "second";
          }
        }
      }
    }
  }

  if ((interval > 1 || interval === 0) && lang === "en") {
    intervalType += "s";
  }

  return `${interval} ${intervalType}`;
};

export default timeSince;

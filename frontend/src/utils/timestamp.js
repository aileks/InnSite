export default function timestamp(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const timeIntervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(timeIntervals)) {
    const elapsed = Math.floor(diffInSeconds / secondsInUnit);

    if (elapsed > 1) {
      return `${elapsed} ${unit}s ago`;
    } else if (elapsed === 1) {
      return `1 ${unit} ago`;
    }
  }

  return "posted just now";
}

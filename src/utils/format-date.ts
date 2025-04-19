function formatDate(timestamp: string | number | Date): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 => 12
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes} ${ampm}`;
  };

  if (isSameDay(date, now)) {
    return `Today at ${formatTime(date)}`;
  } else if (isSameDay(date, yesterday)) {
    return `Yesterday at ${formatTime(date)}`;
  } else {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}

export { formatDate };

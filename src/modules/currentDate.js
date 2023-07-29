export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const monthAbbreviation = formatMonthAbbreviation(date);
  const year = date.getFullYear();
  return `${day} ${monthAbbreviation} ${year}`;
}

function formatMonthAbbreviation(date) {
  const monthsAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthsAbbreviations[date.getMonth()];
}

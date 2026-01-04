// utils/formatDate.js
export const formatLocalTime = (utcDateString: Date | string| number) => {
  // Create a Date object from the UTC string
  const date = new Date(utcDateString);

  // Use the user's local time zone for display
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get the user's local timezone
  }).format(date);
};

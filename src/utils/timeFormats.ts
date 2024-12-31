export const getFormattedTime = (timeFormat: boolean) =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: timeFormat,
    });
  
export const getFormattedDay = () =>
    new Date().toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
import { ParsedEvent } from "@/types";

export const generateCalendarUrl = (
  item: ParsedEvent,
  calendarType: string
) => {
  const formattedDate = item.date.replace(/-/g, "");
  const formattedHour = item.hour.replace(":", "") + "00";
  const endTime = (parseInt(formattedHour) + 10000)
    .toString()
    .padStart(6, "0");

  const details = encodeURIComponent(item.description || "");
  const location = encodeURIComponent(item.location || "");

  switch (calendarType) {
    case "google":
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        item.title
      )}&dates=${formattedDate}T${formattedHour}/${formattedDate}T${endTime}&details=${details}&location=${location}`;
    case "outlook":
      return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
        item.title
      )}&startdt=${formattedDate}T${formattedHour}&enddt=${formattedDate}T${endTime}&body=${details}&location=${location}`;
    case "apple":
      return `webcal://p133-caldav.icloud.com/published/2/MTAyNjI1MjI1MDEwMjYyNWwXMhWgJLBqRVZHvmkUJW4vYQ7nD9uyLOwzJbunKQHUePJZnGLq6tey2YuJT7SQ7z9YwB7z9YwB7z9YwB7z9YwB7z`;
    default:
      throw new Error(`Unsupported calendar type: ${calendarType}`);
  }
};

interface Event {
  date: string;
  hour: string;
  title: string;
  checked: boolean;
}

export function exportToICS(events: ParsedEvent[]): void {
  const checkedEvents = events.filter((item) => item.checked);
  if (checkedEvents.length === 0) {
    alert("No events selected to export.");
    return;
  }

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//hacksw/handcal//NONSGML v1.0//EN",
  ];

  checkedEvents.forEach((item) => {
    const [year, month, day] = item.date.split("/");
    const [hour, minute] = item.hour.split(":");
    const dateTime = `${year}${month}${day}T${hour}${minute}00`;

    icsContent = icsContent.concat([
      "BEGIN:VEVENT",
      `DTSTART:${dateTime}`,
      `DTEND:${dateTime}`,
      `SUMMARY:${item.title}`,
      item.location ? `LOCATION:${item.location}` : "",
      item.description ? `DESCRIPTION:${item.description}` : "",
      item.status ? `STATUS:${item.status}` : "",
      "END:VEVENT",
    ].filter(Boolean));
  });

  icsContent.push("END:VCALENDAR");

  const blob = new Blob([icsContent.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "events.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

import React from "react";

const banglaMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];
const banglaDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

// কাস্টম সময়ভাগ
const getBanglaPeriod = (hour) => {
  if (hour >= 5 && hour < 12) return "সকাল";
  if (hour >= 12 && hour < 16) return "দুপুর";
  if (hour >= 16 && hour < 19) return "বিকেল";
  return "রাত";
};

const DateTimeDisplay = ({ isoDate }) => {
  if (!isoDate) return null;

  const date = new Date(isoDate);
  const bdTime = new Date(date.getTime() + 6 * 60 * 60 * 1000); // BD time

  const day = banglaDays[bdTime.getUTCDay()];
  const dayNum = bdTime.getUTCDate();
  const month = banglaMonths[bdTime.getUTCMonth()];
  const year = bdTime.getUTCFullYear();

  const hour = bdTime.getUTCHours();
  const minute = bdTime.getUTCMinutes();
  const banglaPeriod = getBanglaPeriod(hour);
  const formattedMinute = minute.toString().padStart(2, "0");

  const banglaTime = `${banglaPeriod} ${hour % 12 || 12}:${formattedMinute}`;

  const englishFormat = bdTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });

  return (
    <div className="text-sm space-y-1">
      <p>
        {day} - {banglaTime} ({dayNum} {month}, {year})
      </p>
    </div>
  );
};

export default DateTimeDisplay;

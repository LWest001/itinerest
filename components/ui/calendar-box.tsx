const monthNames = [
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

export default function CalendarBox({
  month,
  date,
}: {
  month: number;
  date: number;
}) {
  return (
    <div className="min-w-20 select-none">
      {/* Transparent cover */}
      <div className="w-20 h-16 bg-gradient-to-tr from-transparent from-50% to-white/20 to-95% absolute rounded-lg shadow-sm shadow-border"></div>
      <div className="w-full h-6 bg-red-400 p-0 text-md leading-none flex items-center justify-center rounded-t-lg">
        <span>{monthNames[month]}</span>
      </div>
      <div className="w-full h-10 bg-white p-0 leading-none flex items-center justify-center rounded-b-lg text-xl">
        <span className="text-black">{date}</span>
      </div>
    </div>
  );
}

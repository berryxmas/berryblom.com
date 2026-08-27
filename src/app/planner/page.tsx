"use client";

import { useState, useMemo } from "react";

type Source = "Booking.com" | "HomeExchange" | "Friends";

type Booking = {
  guest: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  guests: string;
  source: Source;
};

const BOOKINGS: Booking[] = [
  {
    guest: "Hu Siyan",
    checkIn: "2026-09-04",
    checkOut: "2026-09-06",
    nights: 2,
    guests: "4 adults, 3 children",
    source: "Booking.com",
  },
  {
    guest: "Alisson Philipponneau",
    checkIn: "2026-09-18",
    checkOut: "2026-09-20",
    nights: 2,
    guests: "7 adults",
    source: "Booking.com",
  },
  {
    guest: "Buisson Pamella",
    checkIn: "2026-09-24",
    checkOut: "2026-09-27",
    nights: 3,
    guests: "5 adults",
    source: "Booking.com",
  },
  {
    guest: "Violetta Coretnic",
    checkIn: "2026-09-28",
    checkOut: "2026-10-01",
    nights: 3,
    guests: "5 adults",
    source: "Booking.com",
  },
];

const PASSCODE = "1234";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

const SOURCE_STYLES: Record<Source, { label: string; bg: string; text: string; dot: string }> = {
  "Booking.com": {
    label: "Booking",
    bg: "bg-blue-100 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  HomeExchange: {
    label: "HomeExchange",
    bg: "bg-green-100 dark:bg-green-950",
    text: "text-green-700 dark:text-green-300",
    dot: "bg-green-500",
  },
  Friends: {
    label: "Friends",
    bg: "bg-purple-100 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500",
  },
};

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fmtDate(iso: string) {
  const dt = parseDate(iso);
  return dt.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtShort(iso: string) {
  const dt = parseDate(iso);
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

type ServiceDay = {
  date: string;
  guest: string;
  reason: string;
  urgent: boolean;
};

function getServiceDays(bookings: Booking[]): ServiceDay[] {
  const sorted = [...bookings].sort(
    (a, b) => parseDate(a.checkOut).getTime() - parseDate(b.checkOut).getTime()
  );
  return sorted.map((b, i) => {
    const next = sorted[i + 1];
    const checkout = parseDate(b.checkOut);
    const nextCheckIn = next ? parseDate(next.checkIn) : null;
    const gap = nextCheckIn
      ? Math.round((nextCheckIn.getTime() - checkout.getTime()) / 86400000)
      : null;
    const urgent = gap !== null && gap <= 1;
    return {
      date: b.checkOut,
      guest: b.guest,
      reason: next
        ? urgent
          ? `Same-day turnaround — next guest (${next.guest}) arrives ${fmtShort(next.checkIn)}`
          : `Next guest (${next.guest}) arrives ${fmtShort(next.checkIn)}`
        : "Final checkout — no next guest yet",
      urgent,
    };
  });
}

// Calendar helpers
function getMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function isInRange(date: Date, booking: Booking) {
  const d = date.getTime();
  const start = parseDate(booking.checkIn).getTime();
  const end = parseDate(booking.checkOut).getTime();
  return d >= start && d < end;
}

function isCheckoutDay(date: Date, booking: Booking) {
  return toISO(date) === booking.checkOut;
}

function isCheckInDay(date: Date, booking: Booking) {
  return toISO(date) === booking.checkIn;
}

export default function PlannerPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [calMonth, setCalMonth] = useState(8); // September (0-indexed)
  const [calYear, setCalYear] = useState(2026);

  const serviceDays = useMemo(() => getServiceDays(BOOKINGS), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === PASSCODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  // Passcode gate
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs space-y-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm"
        >
          <h1 className="text-xl font-semibold text-center text-neutral-900 dark:text-neutral-100">
            🔒 Apartment Planner
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Enter passcode to view
          </p>
          <input
            type="password"
            inputMode="numeric"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="••••"
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-center text-lg tracking-widest text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-500 text-center">Wrong passcode</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  // Main content
  const monthGrid = getMonthGrid(calYear, calMonth);

  function prevMonth() {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  }

  function nextMonth() {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">🏠 Apartment Planner</h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Bookings & service schedule
            </p>
          </div>
          <button
            onClick={() => setUnlocked(false)}
            className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 shrink-0 ml-3"
          >
            Lock
          </button>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 p-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 mb-5 sm:mb-6 w-fit">
          <button
            onClick={() => setView("calendar")}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === "calendar"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition ${
              view === "list"
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            📋 List
          </button>
        </div>

        {/* Source legend */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
          {(Object.keys(SOURCE_STYLES) as Source[]).map((src) => {
            const s = SOURCE_STYLES[src];
            return (
              <span
                key={src}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            );
          })}
        </div>

        {/* Calendar View */}
        {view === "calendar" && (
          <div className="space-y-5 sm:space-y-6">
            {/* Month nav */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="p-2 -ml-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition touch-manipulation"
                aria-label="Previous month"
              >
                ←
              </button>
              <h2 className="text-base sm:text-lg font-semibold">
                {MONTHS[calMonth]} {calYear}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 -mr-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition touch-manipulation"
                aria-label="Next month"
              >
                →
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {/* Day headers - short on mobile */}
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className="text-center text-[10px] sm:text-xs font-medium text-neutral-400 py-1.5 sm:py-2"
                >
                  <span className="sm:hidden">{DAYS_SHORT[i]}</span>
                  <span className="hidden sm:inline">{d}</span>
                </div>
              ))}
              {monthGrid.map((date, i) => {
                if (!date) return <div key={i} />;
                const iso = toISO(date);
                const serviceDay = serviceDays.find((c) => c.date === iso);
                const bookingsHere = BOOKINGS.filter((b) =>
                  isInRange(date, b)
                );
                const isCheckIn = BOOKINGS.some((b) =>
                  isCheckInDay(date, b)
                );

                let bg = "bg-white dark:bg-neutral-900";
                let textColor = "text-neutral-700 dark:text-neutral-300";
                let label = "";

                if (serviceDay) {
                  bg = serviceDay.urgent
                    ? "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800"
                    : "bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-800";
                  label = "🧹";
                } else if (bookingsHere.length > 0) {
                  bg = "bg-blue-50 dark:bg-blue-950/40";
                  if (isCheckIn) label = "↓";
                }

                return (
                  <div
                    key={i}
                    className={`min-h-[44px] sm:min-h-[72px] rounded-md sm:rounded-lg border border-neutral-200 dark:border-neutral-800 p-1 sm:p-1.5 ${bg} ${textColor} text-[11px] sm:text-xs overflow-hidden`}
                  >
                    <div className="font-medium leading-tight">{date.getDate()}</div>
                    {label && (
                      <div className="text-xs sm:text-sm leading-none mt-0.5">{label}</div>
                    )}
                    {bookingsHere.length > 0 && (
                      <div className="text-[8px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                        {bookingsHere[0].guest.split(" ")[0]}
                      </div>
                    )}
                    {serviceDay && (
                      <div
                        className={`text-[8px] sm:text-[10px] mt-0.5 font-medium leading-tight ${
                          serviceDay.urgent
                            ? "text-red-600 dark:text-red-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <span className="sm:hidden">!</span>
                        <span className="hidden sm:inline">
                          {serviceDay.urgent ? "URGENT" : "Service"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900" />
                Booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800" />
                🧹 Service needed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800" />
                Same-day turnaround
              </span>
            </div>

            {/* Service schedule summary */}
            <ServiceSchedule serviceDays={serviceDays} />
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="space-y-5 sm:space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-3">Bookings</h2>
              <div className="space-y-3">
                {BOOKINGS.map((b, i) => {
                  const service = serviceDays[i];
                  const src = SOURCE_STYLES[b.source];
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 sm:p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium truncate">{b.guest}</p>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium shrink-0 ${src.bg} ${src.text}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${src.dot}`} />
                              {src.label}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}
                          </p>
                          <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                            {b.nights} nights · {b.guests}
                          </p>
                        </div>
                      </div>
                      {service && (
                        <div
                          className={`mt-3 flex items-start gap-2 rounded-lg p-2.5 text-xs sm:text-sm ${
                            service.urgent
                              ? "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                              : "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300"
                          }`}
                        >
                          <span>🧹</span>
                          <div>
                            <p className="font-medium">
                              Service on {fmtDate(service.date)}
                              {service.urgent && " ⚠️"}
                            </p>
                            <p className="text-[11px] sm:text-xs opacity-80 mt-0.5">
                              {service.reason}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <ServiceSchedule serviceDays={serviceDays} />
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceSchedule({ serviceDays }: { serviceDays: ServiceDay[] }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 sm:p-4">
      <h3 className="text-sm sm:text-base font-semibold mb-3 flex items-center gap-2">
        🧹 Service Schedule
      </h3>
      <div className="space-y-1">
        {serviceDays.map((c, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-2 border-b last:border-0 border-neutral-100 dark:border-neutral-800"
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                c.urgent ? "bg-red-500" : "bg-amber-500"
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium">{fmtDate(c.date)}</p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                After {c.guest} checks out — prepare for next arrival
              </p>
              <p
                className={`text-[11px] sm:text-xs mt-0.5 ${
                  c.urgent
                    ? "text-red-500 font-medium"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {c.reason}
                {c.urgent && " ⚠️"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

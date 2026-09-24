"use client";

import { useEffect, useState } from "react";
import { toEthiopianDate, type EthiopianDate } from "@/lib/ethiopianCalendar";
import { toGeezNumeral } from "@/lib/geez";

export default function EthiopianDateBadge() {
  const [date, setDate] = useState<EthiopianDate | null>(null);

  useEffect(() => {
    setDate(toEthiopianDate(new Date()));
  }, []);

  if (!date) return null;

  const dayGeez = toGeezNumeral(date.day);

  return (
    <p
      className="font-mono text-[11px] text-paper-faint"
      suppressHydrationWarning
    >
      Today: {date.monthName} {dayGeez ?? date.day}{" "}
      <span className="text-paper-faint/70">ዓ.ም (Ethiopian calendar)</span>
    </p>
  );
}

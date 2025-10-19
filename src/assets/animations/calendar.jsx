"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export function Calendar({
  className,
  selected,
  onSelect,
  initialFocus,
  mode = "single",
  ...props
}) {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      className={cn("rounded-md border bg-white p-3 shadow", className)}
      initialFocus={initialFocus}
      {...props}
    />
  );
}

export function DatePicker({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        >
          {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="ml-2 h-4 w-4 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

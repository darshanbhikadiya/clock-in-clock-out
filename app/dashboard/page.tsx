"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleClockInOut = () => {
    if (!isClockedIn) {
      setClockInTime(new Date());
    }
    setIsClockedIn(!isClockedIn);
  };

  const isLateClockIn = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return hours > 9 || (hours === 9 && minutes > 0);
  };

  return (
    <div className="p-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, John Doe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatTime(currentTime)} (IST)
            </div>
            <Button
              onClick={handleClockInOut}
              className="mt-4"
              variant={isClockedIn ? "destructive" : "default"}
            >
              {isClockedIn ? "Clock Out" : "Clock In"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Late Time</TableHead>
                  <TableHead>Early Leave</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clockInTime && (
                  <TableRow>
                    <TableCell>
                      {clockInTime.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatTime(clockInTime)}</TableCell>
                    <TableCell>
                      {isClockedIn ? "-" : formatTime(new Date())}
                    </TableCell>
                    <TableCell>
                      {isLateClockIn(clockInTime) ? "Late" : "-"}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
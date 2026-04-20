const LIVE_ATTENDANCE_AUTH_KEY = "mitreka_mock_auth";

export function isLiveAttendanceAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LIVE_ATTENDANCE_AUTH_KEY) === "1";
}

export function setLiveAttendanceAuthenticated(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIVE_ATTENDANCE_AUTH_KEY, "1");
}

export function clearLiveAttendanceAuthenticated(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LIVE_ATTENDANCE_AUTH_KEY);
}

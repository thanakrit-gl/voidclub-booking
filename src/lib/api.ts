export const DOGET_URL =
  "https://script.google.com/macros/s/AKfycbyADvu608q70h3XrnisyvyJPTz0RezjxslEs2bVeuvRrmFpJCwI8TFuM8CjsAbAFeNxPA/exec";

export const DOPOST_URL = DOGET_URL;

// 🗓️ 2) TEMP: hardcode event date for now (must match sheet "date" column)
const EVENT_DATE = "2025-12-01"; // same format as your sheet first column

// 3) Fetch seat statuses from Google Sheets FOR THAT DATE
export async function fetchSeats() {
  const params = new URLSearchParams({
    date: EVENT_DATE,
    t: Date.now().toString(), // cache bust
  });

  const res = await fetch(`${DOGET_URL}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch seats");
  return res.json() as Promise<{
    marked: { id: string; status: "booked" | "paid" }[];
  }>;
}

// 4) Book a seat for that same date
export async function bookSeat(
  table_id: string,
  book_under_name: string
) {
  const payload = JSON.stringify({
    table_id,
    book_under_name,
    date: EVENT_DATE,
  });

  const res = await fetch(DOPOST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8", // avoid CORS preflight
    },
    body: payload,
    redirect: "follow",
  });

  if (!res.ok) throw new Error("Booking failed");
  return res.text();
}



// Book a seat (LINE-style)
// export async function bookSeat(table_id: string, book_under_name: string) {
//   const res = await fetch(DOPOST_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ table_id, book_under_name }),
//   });
//   if (!res.ok) throw new Error("Booking failed");
//   return res.text();
// }
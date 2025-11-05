export const DOGET_URL =
  "https://script.google.com/macros/s/AKfycbyMuBRWONkopAMDybZs3y0s9qG7chlpp4aLjH7O5dF7TY2_r5z6s_TnXhp6fXsnsJLEuw/exec";

export const DOPOST_URL = DOGET_URL;

// Fetch seat statuses from Google Sheets
export async function fetchSeats() {
  const res = await fetch(`${DOGET_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch seats");
  return res.json() as Promise<{ marked: { id: string; status: "booked"|"paid" }[] }>;
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

export async function bookSeat(table_id: string, book_under_name: string) {
  const payload = JSON.stringify({ table_id, book_under_name });

  const res = await fetch(DOPOST_URL, {
    method: "POST",
    headers: {
      // 👇 This avoids CORS preflight (critical)
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: payload,
    redirect: "follow", // 👈 required for GAS
  });

  if (!res.ok) throw new Error("Booking failed");
  return res.text();
}
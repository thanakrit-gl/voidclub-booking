export const DOGET_URL =
  "https://script.google.com/macros/s/AKfycbyADvu608q70h3XrnisyvyJPTz0RezjxslEs2bVeuvRrmFpJCwI8TFuM8CjsAbAFeNxPA/exec";

export const DOPOST_URL = DOGET_URL;

// 1) Fetch seats for the selected date
export async function fetchSeats(date: string) {
  const params = new URLSearchParams({
    date,
    t: Date.now().toString(),
  }); 

  const res = await fetch(`${DOGET_URL}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch seats");

  const json = await res.json();

  return {
    marked: json.marked,
    noData: json.marked.length === 0,  // <-- IMPORTANT
  };
}

// 2) Book seat for selected date
export async function bookSeat(
  table_id: string,
  book_under_name: string,
  date: string
) {
  const payload = JSON.stringify({
    table_id,
    book_under_name,
    date,
  });

  const res = await fetch(DOPOST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
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
import liff from "@line/liff";

let liffInitialized = false;

export async function initLiff() {
  if (liffInitialized) return liff; // prevent double init

  try {
    await liff.init({
      liffId: process.env.NEXT_PUBLIC_LIFF_ID!, // ← you will set this later
    });

    liffInitialized = true;
    return liff;
  } catch (err) {
    console.error("LIFF init failed:", err);
    throw err;
  }
}
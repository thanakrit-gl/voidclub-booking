export function getMinimumSpend(id: string): number {
  if (id.startsWith("VA")) return 50000; // VVIP Attic
  if (id.startsWith("VC")) return 35000; // VVIP Center
  if (id.startsWith("VB")) return 25000; // VVIP Balcony
  if (id.startsWith("V"))  return 20000; // VIP (V1–V14)
  return 4000; // High tables T1–T32
}

export function getDeposit(id: string): number {
  return Math.round(getMinimumSpend(id) * 0.2); // 20% deposit
}
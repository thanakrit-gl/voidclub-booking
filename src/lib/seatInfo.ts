export const seatInfo: Record<string, { zone: string; price: number }> = {
  // VVIP Center
  VC1:{zone:"VVIP Center",price:35000}, VC2:{zone:"VVIP Center",price:35000},

  // VVIP Balcony
  VB1:{zone:"VVIP Balcony",price:25000}, VB2:{zone:"VVIP Balcony",price:25000},
  VB3:{zone:"VVIP Balcony",price:25000}, VB4:{zone:"VVIP Balcony",price:25000},
  VB5:{zone:"VVIP Balcony",price:25000}, VB6:{zone:"VVIP Balcony",price:25000},

  // VIP Walls
  V1:{zone:"VIP Zone",price:20000}, V2:{zone:"VIP Zone",price:20000},
  V3:{zone:"VIP Zone",price:20000}, V4:{zone:"VIP Zone",price:20000},
  V5:{zone:"VIP Zone",price:20000}, V6:{zone:"VIP Zone",price:20000},
  V7:{zone:"VIP Zone",price:20000}, V8:{zone:"VIP Zone",price:20000},
  V9:{zone:"VIP Zone",price:20000}, V10:{zone:"VIP Zone",price:20000},
  V11:{zone:"VIP Zone",price:20000}, V12:{zone:"VIP Zone",price:20000},
  V13:{zone:"VIP Zone",price:20000}, V14:{zone:"VIP Zone",price:20000},

  // Attic
  VA1:{zone:"VVIP Attic",price:50000}, VA2:{zone:"VVIP Attic",price:50000},
  VA3:{zone:"VVIP Attic",price:50000}, VA4:{zone:"VVIP Attic",price:50000},
};

// Main floor
for (let i=1;i<=32;i++){
  seatInfo[i] = seatInfo[i] ?? {zone:"Main Floor",price:4000};
}
"use client";

export default function Legend() {
  const items = [
    { label: "HIGH TABLE",   price: 4000,  className: "border-purple-400 text-purple-300 bg-purple-900/15" },
    { label: "VIP ZONE",     price: 20000, className: "border-[#66e8ff] text-[#b8faff] bg-[#66e8ff]/10" }, // cyan/aqua
    { label: "VVIP BALCONY", price: 25000, className: "border-sky-300 text-sky-200 bg-sky-900/15" },       // bright light blue
    { label: "VVIP CENTER",  price: 35000, className: "border-yellow-300 text-yellow-200 bg-yellow-900/20" },
    { label: "VVIP ATTIC",   price: 50000, className: "border-[#4dff9a] text-[#4dffcc] bg-[#4dff9a]/12" }, // neon green
  ];

  return (
    <div className="absolute left-2 top-120 -translate-y-1/2 z-[30] flex flex-col gap-3 pointer-events-none">
      {items.map((item) => (
        <div
          key={item.label}
          className={`
            w-[120px] px-3 py-3
            rounded-md backdrop-blur-md 
            border shadow-[0_0_10px_rgba(255,255,255,0.1)]
            ${item.className}
            flex flex-col text-left
          `}
        >
          <span className="text-xs tracking-widest font-semibold uppercase">
            {item.label}
          </span>

          <span className="text-lg font-bold leading-tight text-white">
            {item.price.toLocaleString()}<span className="text-sm ml-1">THB</span>
          </span>

          <span className="text-[10px] text-white/60 tracking-wide uppercase">
            Min Spending
          </span>
        </div>
      ))}
    </div>
  );
}
const points = [
  { big: "24×7", small: "Guest Assistance" },
  { big: "Family", small: "Friendly Stay" },
  { big: "Comfortable", small: "AC Rooms" },
  { big: "Nanakheda", small: "Ujjain" },
];

/** Deliberately light: a single ruled row, not four cards (guide §12). */
export function TrustStrip() {
  return (
    <section aria-label="Why guests choose Aariva" className="container-wide">
      <ul className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {points.map((p, i) => (
          <li
            key={p.big}
            className={[
              "reveal flex flex-col items-center gap-1 px-4 py-7 text-center",
              i % 2 === 1 ? "border-l border-line" : "",
              i >= 2 ? "border-t border-line md:border-t-0" : "",
              i === 2 ? "md:border-l" : "",
            ].join(" ")}
          >
            <span className="text-2xl font-medium text-maroon md:text-4xl">{p.big}</span>
            <span className="text-sm text-ink-muted">{p.small}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

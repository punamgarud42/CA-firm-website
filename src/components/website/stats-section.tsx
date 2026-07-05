"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 1000, suffix: "+", label: "Happy Clients", description: "Businesses served across India" },
  { number: 15, suffix: "+", label: "Years Experience", description: "Expert CA knowledge" },
  { number: 500, suffix: "Cr+", prefix: "₹", label: "Transactions Managed", description: "Annual transaction value" },
  { number: 98, suffix: "%", label: "Client Retention", description: "Clients who stay with us" },
  { number: 50, suffix: "+", label: "CA Professionals", description: "Qualified team members" },
  { number: 10000, suffix: "+", label: "Returns Filed", description: "Tax & compliance filings" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function StatItem({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.number, 2000, animate);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-[#0F172A] mb-2">
        {stat.prefix ?? ""}{animate ? count.toLocaleString("en-IN") : 0}{stat.suffix}
      </div>
      <div className="font-semibold text-slate-800 text-lg">{stat.label}</div>
      <div className="text-sm text-slate-500 mt-1">{stat.description}</div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={i < 5 ? "border-r-0 md:border-r border-slate-100 pr-4" : ""}>
              <StatItem stat={stat} animate={animate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

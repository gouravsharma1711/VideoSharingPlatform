import React, { useEffect, useRef, useState } from "react";

const StatCard = ({
  icon,
  title,
  value,
  gradient = "from-purple-600 to-blue-600",
  iconBg = "bg-purple-500/20",
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setHighlight(true); 
      let start = prevValue.current;
      let end = value;
      let duration = 700;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        setDisplayValue(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
          prevValue.current = end;
          setTimeout(() => setHighlight(false), 400);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value]);

  return (
    <div
      className={`group bg-slate-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl 
        hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`${iconBg} p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300`}
        >
          <div
            className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p
            className={`
              text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent 
              transition-all duration-300
              ${highlight ? "animate-pulse scale-110 text-yellow-300" : ""}
            `}
            style={{
              transition: "transform 0.3s, color 0.3s",
            }}
          >
            {displayValue.toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className={`mt-4 h-1 bg-gradient-to-r ${gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </div>
  );
};

export default StatCard;

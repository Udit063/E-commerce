//@ts-nocheck
import { useEffect, useState } from "react";
import "./BackendNotice.css";

const BackendNotice = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex max-w-[260px] items-center gap-2 rounded-lg bg-slate-800/95 px-3.5 py-2.5 text-sm leading-snug text-slate-100 shadow-lg backend-notice-in"
      role="status"
      aria-live="polite"
    >
      <span className="shrink-0 text-base">⏳</span>
      <p className="m-0">
        Backend is on a free tier — responses may be slower.
      </p>
    </div>
  );
};

export default BackendNotice;

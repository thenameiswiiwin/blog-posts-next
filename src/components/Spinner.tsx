import clsx from "clsx";
import type { CSSProperties } from "react";

const rings = [
  { spacing: "0", order: "5", delay: "4" },
  { spacing: "1", order: "4", delay: "3" },
  { spacing: "2", order: "3", delay: "2" },
  { spacing: "3", order: "2", delay: "1" },
  { spacing: "4", order: "1", delay: "0" },
] as const;

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-16 w-16">
        {rings.map((ring) => (
          <div
            key={ring.order}
            style={
              {
                "--ring-spacing": ring.spacing,
                "--ring-index": ring.order,
                "--i": ring.delay,
              } as CSSProperties
            }
            className={clsx(
              "animation-delay absolute left-ring-tl top-ring-tl z-[var(--ring-index)] h-ring-hw w-ring-hw animate-spinning rounded-full border-[calc(65px_*_0.05)] border-l-green-500 border-t-green-500"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

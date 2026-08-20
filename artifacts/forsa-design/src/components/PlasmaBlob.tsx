import { useEffect, useId, useRef } from "react";

interface PlasmaBlobProps {
  className?: string;
  children?: React.ReactNode;
}

const POINTS = 12;
const BASE_RADIUS = 0.42;
const IRREGULARITY = 0.05;
const IDLE_AMPLITUDE = 0.035;
const TOUCH_ANGLE_RADIUS = 1.1;
const TOUCH_STRENGTH = 0.7;
const SPRING = 0.12;
const MIN_RADIUS = 0.18;
const MAX_RADIUS = 0.62;

interface Vec2 {
  x: number;
  y: number;
}

/** Smooth closed spline through the given points (Catmull-Rom -> cubic Bezier). */
function closedSplinePath(points: Vec2[]): string {
  const n = points.length;
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y} `;
  }
  return d + "Z";
}

/**
 * Wraps its children in a container clipped to an organic, continuously
 * morphing blob shape. Moving a pointer (mouse hover or a finger on touch
 * devices) over the shape pushes the nearest edge outward or inward,
 * like pressing into soft plasma.
 */
export default function PlasmaBlob({ className, children }: PlasmaBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipId = `plasma-blob-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const angles = Array.from({ length: POINTS }, (_, i) => (i / POINTS) * Math.PI * 2);
    const seedOffsets = angles.map(() => (Math.random() * 2 - 1) * IRREGULARITY);
    const phases = angles.map(() => Math.random() * Math.PI * 2);
    const speeds = angles.map(() => 0.2 + Math.random() * 0.25);
    const radii = angles.map((_, i) => BASE_RADIUS + seedOffsets[i]);

    let pointer: { angle: number; dist: number } | null = null;
    let rafId = 0;
    const start = performance.now();

    const setPointerFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      pointer = { angle: Math.atan2(y, x), dist: Math.min(0.9, Math.hypot(x, y)) };
    };
    const clearPointer = () => {
      pointer = null;
    };
    const onPointerMove = (e: PointerEvent) => setPointerFromClient(e.clientX, e.clientY);

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", clearPointer);
    container.addEventListener("pointerup", clearPointer);
    container.addEventListener("pointercancel", clearPointer);

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      for (let i = 0; i < POINTS; i++) {
        let target = BASE_RADIUS + seedOffsets[i];
        if (!reduceMotion) {
          target += Math.sin(t * speeds[i] + phases[i]) * IDLE_AMPLITUDE;
        }
        if (pointer) {
          let angularDist = Math.abs(angles[i] - pointer.angle);
          if (angularDist > Math.PI) angularDist = Math.PI * 2 - angularDist;
          if (angularDist < TOUCH_ANGLE_RADIUS) {
            const falloff = 1 - angularDist / TOUCH_ANGLE_RADIUS;
            target += (pointer.dist - BASE_RADIUS) * TOUCH_STRENGTH * falloff;
          }
        }
        target = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, target));
        const springRate = reduceMotion && !pointer ? 1 : SPRING;
        radii[i] += (target - radii[i]) * springRate;
      }

      const points = angles.map((angle, i) => ({
        x: 0.5 + Math.cos(angle) * radii[i],
        y: 0.5 + Math.sin(angle) * radii[i],
      }));
      path.setAttribute("d", closedSplinePath(points));

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", clearPointer);
      container.removeEventListener("pointerup", clearPointer);
      container.removeEventListener("pointercancel", clearPointer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ clipPath: `url(#${clipId})`, touchAction: "none" }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path ref={pathRef} />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
}

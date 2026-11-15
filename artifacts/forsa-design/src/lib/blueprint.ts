type Point = [number, number];
type Edge = { a: Point; b: Point; begin: number; duration: number };
type Network = { points: Point[]; arrivals: number[]; edges: Edge[]; period: number; seed: number };
export type BlueprintController = { setPaused: (paused: boolean) => void; dispose: () => void };

const STEP = 40;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function networksFor(width: number, top: number, height: number): Network[] {
  const left = Math.ceil((14 - width / 2) / STEP);
  const right = Math.floor((width - 14 - width / 2) / STEP);
  const x = (fraction: number) =>
    width / 2 + clamp(Math.round((fraction * width - width / 2) / STEP), left, right) * STEP;
  const networks: Network[] = [];
  const firstRow = Math.max(0, Math.floor((top - 240 - 80) / 320));
  const finalRow = Math.ceil((top + height + 80) / 320);
  for (let row = firstRow; row <= finalRow; row++) {
    for (const mirror of [false, true]) {
      const xx = (fraction: number) => x(mirror ? 1 - fraction : fraction);
      const originY = 80 + row * 320 + (mirror ? 40 : 0);
      const points: Point[] = [
        [xx(0.06), originY],
        [xx(0.18), originY],
        [xx(0.18), originY + 80],
        [xx(0.3), originY + 80],
        [xx(0.3), originY + 160],
        [xx(0.44), originY + 160],
        [xx(0.08), originY + 80],
        [xx(0.08), originY + 160],
      ];
      const arrivals = [0];
      const edges: Edge[] = [];
      for (const [from, to] of [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [2, 6],
        [6, 7],
      ]) {
        const a = points[from];
        const b = points[to];
        const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const begin = (arrivals[from] || 0) + (from === 2 && to === 6 ? 0.3 : 0.1);
        const duration = length / 105;
        arrivals[to] = begin + duration;
        if (length > 0) edges.push({ a, b, begin, duration });
      }
      networks.push({
        points,
        arrivals,
        edges,
        period: Math.max(...arrivals) + 5.2,
        seed: (row * 2 + Number(mirror)) * 1.71 + 0.5,
      });
    }
  }
  return networks;
}

export function mountBlueprint(
  canvas: HTMLCanvasElement,
  initialPaused: boolean,
): BlueprintController {
  const context = canvas.getContext("2d");
  if (!context) return { setPaused: () => {}, dispose: () => {} };
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const frameInterval = coarsePointer ? 50 : 33;
  const glow = document.createElement("canvas");
  glow.width = 32;
  glow.height = 32;
  const glowContext = glow.getContext("2d");
  if (glowContext) {
    const halo = glowContext.createRadialGradient(16, 16, 0, 16, 16, 16);
    halo.addColorStop(0, "rgba(201,168,76,.5)");
    halo.addColorStop(0.35, "rgba(201,168,76,.16)");
    halo.addColorStop(1, "rgba(201,168,76,0)");
    glowContext.fillStyle = halo;
    glowContext.fillRect(0, 0, 32, 32);
  }
  let paused = initialPaused;
  let disposed = false;
  let width = 0;
  let height = 0;
  let top = window.scrollY;
  let zone = -1;
  let networks: Network[] = [];
  let clock = 0;
  let previous = 0;
  let lastDraw = 0;
  let frame = 0;
  let watchdog = 0;
  let scrollFrame = 0;
  const primary =
    getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "43 58% 54%";
  const gold = `hsl(${primary})`;
  const fadeAt = (x: number) =>
    0.26 + 0.74 * Math.pow(Math.min(1, Math.abs(x - width / 2) / (width / 2)), 0.7);

  function updateNetworks() {
    top = window.scrollY;
    const next = Math.floor(top / 320);
    if (next !== zone) {
      zone = next;
      networks = networksFor(width, top, height);
    }
  }

  function line(a: Point, b: Point, alpha: number, color: string | CanvasGradient, lineWidth = 1) {
    if (!context) return;
    context.beginPath();
    context.moveTo(a[0], a[1] - top);
    context.lineTo(b[0], b[1] - top);
    context.strokeStyle = color;
    context.globalAlpha = alpha * 0.85 * fadeAt((a[0] + b[0]) / 2);
    context.lineWidth = lineWidth;
    context.stroke();
  }

  function draw() {
    if (!context || disposed || !width || !height) return;
    updateNetworks();
    context.clearRect(0, 0, width, height);
    context.lineCap = "round";
    for (const net of networks) {
      const age = (clock + net.seed) % net.period;
      for (const edge of net.edges) {
        if (
          Math.max(edge.a[1], edge.b[1]) < top - 20 ||
          Math.min(edge.a[1], edge.b[1]) > top + height + 20
        )
          continue;
        const t = (age - edge.begin) / Math.max(edge.duration, 0.001);
        if (t < 0) continue;
        const progress = clamp(t, 0, 1);
        const end: Point = [
          edge.a[0] + (edge.b[0] - edge.a[0]) * progress,
          edge.a[1] + (edge.b[1] - edge.a[1]) * progress,
        ];
        const decay = Math.exp(-Math.max(0, age - edge.begin - edge.duration) / 2.3);
        context.shadowBlur = 0;
        line(edge.a, end, 0.5 * decay, gold);
        if (t <= 1) {
          const length = Math.hypot(end[0] - edge.a[0], end[1] - edge.a[1]);
          const fraction = Math.max(0, 1 - 42 / Math.max(length, 1));
          const tail: Point = [
            edge.a[0] + (end[0] - edge.a[0]) * fraction,
            edge.a[1] + (end[1] - edge.a[1]) * fraction,
          ];
          const gradient = context.createLinearGradient(
            tail[0],
            tail[1] - top,
            end[0] + 0.001,
            end[1] - top + 0.001,
          );
          gradient.addColorStop(0, "rgba(201,168,76,0)");
          gradient.addColorStop(1, "#ffeab2");

          line(tail, end, 0.95, gradient, 1.6);
          context.beginPath();
          context.arc(end[0], end[1] - top, 1.65, 0, Math.PI * 2);
          context.fillStyle = "#fff2ce";
          context.globalAlpha = 0.95 * 0.85 * fadeAt(end[0]);
          context.drawImage(glow, end[0] - 16, end[1] - top - 16);
          context.fill();
        }
      }
      net.points.forEach((point, index) => {
        if (point[1] < top - 16 || point[1] > top + height + 16) return;
        const since = age - net.arrivals[index];
        if (since < 0) return;
        const strength = Math.exp(-since / 1.7) * 0.85 * fadeAt(point[0]);

        context.globalAlpha = strength;
        context.fillStyle = "#f4d98b";
        context.drawImage(glow, point[0] - 16, point[1] - top - 16);
        context.beginPath();
        context.arc(point[0], point[1] - top, 2, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        if (since < 1.3) {
          context.globalAlpha = strength * (1 - since / 1.3) * 0.7;
          context.strokeStyle = "#e9c875";
          context.lineWidth = 0.7;
          context.beginPath();
          context.arc(point[0], point[1] - top, 3 + since * 7, 0, Math.PI * 2);
          context.stroke();
        }
      });
    }
    context.globalAlpha = 1;
    context.shadowBlur = 0;
  }

  function stop() {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(watchdog);
  }

  function schedule() {
    frame = window.requestAnimationFrame(tick);
    // WebKit can defer canvas-only frames until interaction; keep a bounded fallback.
    watchdog = window.setTimeout(() => {
      window.cancelAnimationFrame(frame);
      tick(performance.now());
    }, 45);
  }

  function tick(time: number) {
    window.clearTimeout(watchdog);
    if (disposed || paused || document.hidden) return;
    if (previous) clock += Math.min((time - previous) / 1000, 0.05);
    previous = time;
    if (time - lastDraw >= frameInterval) {
      draw();
      lastDraw = time;
    }
    schedule();
  }

  function resume() {
    stop();
    previous = 0;
    if (!paused && !document.hidden && !disposed) schedule();
  }

  function resize() {
    if (!context || disposed) return;
    width = document.documentElement.clientWidth;
    height = canvas.getBoundingClientRect().height;
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      coarsePointer ? 1 : 1.5,
      Math.sqrt(1500000 / Math.max(1, width * height)),
    );
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    zone = -1;
    draw();
  }

  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      // Frozen signals stay attached to the document while the user scrolls.
      if (paused) draw();
    });
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", resume);
  resize();
  resume();

  return {
    setPaused(value) {
      paused = value;
      resume();
    },
    dispose() {
      disposed = true;
      stop();
      window.cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", resume);
      context.clearRect(0, 0, width, height);
    },
  };
}

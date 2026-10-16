// Procedural comic art (Ben Day dots, Kirby crackle). Each generator returns one SVG path `d`.
// Seeded, so server rendering is deterministic and matches the Figma design.

type Pt = [number, number];
type Rnd = () => number;

function mulberry32(a: number): Rnd {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

function circle(cx: number, cy: number, r: number) {
  r = f(r);
  if (r <= 0) return "";
  return `M${f(cx - r)},${f(cy)}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
}

export type BenDayOpts = {
  width: number;
  height: number;
  spacing: number;
  maxR: number;
  minR: number;
  origin: { x: number; y: number };
  falloff: number;
};

// 45° halftone screen whose dots shrink with distance from `origin`.
export function benDay({ width: W, height: H, spacing: s, maxR, minR, origin, falloff }: BenDayOpts) {
  let d = "";
  let count = 0;
  const h = s / Math.SQRT2;
  const n = Math.ceil((W + H) / s) + 2;
  for (let i = -n; i <= n && count < 1500; i++) {
    for (let j = -n; j <= n; j++) {
      const x = (i - j) * h + W / 2;
      const y = (i + j) * h + H / 2;
      if (x < 0 || y < 0 || x > W || y > H) continue;
      const t = Math.hypot(x - origin.x, y - origin.y) / falloff;
      if (t >= 1) continue;
      const r = maxR + (minR - maxR) * t;
      if (r < minR) continue;
      d += circle(x, y, r);
      if (++count >= 1500) break;
    }
  }
  return d;
}

function blob(rnd: Rnd, cx: number, cy: number, r: number, rot: number, stretch: number) {
  const n = 6 + Math.floor(rnd() * 2);
  const pts: Pt[] = [];
  for (let k = 0; k < n; k++) {
    const a = rot - (k / n) * Math.PI * 2 + (rnd() - 0.5) * 0.3;
    const rr = r * (0.88 + rnd() * 0.24);
    const ex = Math.cos(a - rot) * rr * stretch;
    const ey = Math.sin(a - rot) * rr;
    pts.push([cx + ex * Math.cos(rot) - ey * Math.sin(rot), cy + ex * Math.sin(rot) + ey * Math.cos(rot)]);
  }
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let k = 0; k < n; k++) {
    const p0 = pts[(k + n - 1) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + "Z";
}

// One crackle cluster: a big wobbly blob, satellites decaying outward along `dir`, dots and specks.
function cluster(rnd: Rnd, cx: number, cy: number, R: number, dir: number, k = 1) {
  let d = blob(rnd, cx, cy, R, dir, 1.12);
  const nm = 3 + Math.floor(rnd() * 4);
  for (let i = 0; i < nm; i++) {
    const a = dir + (rnd() - 0.5) * 3.2;
    const dist = R * (1.3 + rnd() * 1.6) * k;
    const r = R * (0.5 - (dist / R - 1.3) * 0.14) * (0.6 + rnd() * 0.5);
    d += blob(rnd, cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, Math.max(r, R * 0.14), a, 1.05);
  }
  const nd = 4 + Math.floor(rnd() * 5);
  for (let i = 0; i < nd; i++) {
    const a = rnd() * 6.283;
    const dist = R * (1.8 + rnd() * 2.4) * k;
    const r = R * (0.1 + rnd() * 0.16) * (1 - (dist / R - 1.8) * 0.12);
    d += circle(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, Math.max(r, 1.2));
  }
  const ns = 6 + Math.floor(rnd() * 8);
  for (let i = 0; i < ns; i++) {
    const a = rnd() * 6.283;
    const dist = R * (1.4 + rnd() * 3.6) * k;
    d += circle(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 0.7 + rnd() * 1.0);
  }
  return d;
}

export type RingOpts = {
  width: number;
  height: number;
  seed: number;
  count: number;
  minSize: number;
  maxSize: number;
  radiusX: number;
  radiusY: number;
  thickness: number;
  heavyAngle: number;
};

// Crackle clusters around an ellipse, heavier toward `heavyAngle`.
export function crackleRing(o: RingOpts) {
  const rnd = mulberry32(o.seed);
  const cx = o.width / 2, cy = o.height / 2;
  const placed: [number, number, number][] = [];
  let d = "";
  for (let i = 0; i < o.count; i++) {
    for (let tries = 0; tries < 8; tries++) {
      const t = (i / o.count) * 6.283 + (rnd() - 0.5) * 0.5;
      const w = 0.5 + 0.5 * Math.cos(t - o.heavyAngle);
      const off = (rnd() - 0.5) * o.thickness * (0.6 + w * 0.6);
      const px = cx + Math.cos(t) * (o.radiusX + off);
      const py = cy + Math.sin(t) * (o.radiusY + off);
      const R = (o.minSize + (o.maxSize - o.minSize) * (0.55 + rnd() * 0.45)) * (0.6 + w);
      if (placed.some(([qx, qy, qr]) => Math.hypot(qx - px, qy - py) < (qr + R) * 1.9)) continue;
      placed.push([px, py, R]);
      d += cluster(rnd, px, py, R, t + (rnd() - 0.5) * 1.2 + 1.2);
      break;
    }
  }
  return d;
}

export type StreamOpts = {
  seed: number;
  points: Pt[];
  count: number;
  sizeStart: number;
  sizeEnd: number;
  spread: number;
};

// Crackle erupting along a path: big at the source, shrinking and spreading as it trails away.
export function crackleStream(o: StreamOpts) {
  const rnd = mulberry32(o.seed);
  const P = o.points;
  const L = [0];
  for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const tot = L[L.length - 1];
  const placed: [number, number, number][] = [];
  let d = "";
  for (let c = 0; c < o.count; c++) {
    for (let tries = 0; tries < 6; tries++) {
      const u = Math.min(1, (c + rnd() * 0.9) / o.count);
      const s = u * tot;
      let seg = 1;
      while (seg < P.length - 1 && L[seg] < s) seg++;
      const a0 = P[seg - 1], a1 = P[seg];
      const fr = (s - L[seg - 1]) / (L[seg] - L[seg - 1] || 1);
      const ang = Math.atan2(a1[1] - a0[1], a1[0] - a0[0]);
      const R = (o.sizeStart + (o.sizeEnd - o.sizeStart) * u) * (0.7 + rnd() * 0.5);
      const off = (rnd() - 0.5) * o.spread * (0.4 + u);
      const x = a0[0] + (a1[0] - a0[0]) * fr + Math.cos(ang + 1.5708) * off;
      const y = a0[1] + (a1[1] - a0[1]) * fr + Math.sin(ang + 1.5708) * off;
      if (placed.some(([qx, qy, qr]) => Math.hypot(qx - x, qy - y) < (qr + R) * 1.5)) continue;
      placed.push([x, y, R]);
      d += cluster(rnd, x, y, R, ang + (rnd() - 0.5) * 0.8, 0.9);
      break;
    }
  }
  return d;
}

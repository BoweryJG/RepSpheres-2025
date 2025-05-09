import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";

const AnimatedOrbHeroBG = ({
  style = {},
  className = "",
  zIndex = 0,
  visible = true,
  sx = {},
  disperse = false,
}) => {
  // --- Interactive Orb Ripple/Jump State ---
  const [ripples, setRipples] = useState([]); // {cx, cy, r, color, width, opacity}
  const [orbJump, setOrbJump] = useState({}); // {orbIdx, dx, dy, t, active}
  const [hoveredOrb, setHoveredOrb] = useState(null);

  // Animate ripples
  useEffect(() => {
    if (!ripples.length) return;
    let raf;
    function animate() {
      setRipples(prev => prev
        .map(r => ({ ...r, r: r.r + 3, opacity: r.opacity * 0.93 }))
        .filter(r => r.opacity > 0.04)
      );
      if (ripples.length) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => raf && cancelAnimationFrame(raf);
  }, [ripples.length]);

  // Animation state: 'idle', 'dispersing', 'assembling'
  const [animState, setAnimState] = useState('idle');
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const prevDisperse = useRef(disperse);
  const disperseDirs = useRef([]); // {angle, dist}
  const assembleOffsets = useRef([]); // {x, y}
  const animationDuration = 700; // ms

  // Detect disperse prop change
  useEffect(() => {
    if (disperse !== prevDisperse.current) {
      if (disperse) {
        // Start dispersing
        disperseDirs.current = [];
        for (let i = 0; i < 6; i++) {
          disperseDirs.current.push({
            angle: Math.random() * 2 * Math.PI,
            dist: 180 + Math.random() * 120
          });
        }
        setAnimState('dispersing');
        setAnimProgress(0);
      } else {
        // Start assembling (from below viewport)
        assembleOffsets.current = [];
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
        for (let i = 0; i < 6; i++) {
          const xoff = (Math.random() - 0.5) * vw * 0.25;
          const yoff = vh * 0.5 + 80 + Math.random() * vh * 0.25;
          assembleOffsets.current.push({ x: xoff, y: yoff });
        }
        setAnimState('assembling');
        setAnimProgress(0);
      }
      prevDisperse.current = disperse;
    }
  }, [disperse]);

  // Animate dispersal/assembly
  useEffect(() => {
    if (animState === 'idle') return;
    let raf;
    const start = performance.now();
    function step() {
      const elapsed = performance.now() - start;
      let t = Math.min(1, elapsed / animationDuration);
      setAnimProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        if (animState === 'dispersing') setAnimState('idle');
        if (animState === 'assembling') setAnimState('idle');
      }
    }
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [animState]);
  const svgRef = useRef(null);
  const parentOrbRef = useRef(null);
  const childrenGroupRef = useRef(null);
  const particlesGroupRef = useRef(null);
  const particlesRef = useRef([]); // Particle state
  // --- Animation and Orb Logic ---
  useEffect(() => {
    if (!visible) return;
    let animationFrame;
    // --- Utility Functions ---
    function hslToHex(h, s, l) {
      h /= 360; s /= 100; l /= 100;
      let r, g, b;
      if (s === 0) { r = g = b = l; }
      else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      return "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
    }
    function lerpColor(a, b, t) {
      const ah = parseInt(a.replace('#', ''), 16), bh = parseInt(b.replace('#', ''), 16);
      const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
      const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
      const rr = Math.round(ar + (br - ar) * t);
      const rg = Math.round(ag + (bg - ag) * t);
      const rb = Math.round(ab + (bb - ab) * t);
      return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1);
    }
    function generateSuperSmoothBlob(cx, cy, r, points, t, amp = 1, phase = 0) {
      const pts = [];
      // Generate more points for ultra-smooth appearance
      for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 * i) / points;
        // Use gentler, lower-frequency variations with reduced amplitude
        // for a more naturally smooth spherical appearance
        const noise =
          Math.sin(angle * 2 + t * 0.4 + phase) * 1.8 * amp +
          Math.sin(angle * 3 - t * 0.5 + phase) * 1.2 * amp +
          Math.sin(angle * 5 + t * 0.7 + phase) * 0.5 * amp;
        const rad = r + noise;
        pts.push({
          x: cx + Math.cos(angle) * rad,
          y: cy + Math.sin(angle) * rad
        });
      }
      let d = "";
      for (let i = 0; i < points; i++) {
        const p0 = pts[(i - 1 + points) % points];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % points];
        const p3 = pts[(i + 2) % points];
        if (i === 0) {
          d += `M${p1.x.toFixed(2)},${p1.y.toFixed(2)}`;
        }
        // Use gentler control point positioning (1/3 instead of 1/6)
        // for smoother transitions between points
        const c1x = p1.x + (p2.x - p0.x) / 3;
        const c1y = p1.y + (p2.y - p0.y) / 3;
        const c2x = p2.x - (p3.x - p1.x) / 3;
        const c2y = p2.y - (p3.y - p1.y) / 3;
        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
      }
      d += "Z";
      return d;
    }
    // --- Orb State ---
    const childCount = 5;
    const parentRadius = 60; // Reduced to 60% of original size
    const childRadius = 22; // Proportionally reduced
    const parentPoints = 144; // Significantly increased for ultra-smooth parent orb
    const childPoints = [120, 128, 124, 132, 126]; // Significantly increased for ultra-smooth child orbs
    const parentAmp = 0.5; // Further reduced amplitude for more spherical shape
    const childAmps = [0.25, 0.28, 0.22, 0.26, 0.24]; // Further reduced amplitudes for smoother shapes
    const childGradIds = [
      "childGrad0", "childGrad1", "childGrad2", "childGrad3", "childGrad4"
    ];
    // Morph personalities
    const orbMorphDirections = [Math.PI / 2];
    const orbMorphSpeeds = [0.012];
    for (let i = 0; i < childCount; i++) {
      const angle = Math.PI / 2 + (i - (childCount - 1) / 2) * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 12);
      orbMorphDirections.push(angle);
      orbMorphSpeeds.push(0.014 + i * 0.004 + Math.random() * 0.003);
    }
    const orbStates = [];
    function makeOrbState() {
      return { drag: 0, dragTarget: 0, dragV: 0, squash: 0, squashTarget: 0, squashV: 0, mouseDir: 0, mouseDirTarget: 0, mouseDirV: 0, wobble: 0, lastUpdate: performance.now() };
    }
    orbStates.push(makeOrbState());
    for (let i = 0; i < childCount; i++) orbStates.push(makeOrbState());
    // --- Particle System ---
    function emitParticles(x, y, color, count = 3) {
      for (let j = 0; j < count; j++) {
        let h = (Math.random() * 360);
        let s = 85 + Math.random() * 10;
        let l = 55 + Math.random() * 20;
        const particleColor = hslToHex(h, s, l);
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.4 + Math.random() * 0.7;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        particlesRef.current.push({
          x, y,
          vx, vy,
          r: 1.1 + Math.random() * 1.2,
          life: 0.6,
          decay: 0.025 + Math.random() * 0.015,
          color: particleColor,
          opacity: 0.45
        });
      }
    }
    // --- Animation Loop ---
    function animate() {
      const svg = svgRef.current;
      if (!svg) return;
      const now = performance.now();
      // Animate parent gradient
      const parentStops = [
        { id: "p0", phase: 0 },
        { id: "p1", phase: Math.PI * 0.5 },
        { id: "p2", phase: Math.PI },
        { id: "p3", phase: Math.PI * 1.5 }
      ];
      const baseHue = (now * 0.01) % 360;
      for (let i = 0; i < parentStops.length; i++) {
        const stop = parentStops[i];
        const hue = (baseHue + 60 * Math.sin(now * 0.00015 + stop.phase)) % 360;
        const sat = 80 + 10 * Math.sin(now * 0.0002 + stop.phase);
        const light = 60 + 10 * Math.cos(now * 0.00018 + stop.phase);
        const gradStop = svg.querySelector(`#${stop.id}`);
        if (gradStop) gradStop.setAttribute('stop-color', hslToHex(hue, sat, light));
      }
      // --- Parent Orb ---
      const parentState = orbStates[0];
      const parentMorphT = now * 0.0004;
      const parentDrag = parentState.drag;
      const parentAngle = orbMorphDirections[0];
      const parentDx = Math.cos(parentAngle) * parentDrag;
      const parentDy = Math.sin(parentAngle) * parentDrag;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let px = vw / 2 + Math.sin(now * 0.00011) * vw * 0.09 + Math.cos(now * 0.00007) * vw * 0.07;
      // Position the orb higher in the viewport (30% from top instead of 50%)
      let py = vh * 0.3 + Math.cos(now * 0.00009) * vh * 0.08 + Math.sin(now * 0.00016) * vh * 0.06;
      let parentOpacity = 0.95;
      if (animState === 'dispersing') {
        // Move outward along angle/dist
        const d = disperseDirs.current[0] || {angle: 0, dist: 250};
        px += Math.cos(d.angle) * d.dist * animProgress;
        py += Math.sin(d.angle) * d.dist * animProgress;
        parentOpacity = 0.95 * (1 - animProgress);
      } else if (animState === 'assembling') {
        // Start from below viewport
        const o = assembleOffsets.current[0] || {x: 0, y: vh * 0.8};
        px += o.x * (1 - animProgress);
        py += o.y * (1 - animProgress);
        parentOpacity = 0.95 * animProgress;
      }
      const parentR = parentRadius;
      const parentPath = generateSuperSmoothBlob(px + parentDx, py + parentDy, parentR, parentPoints, parentMorphT, parentAmp);
      if (parentOrbRef.current) {
        parentOrbRef.current.setAttribute('d', parentPath);
        parentOrbRef.current.setAttribute('opacity', parentOpacity);
      }
      // --- Children ---
      const childrenGroup = childrenGroupRef.current;
      if (childrenGroup) {
        // Clear previous children
        while (childrenGroup.firstChild) childrenGroup.removeChild(childrenGroup.firstChild);
        for (let i = 0; i < childCount; i++) {
          let childPx, childPy, childOpacity = 0.95;
          // Animate orbit as usual
          const baseAngle = (now * 0.00022 + i * (2 * Math.PI / childCount));
          // Use parentR, px, vw, vh from outer scope
          const minEdge = Math.min(
            px,
            vw - px,
            py,
            vh - py
          );
          const maxChildOrbit = Math.max(40, minEdge - parentR - childRadius - 16);
          const orbitPhase = now * (0.00012 + 0.00007 * i) + i * 1.13;
          const orbitWobble = Math.sin(orbitPhase) * 0.18 + Math.cos(orbitPhase * 0.7) * 0.09;
          const minOrbit = parentR + childRadius + 12;
          let rawOrbit = (parentR + 60 + (i * 0.71 + 1.4) * maxChildOrbit / childCount) * (0.7 + 0.23 * orbitWobble);
          const orbitRadius = Math.max(rawOrbit, minOrbit);
          const ellipseA = orbitRadius * 1.3 * (0.97 + 0.07 * Math.sin(now * 0.00013 + i));
          const ellipseB = orbitRadius * 1.1 * (0.97 + 0.07 * Math.cos(now * 0.00016 + i * 2));
          const angle = baseAngle + Math.sin(now * 0.00009 + i * 1.7) * 0.22;
          childPx = px + Math.cos(angle) * ellipseA;
          childPy = py + Math.sin(angle) * ellipseB;
          if (animState === 'dispersing') {
            // Move outward
            const d = disperseDirs.current[i+1] || {angle: 0, dist: 250};
            childPx += Math.cos(d.angle) * d.dist * animProgress;
            childPy += Math.sin(d.angle) * d.dist * animProgress;
            childOpacity = 0.95 * (1 - animProgress);
          } else if (animState === 'assembling') {
            // Start from below
            const o = assembleOffsets.current[i+1] || {x: 0, y: vh * 0.8};
            childPx += o.x * (1 - animProgress);
            childPy += o.y * (1 - animProgress);
            childOpacity = 0.95 * animProgress;
          }
          // Animate dynamic color family for each orb
          const fam = (() => {
            const baseHue = (i * 67 + now * 0.018) % 360;
            const hue2 = (baseHue + 40 + 20 * Math.sin(now * 0.0007 + i)) % 360;
            const sat = 80 + 10 * Math.sin(now * 0.0005 + i);
            const light1 = 60 + 10 * Math.cos(now * 0.0004 + i * 2);
            const light2 = 35 + 15 * Math.sin(now * 0.0006 + i * 3);
            return [hslToHex(baseHue, sat, light1), hslToHex(hue2, sat, light2)];
          })();
          const tcol = 0.5 + 0.5 * Math.sin(now * 0.0005 + i);
          const grad0 = svg.querySelector(`#c${i}s0`);
          const grad1 = svg.querySelector(`#c${i}s1`);
          if (grad0) grad0.setAttribute('stop-color', lerpColor(fam[0], fam[1], tcol));
          if (grad1) grad1.setAttribute('stop-color', lerpColor(fam[1], fam[0], tcol));
          const cR = childRadius;
          const cAmp = childAmps[i];
          const morphT = now * 0.0005 + i * 10;
          const childPath = generateSuperSmoothBlob(childPx, childPy, cR, childPoints[i], morphT, cAmp, i);
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", childPath);
          path.setAttribute("fill", `url(#${childGradIds[i]})`);
          path.setAttribute("opacity", childOpacity);
          childrenGroup.appendChild(path);
          // Particle emission logic (subtle, demo: emit 1 particle per frame from each child orb)
          emitParticles(childPx, childPy, lerpColor(fam[0], fam[1], tcol), 1);
        }
      }
      // --- Animate and Render Particles ---
      const particlesGroup = particlesGroupRef.current || svg.querySelector('#particles');
      if (particlesGroup) {
        // Animate
        let newParticles = [];
        particlesGroup.innerHTML = '';
        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.life -= p.decay;
          p.opacity = Math.max(0, p.life);
          if (p.life > 0) {
            const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circ.setAttribute("cx", p.x);
            circ.setAttribute("cy", p.y);
            circ.setAttribute("r", p.r * p.opacity);
            circ.setAttribute("fill", p.color);
            circ.setAttribute("opacity", p.opacity * 0.7);
            particlesGroup.appendChild(circ);
            newParticles.push(p);
          }
        }
        particlesRef.current = newParticles;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [visible]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        pointerEvents: "none",
        ...sx,
      }}
      style={style}
      className={className}
    >
      <svg
        ref={svgRef}
        width="100vw"
        height="100vh"
        style={{ display: "block", background: "transparent" }}
        viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1920} ${typeof window !== 'undefined' ? window.innerHeight : 1080}`}
      >
        <defs>
          <radialGradient id="parentGrad" cx="40%" cy="40%" r="80%">
            <stop id="p0" offset="0%" stopColor="#00E5FF" />
            <stop id="p1" offset="100%" stopColor="#5B3CFF" />
            <stop id="p2" offset="50%" stopColor="#00E5FF" />
            <stop id="p3" offset="75%" stopColor="#5B3CFF" />
          </radialGradient>
          <radialGradient id="childGrad0" cx="35%" cy="35%" r="80%">
            <stop id="c0s0" offset="0%" stopColor="#B3D8FF" />
            <stop id="c0s1" offset="100%" stopColor="#0A192F" />
          </radialGradient>
          <radialGradient id="childGrad1" cx="40%" cy="40%" r="75%">
            <stop id="c1s0" offset="0%" stopColor="#C6FFD9" />
            <stop id="c1s1" offset="100%" stopColor="#145A32" />
          </radialGradient>
          <radialGradient id="childGrad2" cx="30%" cy="30%" r="85%">
            <stop id="c2s0" offset="0%" stopColor="#FFB3C9" />
            <stop id="c2s1" offset="100%" stopColor="#7B1F3A" />
          </radialGradient>
          <radialGradient id="childGrad3" cx="35%" cy="35%" r="80%">
            <stop id="c3s0" offset="0%" stopColor="#E0D1FF" />
            <stop id="c3s1" offset="100%" stopColor="#311B4F" />
          </radialGradient>
          <radialGradient id="childGrad4" cx="40%" cy="40%" r="75%">
            <stop id="c4s0" offset="0%" stopColor="#FFF5B3" />
            <stop id="c4s1" offset="100%" stopColor="#4B3800" />
          </radialGradient>
        </defs>
        <g id="particles"></g>
        <path id="parentOrb" ref={parentOrbRef} fill="url(#parentGrad)" opacity="0.95" style={{ cursor: 'pointer', pointerEvents: 'all' }} />
        <g id="children" ref={childrenGroupRef}></g>
        {ripples.map((ripple, idx) => (
          <circle key={idx} cx={ripple.cx} cy={ripple.cy} r={ripple.r} fill="none" stroke={ripple.color} strokeWidth={ripple.width} opacity={ripple.opacity} />
        ))}
      </svg>
    </Box>
  );
};

export default AnimatedOrbHeroBG;

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function ChuckDemo({ lang }: { lang: "pl" | "en" }) {
  const host = useRef<HTMLDivElement>(null);
  const apply = useRef<(value: number) => void>(() => {});
  const reset = useRef<() => void>(() => {});
  const [amount, setAmount] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      const frame = window.requestAnimationFrame(() => setFailed(true));
      return () => window.cancelAnimationFrame(frame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:none";
    renderer.domElement.setAttribute(
      "aria-label",
      lang === "pl" ? "Interaktywny model uchwytu tokarskiego" : "Interactive lathe chuck model",
    );
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(7, 5, 10);
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0.4);
    controls.rotateSpeed = 3;
    controls.minDistance = 5;
    controls.maxDistance = 28;
    controls.update();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    room.dispose();
    scene.environment = environment.texture;
    const steel = new THREE.MeshStandardMaterial({
      color: 0xaeb8c1,
      metalness: 0.95,
      roughness: 0.27,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x414950,
      metalness: 0.92,
      roughness: 0.32,
    });
    const machined = new THREE.MeshStandardMaterial({
      color: 0xc6cdd2,
      metalness: 1,
      roughness: 0.22,
    });
    const parts: { object: THREE.Object3D; start: THREE.Vector3; offset: THREE.Vector3 }[] = [];
    function register(object: THREE.Object3D, x: number, y: number, z: number) {
      scene.add(object);
      parts.push({ object, start: object.position.clone(), offset: new THREE.Vector3(x, y, z) });
    }
    function ring(profile: number[][], material: THREE.Material) {
      const mesh = new THREE.Mesh(
        new THREE.LatheGeometry(
          profile.map(([r, z]) => new THREE.Vector2(r, z)),
          128,
        ),
        material,
      );
      mesh.rotation.x = Math.PI / 2;
      return mesh;
    }
    function cylinder(
      radius: number,
      length: number,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 32), material);
      m.rotation.x = Math.PI / 2;
      m.position.set(x, y, z);
      return m;
    }
    const body = ring(
      [
        [0.72, -0.9],
        [2.25, -0.9],
        [2.43, -0.75],
        [2.5, -0.62],
        [2.5, 0.48],
        [2.45, 0.57],
        [2.5, 0.66],
        [2.4, 0.8],
        [0.72, 0.8],
        [0.72, -0.9],
      ],
      dark,
    );
    register(body, 0, 0, -1.8);
    const face = ring(
      [
        [0.72, 0.8],
        [2.39, 0.8],
        [2.4, 0.9],
        [2.32, 1.04],
        [0.72, 1.04],
        [0.72, 0.8],
      ],
      machined,
    );
    register(face, 0, 0, 0.5);
    const back = ring(
      [
        [0.8, -1.18],
        [2.25, -1.18],
        [2.32, -1.08],
        [2.32, -0.92],
        [0.8, -0.92],
        [0.8, -1.18],
      ],
      steel,
    );
    register(back, 0, 0, -3);
    const inner = ring(
      [
        [0.53, -0.85],
        [0.71, -0.85],
        [0.71, 0.6],
        [0.53, 0.6],
        [0.53, -0.85],
      ],
      machined,
    );
    register(inner, 0, 0, -0.9);
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const radial = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
      const jaw = new THREE.Group();
      jaw.rotation.z = angle;
      jaw.position.copy(radial.clone().multiplyScalar(1.48));
      jaw.position.z = 1.16;
      function block(w: number, h: number, d: number, x: number, z: number, mat: THREE.Material) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, 0, z);
        jaw.add(m);
      }
      block(1.45, 0.54, 0.28, 0, 0, dark);
      block(1.34, 0.5, 0.38, 0, 0.32, steel);
      for (let j = 0; j < 3; j++)
        block(0.41, 0.49, 0.22 + j * 0.18, -0.43 + j * 0.43, 0.59 + j * 0.09, machined);
      register(jaw, radial.x * 1.8, radial.y * 1.8, 1.6);
      const slide = new THREE.Group();
      slide.rotation.z = angle;
      slide.position.copy(radial.clone().multiplyScalar(1.48));
      slide.position.z = 0.96;
      const guide = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.66, 0.14), dark);
      slide.add(guide);
      register(slide, radial.x * 1.1, radial.y * 1.1, 0.9);
      for (let j = 0; j < 2; j++) {
        const a = angle + Math.PI / 3;
        const radius = j === 0 ? 1.18 : 2.04;
        const x = Math.cos(a) * radius,
          y = Math.sin(a) * radius;
        const socket = new THREE.Group();
        socket.position.set(x, y, 1.04);
        socket.add(cylinder(0.15, 0.08, dark, 0, 0, 0));
        socket.add(cylinder(0.105, 0.24, steel, 0, 0, 0.06));
        register(socket, 0, 0, 2.5 + j * 0.5);
      }
    }
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(3, 6, 8);
    scene.add(light);
    const fill = new THREE.DirectionalLight(0xb8d6ff, 1.3);
    fill.position.set(-5, -2, 4);
    scene.add(fill);
    const draw = () => renderer.render(scene, camera);
    apply.current = (v) => {
      for (const part of parts)
        part.object.position.copy(part.start).addScaledVector(part.offset, v / 100);
      draw();
    };
    reset.current = () => {
      controls.reset();
      apply.current(0);
    };
    const resize = () => {
      const w = Math.max(element.clientWidth, 1),
        h = Math.max(element.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < h ? 50 : 38;
      camera.updateProjectionMatrix();
      controls.handleResize();
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    controls.addEventListener("change", draw);
    renderer.setAnimationLoop(() => controls.update());
    resize();
    return () => {
      observer.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      steel.dispose();
      dark.dispose();
      machined.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      apply.current = () => {};
      reset.current = () => {};
    };
  }, [lang]);
  return (
    <div className="mt-8 mb-8 overflow-hidden rounded-lg border border-border">
      <div className="p-4">
        <h3 className="font-serif text-xl text-white">
          {lang === "pl" ? "Interaktywna demonstracja 3D" : "Interactive 3D Demonstration"}
        </h3>
        <p className="mt-2 text-sm text-foreground/80">
          {lang === "pl"
            ? "Autorski model poglądowy. Obracaj uchwyt i rozkładaj zespół suwakiem."
            : "Original illustrative model. Rotate the chuck and explore the assembly using the slider."}
        </p>
      </div>
      <div
        ref={host}
        className="relative h-[360px] md:h-[480px] w-full"
        style={{
          backgroundColor: "#263341",
          backgroundImage:
            "linear-gradient(rgba(160,180,200,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(160,180,200,.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {failed && (
          <p className="p-6 text-white">
            {lang === "pl" ? "Podgląd wymaga WebGL 2." : "This preview requires WebGL 2."}
          </p>
        )}
      </div>
      <div className="p-4 flex flex-wrap items-center gap-4">
        <label className="flex-1 min-w-[160px] text-sm text-foreground">
          {lang === "pl" ? "Rozłożenie zespołu" : "Exploded view"}: {amount}%
          <input
            className="block w-full mt-3 accent-[#c9a96e]"
            type="range"
            min={0}
            max={100}
            value={amount}
            disabled={failed}
            onChange={(e) => {
              const v = Number(e.target.value);
              setAmount(v);
              apply.current(v);
            }}
          />
        </label>
        <button
          type="button"
          className="rounded border border-border px-4 py-2 text-sm text-foreground"
          onClick={() => {
            setAmount(0);
            reset.current();
          }}
        >
          {lang === "pl" ? "Resetuj" : "Reset"}
        </button>
      </div>
    </div>
  );
}

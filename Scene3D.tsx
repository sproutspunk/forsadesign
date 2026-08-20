import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;

    // Canvas pokrywa kontener dokładnie — wyśrodkowanie w pionie i poziomie
    renderer.domElement.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;display:block;";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      "Animated 3D sphere and cube with golden wireframe",
    );
    container.appendChild(renderer.domElement);

    // === BLOOM — zmniejszony, subtelniejszy ===
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.6, // strength: o połowę słabszy
      0.4,
      0.3, // threshold: wyższy — tylko jasne krawędzie świecą
    );
    composer.addPass(bloomPass);

    const gold = 0xc9a96e;

    // === MATERIALS — słabsze opacity ===
    const wireMat = new THREE.MeshBasicMaterial({
      color: gold,
      wireframe: true,
      transparent: true,
      opacity: 0.2, // słabsza kula w tle
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.1, // subtelniejsza aura
      side: THREE.BackSide,
    });

    // === SPHERE ===
    const sphereGroup = new THREE.Group();
    sphereGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), wireMat));
    sphereGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.7, 32, 32), glowMat));
    scene.add(sphereGroup);

    // === CUBE — wyraźne krawędzie, ale nie jaskrawe ===
    const cubeGroup = new THREE.Group();
    const cubeSize = 1.2;
    const half = cubeSize / 2;

    cubeGroup.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
        new THREE.MeshBasicMaterial({
          color: gold,
          wireframe: true,
          transparent: true,
          opacity: 0.2,
        }),
      ),
    );

    cubeGroup.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)),
        new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.7 }),
      ),
    );

    const innerSize = cubeSize * 0.55;
    cubeGroup.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(innerSize, innerSize, innerSize),
        new THREE.MeshBasicMaterial({
          color: gold,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        }),
      ),
    );
    cubeGroup.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(innerSize, innerSize, innerSize)),
        new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.6 }),
      ),
    );

    const crossPts = [
      new THREE.Vector3(-half, -half, -half),
      new THREE.Vector3(half, half, half),
      new THREE.Vector3(-half, -half, half),
      new THREE.Vector3(half, half, -half),
      new THREE.Vector3(-half, half, -half),
      new THREE.Vector3(half, -half, half),
      new THREE.Vector3(-half, half, half),
      new THREE.Vector3(half, -half, -half),
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPts);
    cubeGroup.add(
      new THREE.LineSegments(
        crossGeo,
        new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.3 }),
      ),
    );

    cubeGroup.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize * 1.08, cubeSize * 1.08, cubeSize * 1.08),
        glowMat,
      ),
    );
    scene.add(cubeGroup);

    // === CORE LIGHT — słabszy ===
    const coreLight = new THREE.PointLight(gold, 1.2, 10);
    scene.add(coreLight);

    // === HALFTONE — rzadsze, słabsze kropki ===
    const halftoneVertex = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const halftoneFragment = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv;
        uv.x *= uResolution.x / uResolution.y;
        vec2 center = vec2(uResolution.x / uResolution.y * 0.5, 0.5);
        float dist = distance(uv, center);
        float density = 40.0;  // rzadsze
        vec2 grid = fract(uv * density) - 0.5;
        float dotDist = length(grid);
        float wave = sin(dist * 12.0 - uTime * 2.5) * 0.5 + 0.5;
        float wave2 = sin(dist * 20.0 - uTime * 3.5 + 1.0) * 0.5 + 0.5;
        float dotSize = 0.28 * (wave * 0.7 + wave2 * 0.3);
        float dot = smoothstep(dotSize, dotSize - 0.08, dotDist);
        vec3 color = vec3(0.788, 0.663, 0.431);
        float alpha = dot * (1.0 - dist * 0.5) * 0.25;  // słabsze
        gl_FragColor = vec4(color, alpha);
      }
    `;
    const halftoneMat = new THREE.ShaderMaterial({
      vertexShader: halftoneVertex,
      fragmentShader: halftoneFragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const halftoneMesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), halftoneMat);
    halftoneMesh.position.z = -4;
    scene.add(halftoneMesh);

    // === PARTICLES ===
    const pCount = 200;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.015,
      color: gold,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // === ANIMATION ===
    const clock = new THREE.Clock();
    let sY = 0,
      sX = 0,
      cY = 0,
      cZ = 0;
    let pSY = 0,
      pSX = 0,
      pCY = 0,
      pCZ = 0;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let noMotion = mq.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      noMotion = e.matches;
    };
    mq.addEventListener("change", onMotionChange);

    renderer.setAnimationLoop(() => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      halftoneMat.uniforms.uTime.value = t;

      if (!noMotion) {
        sY += 0.3 * dt;
        sX += 0.15 * dt;
        pSY += (sY - pSY) * 0.12;
        pSX += (sX - pSX) * 0.12;
        sphereGroup.rotation.y = pSY;
        sphereGroup.rotation.x = pSX;

        cY += -0.5 * dt;
        cZ += 0.2 * dt;
        pCY += (cY - pCY) * 0.12;
        pCZ += (cZ - pCZ) * 0.12;
        cubeGroup.rotation.y = pCY;
        cubeGroup.rotation.z = pCZ;

        const beat = Math.sin(t * 3.0) * 0.5 + 0.5;
        const beat2 = Math.sin(t * 4.5 + 1.0) * 0.5 + 0.5;
        const combined = beat * 0.6 + beat2 * 0.4;

        coreLight.intensity += (1.2 + combined * 0.8 - coreLight.intensity) * 0.1;
        bloomPass.strength += (0.6 + combined * 0.3 - bloomPass.strength) * 0.08;

        sphereGroup.scale.setScalar(1.0 + combined * 0.02);
        cubeGroup.scale.setScalar(1.0 + (1.0 - combined) * 0.02);

        sphereGroup.position.y += (Math.sin(t * 0.5) * 0.08 - sphereGroup.position.y) * 0.05;
        cubeGroup.position.y += (Math.sin(t * 0.5 + 1) * 0.08 - cubeGroup.position.y) * 0.05;

        particles.rotation.y += 0.0005;
      }

      composer.render();
    });

    // === RESIZE ===
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      halftoneMat.uniforms.uResolution.value.set(width, height);
    });
    ro.observe(container);

    // === CLEANUP ===
    return () => {
      mq.removeEventListener("change", onMotionChange);
      ro.disconnect();
      renderer.setAnimationLoop(null);

      sphereGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      cubeGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      crossGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      halftoneMat.dispose();
      halftoneMesh.geometry.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

class AnimationController {
  foldDuration = 1.0;
  radius = 5.5;
  _foldTimer = 0;

  update(
    dt: number,
    time: number,
    pages: THREE.Mesh[]
  ) {
    this._foldTimer += dt;
    let cycleProg = this._foldTimer / this.foldDuration;
    if (cycleProg >= 1) {
      this._foldTimer = 0;
      cycleProg = 0;
    }

    const mobiusAngle = time * 0.15;
    const r = 3;
    const w = 0.4;

    pages.forEach((page, i) => {
      const pageCount = pages.length;
      const pageStart = i / pageCount;
      const pageEnd = (i + 1) / pageCount;

      let pageProgress = 0;
      if (cycleProg > pageStart) {
        pageProgress = Math.min(1, (cycleProg - pageStart) / (pageEnd - pageStart));
      }

      const rotX = (-Math.PI / 1.2) * pageProgress;
      const rotY = (Math.PI / 4) * Math.sin(pageProgress * Math.PI);
      const rotZ = (Math.PI / 6) * pageProgress;

      page.rotation.set(rotX, rotY, rotZ);

      const u =
        ((i + 0.5) / pageCount) * Math.PI * 2 + mobiusAngle;
      let px =
        (r + w * 0.2 * Math.cos(u / 2)) *
        Math.cos(u) *
        (this.radius / 3);
      let py =
        (r + w * 0.2 * Math.cos(u / 2)) *
        Math.sin(u) *
        (this.radius / 3);
      let pz = w * 0.2 * Math.sin(u / 2) * (this.radius / 3);

      px += Math.sin(time * 0.5 + i * 0.1) * 0.05;
      py += Math.cos(time * 0.3 + i * 0.1) * 0.05;

      page.position.set(px, py, pz);
    });
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0817);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 10);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Coin
    const coinGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.3, 64);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xc5a55a,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1.0,
      side: THREE.DoubleSide,
    });
    const coinMesh = new THREE.Mesh(coinGeometry, coinMat);
    coinMesh.rotation.x = Math.PI / 2;

    // Ring
    const ringGeometry = new THREE.TorusGeometry(1.0, 0.05, 16, 6);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf0d878,
      metalness: 1.0,
      roughness: 0.1,
      emissive: 0xf0d878,
      emissiveIntensity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMat);
    ringMesh.position.z = 0.16;

    const coinGroup = new THREE.Group();
    coinGroup.add(coinMesh);
    coinGroup.add(ringMesh);
    scene.add(coinGroup);

    // Ribbon
    const ribbonGroup = new THREE.Group();
    const totalPages = 60;
    const pages: THREE.Mesh[] = [];

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c76b,
      metalness: 0.8,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < totalPages; i++) {
      const t = i / totalPages;
      const uStart = t * Math.PI * 2;
      const uEnd = ((i + 1) / totalPages) * Math.PI * 2;

      const pageFunction = (
        u: number,
        v: number,
        target: THREE.Vector3
      ) => {
        const uMapped = uStart + u * (uEnd - uStart);
        const vVal = (v - 0.5) * 0.4;
        const a = 3;
        const x =
          (a + vVal * Math.cos(uMapped / 2)) * Math.cos(uMapped);
        const y =
          (a + vVal * Math.cos(uMapped / 2)) * Math.sin(uMapped);
        const z = vVal * Math.sin(uMapped / 2);
        target.set(x, y, z);
      };

      const geometry = new ParametricGeometry(pageFunction, 1, 2);
      geometry.userData = { index: i };
      const page = new THREE.Mesh(geometry, ribbonMaterial);
      page.position.z = -i * 0.01;
      ribbonGroup.add(page);
      pages.push(page);
    }

    scene.add(ribbonGroup);

    // Controller
    const controller = new AnimationController();

    // Responsive
    const updateRadius = () => {
      controller.radius = window.innerWidth >= 768 ? 5.5 : 4.0;
      const scale = window.innerWidth >= 768 ? 1.0 : 0.7;
      coinGroup.scale.setScalar(scale);
    };
    updateRadius();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateRadius();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    let currentTime = 0;
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      currentTime += delta;

      coinGroup.rotation.y = Math.sin(currentTime * 0.2) * 0.3;
      coinGroup.rotation.z = Math.cos(currentTime * 0.15) * 0.1;

      controller.update(delta, currentTime, pages);

      renderer.render(scene, camera);
    };
    animate();

    // Scroll-driven opacity fade
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 2000;
      const fadeEnd = 2500;
      if (scrollY > fadeStart) {
        const progress = Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));
        const opacity = 1 - progress * 0.7;
        canvas.style.opacity = String(opacity);
      } else {
        canvas.style.opacity = '1';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      pages.forEach((p) => {
        p.geometry.dispose();
      });
      ribbonMaterial.dispose();
      coinGeometry.dispose();
      coinMat.dispose();
      ringGeometry.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

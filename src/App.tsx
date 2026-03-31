import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
function FloatingTorus() {
  const [rotation, setRotation] = useState([0, 0, 0]);
  return (
    <mesh position={[3, 1, 0]} rotation={rotation} onPointerMove={() => setRotation([r => r[0] + 0.01, r => r[1] + 0.01, 0])}>
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
    </mesh>
  );
}
function App() {
  const [color, setColor] = useState('#ff0080');
  return (
    <div className="app">
      <div className="toolbar">
        <h1>🎨 3D Paint</h1>
        <div className="tools">
          <label>Цвет:<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="color-picker" /></label>
          <div className="info"><p>🖱️ ЛКМ - вращение | 🔍 Колесо - зум</p></div>
        </div>
      </div>
      <Canvas camera={{ position: [0, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff0080" />
        <Grid args={[20, 20]} cellColor="#444" sectionColor="#666" fadeDistance={30} />
        <FloatingTorus />
        <OrbitControls />
      </Canvas>
      <style>{`
        .app { width: 100vw; height: 100vh; position: relative; }
        .toolbar { position: absolute; top: 0; left: 0; right: 0; padding: 1rem 2rem; background: linear-gradient(180deg, rgba(15,15,26,0.95) 0%, rgba(15,15,26,0.8) 100%); backdrop-blur-md; z-index: 100; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,20,147,0.3); }
        .toolbar h1 { font-size: 1.5rem; background: linear-gradient(90deg, #ff0080, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .tools { display: flex; gap: 1.5rem; align-items: center; }
        .tools label { display: flex; align-items: center; gap: 0.5rem; color: #fff; font-size: 0.9rem; }
        .color-picker { width: 40px; height: 40px; border: none; border-radius: 8px; cursor: pointer; background: none; }
        .info { color: #888; font-size: 0.85rem; }
        canvas { touch-action: none; }
      `}</style>
    </div>
  );
}
export default App;

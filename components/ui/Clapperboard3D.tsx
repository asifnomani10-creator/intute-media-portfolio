"use client";
import { useRef, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  progressRef: MutableRefObject<number>;
}

const BOARD_COLOR = new THREE.Color("#1d2b1d");
const GREEN = new THREE.Color("#74C044");
const SILVER = new THREE.Color("#9aaa9a");
const WHITE = new THREE.Color("#e0e0e0");
const DS = THREE.DoubleSide;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Material shorthand props
const boardMat = { color: BOARD_COLOR, metalness: 0.55, roughness: 0.38, side: DS } as const;
const greenMat = { color: GREEN, emissive: GREEN, emissiveIntensity: 0.9, metalness: 0.25, roughness: 0.45, side: DS } as const;
const silverMat = { color: SILVER, metalness: 0.88, roughness: 0.18, side: DS } as const;
const whiteMat = { color: WHITE, opacity: 0.35, transparent: true, side: DS } as const;
const labelMat = { color: "#1a271a", metalness: 0.1, roughness: 0.9, side: DS } as const;

export default function Clapperboard3D({ progressRef }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const armRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current || !armRef.current) return;
    const p = progressRef.current;
    const t = Date.now();

    // Apple-style: limited arc rotation — always shows the front face
    // 0 → 0.33: rotate from -0.52 rad (-30°) to 0 (front-on)
    // 0.33 → 0.66: stay near front, slight vertical tilt
    // 0.66 → 1.0: rotate from 0 to +0.52 rad (+30°)
    let targetY: number;
    if (p < 0.33) {
      targetY = -0.52 + (p / 0.33) * 0.52;  // -30° → 0°
    } else if (p < 0.66) {
      targetY = 0;                             // front-on
    } else {
      targetY = ((p - 0.66) / 0.34) * 0.52;  // 0° → +30°
    }
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetY, 0.06);

    // Vertical parallax: dips slightly in the middle chapter
    const targetX = p < 0.33
      ? lerp(-0.08, 0, p / 0.33)
      : p < 0.66
        ? Math.sin(((p - 0.33) / 0.33) * Math.PI) * 0.12 + Math.sin(t / 3000) * 0.03
        : lerp(0, 0.06, (p - 0.66) / 0.34);
    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetX, 0.04);

    // Idle gentle Z sway
    groupRef.current.rotation.z = lerp(
      groupRef.current.rotation.z,
      Math.sin(t / 4000) * 0.025,
      0.03
    );

    // Arm: opens in first 33%, stays open mid, closes in last 20%
    const armP = p < 0.33 ? p / 0.33 : p > 0.80 ? (1 - p) / 0.20 : 1;
    armRef.current.rotation.x = lerp(armRef.current.rotation.x, -armP * 0.60, 0.07);
  });

  const stripeColors = [BOARD_COLOR, GREEN, BOARD_COLOR, GREEN, BOARD_COLOR, GREEN];

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={2.0} color="#74C044" />
      <pointLight position={[4, -3, 2]} intensity={1.0} color="#A0D870" />
      <pointLight position={[0, 5, -3]} intensity={0.8} color="#74C044" />
      <pointLight position={[0, -4, 4]} intensity={0.6} color="#ffffff" />

      <group ref={groupRef}>
        {/* ── Main board ── */}
        <mesh position={[0, -0.12, 0]} castShadow>
          <boxGeometry args={[3.2, 2.2, 0.16]} />
          <meshStandardMaterial {...boardMat} />
        </mesh>

        {/* Horizontal ruled lines on front face */}
        {[-0.48, -0.06, 0.32, 0.70].map((y, i) => (
          <mesh key={i} position={[0, y, 0.09]}>
            <boxGeometry args={[2.65, 0.022, 0.005]} />
            <meshStandardMaterial {...whiteMat} />
          </mesh>
        ))}

        {/* Label inset box */}
        <mesh position={[0, -0.58, 0.09]}>
          <boxGeometry args={[2.3, 0.84, 0.008]} />
          <meshStandardMaterial {...labelMat} />
        </mesh>

        {/* Glowing ring on front */}
        <mesh position={[0.7, -0.54, 0.1]}>
          <torusGeometry args={[0.4, 0.04, 8, 32]} />
          <meshStandardMaterial {...greenMat} />
        </mesh>
        <mesh position={[0.7, -0.54, 0.1]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial {...greenMat} emissiveIntensity={2.5} />
        </mesh>

        {/* Glowing ring on BACK face too */}
        <mesh position={[0.7, -0.54, -0.1]} rotation={[0, Math.PI, 0]}>
          <torusGeometry args={[0.4, 0.04, 8, 32]} />
          <meshStandardMaterial {...greenMat} />
        </mesh>

        {/* Edge silver accents */}
        {([-1.63, 1.63] as number[]).map((x) => (
          <mesh key={x} position={[x, -0.12, 0]}>
            <boxGeometry args={[0.04, 2.24, 0.18]} />
            <meshStandardMaterial {...silverMat} />
          </mesh>
        ))}
        <mesh position={[0, -1.22, 0]}>
          <boxGeometry args={[3.28, 0.04, 0.18]} />
          <meshStandardMaterial {...silverMat} />
        </mesh>

        {/* ── Clapper arm group — pivot at y=+1.1 ── */}
        <group ref={armRef} position={[0, 1.1, 0]}>
          {/* Arm body */}
          <mesh position={[0, -0.275, 0]}>
            <boxGeometry args={[3.2, 0.55, 0.13]} />
            <meshStandardMaterial {...boardMat} />
          </mesh>

          {/* Diagonal stripes */}
          {stripeColors.map((col, i) => (
            <mesh
              key={i}
              position={[-1.2 + i * 0.48, -0.275, 0.075]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.95, 0.07]} />
              <meshStandardMaterial color={col} metalness={0.3} roughness={0.5} side={DS} />
            </mesh>
          ))}

          {/* Mirror stripes on back */}
          {stripeColors.map((col, i) => (
            <mesh
              key={`b${i}`}
              position={[-1.2 + i * 0.48, -0.275, -0.075]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <boxGeometry args={[0.36, 0.95, 0.07]} />
              <meshStandardMaterial color={col} metalness={0.3} roughness={0.5} side={DS} />
            </mesh>
          ))}

          {/* Hinge pin */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 3.45, 12]} />
            <meshStandardMaterial {...silverMat} />
          </mesh>
        </group>
      </group>
    </>
  );
}

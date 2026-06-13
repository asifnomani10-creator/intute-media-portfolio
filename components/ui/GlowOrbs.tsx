"use client";

export default function GlowOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Bright brand green — top left */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[120px] animate-float-slow"
        style={{
          background: "radial-gradient(circle, #74C044, transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
      />
      {/* Light green — center right */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] animate-float-medium"
        style={{
          background: "radial-gradient(circle, #A0D870, transparent 70%)",
          top: "30%",
          right: "-5%",
          animationDelay: "2s",
        }}
      />
      {/* Deep green — bottom center */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-18 blur-[110px] animate-float-fast"
        style={{
          background: "radial-gradient(circle, #3D7A1A, transparent 70%)",
          bottom: "-10%",
          left: "35%",
          animationDelay: "4s",
        }}
      />
      {/* Mid green — bottom left */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-[90px] animate-float-medium"
        style={{
          background: "radial-gradient(circle, #5AAD28, transparent 70%)",
          bottom: "20%",
          left: "-5%",
          animationDelay: "1s",
        }}
      />
    </div>
  );
}

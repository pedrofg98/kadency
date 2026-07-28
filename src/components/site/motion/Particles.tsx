/**
 * Pontinhos coral flutuando atrás do hero.
 *
 * Posições fixas em vez de aleatórias: com Math.random() cada render
 * embaralharia tudo, e o layout precisa ser estável.
 */
const PARTICLES = [
  { left: '8%', top: '18%', size: 5, delay: 0, duration: 7 },
  { left: '21%', top: '68%', size: 3, delay: 1.4, duration: 8.5 },
  { left: '34%', top: '12%', size: 4, delay: 2.6, duration: 6.5 },
  { left: '47%', top: '82%', size: 3, delay: 0.8, duration: 9 },
  { left: '63%', top: '24%', size: 5, delay: 3.2, duration: 7.5 },
  { left: '74%', top: '72%', size: 3, delay: 1.9, duration: 8 },
  { left: '88%', top: '38%', size: 4, delay: 2.2, duration: 6.8 },
  { left: '94%', top: '78%', size: 3, delay: 0.4, duration: 9.5 },
]

export function Particles() {
  return (
    // -z-10 para as partículas ficarem atrás do texto, não por cima dele
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-coral"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animation: `particle-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

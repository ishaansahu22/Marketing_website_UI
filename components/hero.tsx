'use client'

export function Hero() {
  return (
    <section
  id="top"
  className="
    relative
    flex
    min-h-screen
    items-center
    px-4
    md:px-8
    pb-32
    lg:pb-48
    overflow-x-hidden
  "
      style={{
        background: '#FFFDF1',
      }}
    >
      <div className="w-full">

          <div className="relative overflow-visible">
            <h1
              className="
                relative
                z-30
                leading-none
                tracking-tight
                whitespace-nowrap
                select-none
                w-full
                text-center
              "
              style={{
                fontFamily: "'Tanker', sans-serif",
                fontWeight: 400,
                color: '#59C749',
                fontSize: '24vw', 
              }}
            >
              DAYBRICKS
            </h1>
            
            {/* Hanging "Coming Soon" Tag */}
            <style>{`
              @keyframes dropIn {
                0% { transform: rotate(-90deg) translateX(-50%); opacity: 0; }
                100% { transform: rotate(0deg) translateX(-50%); opacity: 1; }
              }
              @keyframes swing {
                0%, 100% { transform: rotate(-5deg); }
                50% { transform: rotate(5deg); }
              }
              @keyframes dustFall {
                0% { opacity: 0; transform: translateY(0px) scale(0.5); }
                20% { opacity: 0.8; transform: translateY(10px) scale(1); }
                100% { opacity: 0; transform: translateY(60px) translateX(20px) scale(0.2); }
              }
            `}</style>
            
            {/* String Wrapper (Behind Text, z-20) */}
            <div 
              className="absolute left-[81%] top-[35%] sm:top-[45%] md:top-[50%] z-20 pointer-events-none"
              style={{
                transformOrigin: 'top center',
                animation: 'dropIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              }}
            >
              <div 
                className="flex flex-col items-center"
                style={{ 
                  transformOrigin: 'top center',
                  animation: 'swing 6s ease-in-out infinite' 
                }}
              >
                {/* The visible string hanging from behind the letters */}
                <div className="w-[3px] md:w-[5px] h-10 sm:h-16 md:h-24 bg-[#E89B68] rounded-full opacity-80" />
              </div>
            </div>

            {/* Tag Wrapper (In Front of Text, z-40) */}
            <div 
              className="absolute left-[81%] top-[35%] sm:top-[45%] md:top-[50%] z-40 pointer-events-none"
              style={{
                transformOrigin: 'top center',
                animation: 'dropIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              }}
            >
              <div 
                className="flex flex-col items-center"
                style={{ 
                  transformOrigin: 'top center',
                  animation: 'swing 6s ease-in-out infinite' 
                }}
              >
                {/* Invisible spacer to perfectly align the tag with the string above */}
                <div className="w-[3px] md:w-[5px] h-10 sm:h-16 md:h-24 opacity-0" />
                
                {/* The tag itself */}
                <div className="relative border-[3px] md:border-[5px] border-[#E89B68] rounded-xl md:rounded-[1.5rem] px-3 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-3 bg-[#FFFDF1]/95 backdrop-blur-md shadow-[3px_3px_0px_rgba(232,155,104,0.15)] sm:shadow-[4px_4px_0px_rgba(232,155,104,0.15)] md:shadow-[8px_8px_0px_rgba(232,155,104,0.15)]">
                  <span className="text-[#E89B68] whitespace-nowrap font-black text-[10px] sm:text-sm md:text-3xl uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-clash)' }}>
                    Coming Soon
                  </span>
                  
                  {/* Dust Particles */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-0 pointer-events-none">
                    <div className="absolute left-[30%] size-1.5 md:size-2 rounded-full bg-[#E89B68]/40" style={{ animation: 'dustFall 2.5s infinite ease-in' }} />
                    <div className="absolute left-[60%] size-2 md:size-3 rounded-full bg-[#E89B68]/30" style={{ animation: 'dustFall 3.2s infinite ease-in 0.8s' }} />
                    <div className="absolute left-[80%] size-1 md:size-1.5 rounded-full bg-[#E89B68]/50" style={{ animation: 'dustFall 2s infinite ease-in 1.5s' }} />
                    <div className="absolute left-[20%] size-1.5 md:size-2.5 rounded-full bg-[#E89B68]/40" style={{ animation: 'dustFall 2.8s infinite ease-in 0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        <h2
  className="
    mt-12
    md:mt-12
    leading-[0.9]
    tracking-[-0.04em]
    max-w-none
  "
  style={{
    fontFamily: 'var(--font-boska)',
    color: '#47A83A',
    fontSize: 'clamp(3.2rem, 6vw, 7rem)',
  }}
>
  <span className="hidden md:block">
    Build Your Perfect Day,
    <br />
    brick by brick.
  </span>

  <span className="md:hidden">
    Build Your Perfect Day,
    <br />
    brick by brick.
  </span>
</h2>
<div className="mt-8 md:mt-12 flex flex-col gap-4 sm:flex-row pb-16 md:pb-24 lg:pb-32">
  <div>
  <a
    href="#waitlist"
    className="
      inline-flex
      items-center
      justify-center
      rounded-full
      border-2
      px-10
      py-5
      text-sm
      font-semibold
      tracking-[0.14em]
      uppercase
      transition-all
      duration-300
      hover:-translate-y-1
    "
    style={{
      background: '#59C749',
      borderColor: '#59C749',
      color: '#FFFDF1',
      fontFamily: 'var(--font-sans)',
    }}
  >
    <span className="flex items-center gap-3">
    Join the Waitlist
    <span>→</span>
  </span>
  </a>
</div>

</div>
      </div>
    </section>
  )
}
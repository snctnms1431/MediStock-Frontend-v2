import React, { useEffect, useState } from 'react';
import { Activity, Plus } from 'lucide-react';

const MediStockIntro = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);

    // Cute rounded font (self-contained, no index.html change needed)
    useEffect(() => {
        const id = 'medistock-fredoka-font';
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href =
            'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const start = performance.now();
        const duration = 2600;
        let frame;

        const animate = (now) => {
            const elapsed = now - start;
            const value = Math.min((elapsed / duration) * 100, 100);

            setProgress(value);

            if (value < 100) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        const exitTimer = setTimeout(() => {
            setExiting(true);
        }, 2850);

        const completeTimer = setTimeout(() => {
            onComplete?.();
        }, 3450);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    const letters = 'MediStock'.split('');

    return (
        <div
            className={`
                fixed inset-0 z-[99999] flex min-h-screen
                items-center justify-center overflow-hidden
                bg-[#F8FCFB] text-slate-900
                dark:bg-[#071411] dark:text-white
                transition-all duration-700 ease-in-out
                ${exiting
                    ? 'opacity-0 scale-[1.03] pointer-events-none'
                    : 'opacity-100 scale-100'
                }
            `}
            style={{ fontFamily: "'Fredoka', 'Plus Jakarta Sans', sans-serif" }}
        >
            <style>{`
                @keyframes letterReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(35px) rotateX(-35deg);
                        filter: blur(12px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateX(0);
                        filter: blur(0);
                    }
                }

                @keyframes iconReveal {
                    0% {
                        opacity: 0;
                        transform: scale(0.5) rotate(-25deg);
                        filter: blur(8px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(0);
                        filter: blur(0);
                    }
                }

                @keyframes floatUp {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                @keyframes fadeTag {
                    to { opacity: 1; }
                }

                /* ---------- dynamic light-colour background ---------- */
                @keyframes hueShift {
                    0%   { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                @keyframes blobOne {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%      { transform: translate(22vw, 12vh) scale(1.25); }
                    66%      { transform: translate(8vw, 28vh) scale(0.9); }
                }
                @keyframes blobTwo {
                    0%, 100% { transform: translate(0, 0) scale(1.1); }
                    40%      { transform: translate(-26vw, -10vh) scale(0.9); }
                    70%      { transform: translate(-10vw, -26vh) scale(1.3); }
                }
                @keyframes blobThree {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(-18vw, -20vh) scale(1.35); }
                }
                @keyframes bubbleUp {
                    0%   { transform: translateY(0) scale(.6); opacity: 0; }
                    20%  { opacity: .9; }
                    100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
                }

                /* ---------- capsule loader ---------- */
                @keyframes pole {
                    to { background-position: 28px 0; }
                }
                @keyframes pillBubble {
                    0%   { transform: translateY(6px) scale(.5); opacity: 0; }
                    30%  { opacity: .9; }
                    100% { transform: translateY(-10px) scale(1); opacity: 0; }
                }
                @keyframes beadPulse {
                    0%, 100% { transform: translate(50%, -50%) scale(1); opacity: 1; }
                    50%      { transform: translate(50%, -50%) scale(1.5); opacity: .7; }
                }
                @keyframes capsuleRock {
                    0%, 100% { transform: rotate(-1.2deg); }
                    50%      { transform: rotate(1.2deg); }
                }

                .intro-letter {
                    display: inline-block;
                    opacity: 0;
                    animation: letterReveal 850ms cubic-bezier(.16,1,.3,1) forwards;
                }

                .intro-icon {
                    opacity: 0;
                    animation: iconReveal 900ms cubic-bezier(.16,1,.3,1) 150ms forwards;
                }

                .intro-float {
                    animation: floatUp 3s ease-in-out infinite;
                }

                .intro-tagline {
                    opacity: 0;
                    animation: fadeTag 1s ease 1.3s forwards;
                }

                .intro-hue    { animation: hueShift 10s linear infinite; }
                .intro-blob-1 { animation: blobOne 12s ease-in-out infinite; }
                .intro-blob-2 { animation: blobTwo 15s ease-in-out infinite; }
                .intro-blob-3 { animation: blobThree 10s ease-in-out infinite; }
                .intro-bubble { animation: bubbleUp linear infinite; }

                .intro-capsule { animation: capsuleRock 2.2s ease-in-out infinite; }
                .intro-pole {
                    background-image: repeating-linear-gradient(
                        115deg,
                        rgba(255,255,255,.45) 0 7px,
                        transparent 7px 14px
                    );
                    background-size: 28px 100%;
                    animation: pole .7s linear infinite;
                }
                .intro-pill-bubble { animation: pillBubble 1.4s ease-in infinite; }
                .intro-bead        { animation: beadPulse 0.9s ease-in-out infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .intro-letter, .intro-icon, .intro-float, .intro-tagline,
                    .intro-hue, .intro-blob-1, .intro-blob-2, .intro-blob-3,
                    .intro-bubble, .intro-capsule, .intro-pole,
                    .intro-pill-bubble, .intro-bead {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        filter: none !important;
                    }
                    .intro-bubble, .intro-pill-bubble { opacity: 0 !important; }
                }
            `}</style>

            {/* Dynamic light-colour background (works in light + dark) */}
            <div className="intro-hue pointer-events-none absolute inset-0">
                <div
                    className="
                        intro-blob-1 absolute -left-[12%] -top-[18%]
                        h-[55vmax] w-[55vmax] rounded-full blur-[100px]
                        bg-[radial-gradient(circle,rgba(94,234,212,.75),transparent_65%)]
                        dark:bg-[radial-gradient(circle,rgba(45,212,191,.35),transparent_65%)]
                    "
                />
                <div
                    className="
                        intro-blob-2 absolute -bottom-[20%] -right-[12%]
                        h-[55vmax] w-[55vmax] rounded-full blur-[110px]
                        bg-[radial-gradient(circle,rgba(125,211,252,.75),transparent_65%)]
                        dark:bg-[radial-gradient(circle,rgba(56,189,248,.32),transparent_65%)]
                    "
                />
                <div
                    className="
                        intro-blob-3 absolute bottom-[8%] left-[28%]
                        h-[38vmax] w-[38vmax] rounded-full blur-[100px]
                        bg-[radial-gradient(circle,rgba(249,168,212,.65),transparent_65%)]
                        dark:bg-[radial-gradient(circle,rgba(244,114,182,.28),transparent_65%)]
                    "
                />
                <div
                    className="
                        intro-blob-1 absolute right-[6%] top-[-12%]
                        h-[34vmax] w-[34vmax] rounded-full blur-[90px]
                        bg-[radial-gradient(circle,rgba(253,224,71,.55),transparent_65%)]
                        dark:bg-[radial-gradient(circle,rgba(250,204,21,.2),transparent_65%)]
                    "
                    style={{ animationDelay: '-6s' }}
                />
            </div>

            {/* Soft glossy sheen */}
            <div
                className="
                    pointer-events-none absolute inset-0
                    bg-gradient-to-b from-white/70 via-transparent to-transparent
                    dark:from-white/[0.06]
                "
            />

            {/* Gentle rising bubbles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 14 }).map((_, i) => (
                    <span
                        key={i}
                        className="
                            intro-bubble absolute -bottom-6 rounded-full
                            border border-white/70 bg-white/40
                            dark:border-white/20 dark:bg-white/10
                        "
                        style={{
                            left: `${(i * 41 + 7) % 100}%`,
                            width: 8 + ((i * 5) % 16),
                            height: 8 + ((i * 5) % 16),
                            animationDuration: `${9 + ((i * 3) % 8)}s`,
                            animationDelay: `-${(i * 1.7) % 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex w-full flex-col items-center px-5">

                {/* Medical icon */}
                <div className="
                    intro-icon intro-float relative mb-8
                    flex h-[76px] w-[76px] items-center justify-center
                    rounded-[25px] border border-teal-200/70
                    bg-white/80 shadow-xl shadow-teal-900/5 backdrop-blur-md
                    dark:border-teal-400/20
                    dark:bg-white/[0.06]
                    dark:shadow-black/20
                ">
                    <div className="
                        absolute inset-0 rounded-[25px]
                        bg-gradient-to-br from-teal-500/10 to-emerald-500/5
                    " />

                    <Activity
                        size={38}
                        strokeWidth={1.8}
                        className="relative text-teal-600 dark:text-teal-400"
                    />

                    <div className="
                        absolute -right-1 -top-1 flex h-6 w-6
                        items-center justify-center rounded-full
                        border-[3px] border-[#F8FCFB]
                        bg-emerald-500 text-white
                        dark:border-[#071411]
                    ">
                        <Plus size={12} strokeWidth={3} />
                    </div>
                </div>

                {/* Animated brand name */}
                <h1
                    aria-label="MediStock"
                    className="
                        whitespace-nowrap text-[43px] font-semibold
                        tracking-[-1px] sm:text-[64px]
                        sm:tracking-[-2px] lg:text-[76px]
                    "
                >
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            className={`
                                intro-letter
                                ${index >= 4
                                    ? 'bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400'
                                    : 'text-slate-800 dark:text-white'
                                }
                            `}
                            style={{
                                animationDelay: `${350 + index * 85}ms`
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </h1>

                {/* Tagline */}
                <div className="intro-tagline mt-4 flex flex-col items-center gap-2">
                    <div className="
                        h-[2px] w-12 rounded-full
                        bg-gradient-to-r from-teal-500 to-emerald-400
                    " />

                    <p className="
                        text-[10px] font-semibold uppercase tracking-[4px]
                        text-slate-500 dark:text-slate-400 sm:text-xs
                    ">
                        Smart Medical Inventory
                    </p>
                </div>

                {/* Capsule loader */}
                <div className="mt-14 w-52 sm:w-60">
                    <div className="intro-capsule relative">
                        {/* capsule shell */}
                        <div className="
                            relative h-7 w-full overflow-hidden rounded-full
                            border border-white/80 bg-white/60
                            shadow-[inset_0_2px_6px_rgba(15,23,42,.12),0_8px_24px_-8px_rgba(13,148,136,.35)]
                            backdrop-blur-md
                            dark:border-white/15 dark:bg-white/[0.06]
                            dark:shadow-[inset_0_2px_6px_rgba(0,0,0,.4),0_8px_24px_-8px_rgba(0,0,0,.6)]
                        ">
                            {/* liquid fill */}
                            <div
                                className="
                                    relative h-full rounded-full
                                    bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400
                                    shadow-[0_0_16px_rgba(45,212,191,.7)]
                                "
                                style={{ width: `${Math.max(progress, 6)}%` }}
                            >
                                <div className="intro-pole absolute inset-0 rounded-full" />

                                {/* bubbles inside the fill */}
                                <span className="intro-pill-bubble absolute bottom-1 left-[20%] h-1.5 w-1.5 rounded-full bg-white/80" />
                                <span
                                    className="intro-pill-bubble absolute bottom-1 left-[50%] h-1 w-1 rounded-full bg-white/80"
                                    style={{ animationDelay: '.5s' }}
                                />
                                <span
                                    className="intro-pill-bubble absolute bottom-1 left-[75%] h-1.5 w-1.5 rounded-full bg-white/80"
                                    style={{ animationDelay: '.9s' }}
                                />

                                {/* glowing leading bead */}
                                <span className="
                                    intro-bead absolute right-0 top-1/2 h-3 w-3 rounded-full
                                    bg-white shadow-[0_0_14px_4px_rgba(255,255,255,.9)]
                                " />
                            </div>

                            {/* gloss highlight */}
                            <div className="
                                pointer-events-none absolute inset-x-2 top-[3px] h-[9px]
                                rounded-full bg-gradient-to-b from-white/80 to-white/0
                                dark:from-white/40
                            " />
                        </div>
                    </div>

                    <p className="
                        mt-4 text-center text-[10px] font-semibold
                        tracking-[2px] text-slate-500 dark:text-slate-400
                    ">
                        {progress < 100
                            ? `PREPARING YOUR WORKSPACE · ${Math.round(progress)}%`
                            : 'READY'
                        }
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="
                absolute bottom-8 left-0 right-0 text-center
                text-[10px] font-medium tracking-wider
                text-slate-400 dark:text-slate-500
            ">
                MEDISTOCK • HEALTHCARE MANAGEMENT
            </div>
        </div>
    );
};

export default MediStockIntro;
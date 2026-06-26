'use client'

import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ThreeBackground } from "../components/ThreeBackground";
import styles from "./page.module.css";

type ServiceStatus = {
  litellm: boolean;
  lmstudio: boolean;
  comfyui: boolean;
  ngrok: boolean;
};

const PORT_LABELS: Record<keyof ServiceStatus, string> = {
  litellm: "LiteLLM (4000)",
  lmstudio: "LM Studio (1234)",
  comfyui: "ComfyUI (8188)",
  ngrok: "ngrok (4040)",
};

// Public static export (jon-beatz.com) can't reach the local workstation,
// so live status polling is frozen to "all online" and doc links are inert.
// Local dev/build (flag unset) keeps the real-time dashboard.
const IS_STATIC = process.env.NEXT_PUBLIC_JB_STATIC === "1";

// This standalone project IS the jonbeatz.dev (red) site, so dev is the
// DEFAULT. Drops the workstation service capsules and session shortcuts from
// the footer, keeping only the JARVIS waveform + a public copyright line.
// Set NEXT_PUBLIC_JB_VARIANT="default" to fall back to the legacy gold theme.
const IS_DEV_SITE = process.env.NEXT_PUBLIC_JB_VARIANT !== "default";
const ALL_ONLINE: ServiceStatus = { litellm: true, lmstudio: true, comfyui: true, ngrok: true };
const ALL_OFFLINE: ServiceStatus = { litellm: false, lmstudio: false, comfyui: false, ngrok: false };

const capabilities = [
  {
    name: "Hugging Face Cloud",
    description: "FLUX.1-schnell serverless image generation pipeline. Generates gorgeous, ultra-fast 1024x1024 photorealistic stills in under 3 seconds with zero local VRAM overhead.",
    stack: ["Inference API", "FLUX.1", "huggingface_hub", "Python"],
    url: "/.cursor/docs/IMAGE-WORKFLOW.md",
    service: "lmstudio" as const,
  },
  {
    name: "Mem0 Personal Memory",
    description: "Isolated vector memory store driving self-learning agent interactions. Runs a local Qdrant database embedded in the profile to persist user style, preferences, and workspace tasks.",
    stack: ["Qdrant", "LM Studio", "qwen3-4b-instruct", "sentence-transformers"],
    url: "/.cursor/docs/MEM0-LMSTUDIO.md",
    service: "lmstudio" as const,
  },
  {
    name: "DeepSeek AI (LiteLLM)",
    description: "Direct DeepSeek V4 Pro via local LiteLLM proxy. Thinking disabled for Cursor Agent compatibility. $0.435/M tokens — replaces the retired $100+ Vertex path.",
    stack: ["LiteLLM", "DeepSeek V4", "NGROK", "Cursor Agent"],
    url: "/.cursor/docs/DeepSeek-Master.md",
    service: "litellm" as const,
  },
  {
    name: "ComfyUI Local GPU",
    description: "Workstation pipeline on NVIDIA RTX 5060 Ti driving z-image-turbo GGUF, image-to-image editing, inpainting, 4K upscaling, facial restoration, and CogVideoX/SVD video generation.",
    stack: ["CUDA 12.8", "GGUF", "CogVideoX", "SVD-XT", "YOLO"],
    url: "/.cursor/docs/COMFYUI-MODELS.md",
    service: "comfyui" as const,
  },
  {
    name: "Google Workspace API",
    description: "OAuth-authenticated desktop control over Gmail, Calendar, and Drive. Enables agents to summarize inbox logs, list large cleanup candidates, and draft schedule summaries in plain English.",
    stack: ["OAuth2", "LiteLLM", "ngrok", "Google GCP"],
    url: "/.cursor/docs/GOOGLE-WORKSPACE.md",
    service: "ngrok" as const,
  },
];

const workstationLinks = [
  { name: "TRUTH.md", desc: "Constitutional constitution and baseline identities.", path: "TRUTH.md" },
  { name: "START-HERE.md", desc: "Canonical entry point, daily rituals, and guidelines.", path: ".cursor/docs/START-HERE.md" },
  { name: "MASTER-COMMANDS.md", desc: "Comprehensive CLI reference of all session and stack scripts.", path: ".cursor/docs/MASTER-COMMANDS.md" },
  { name: "Agent-Runbook.md", desc: "Copy-paste prompts for seamless Cursor and Hermes conversations.", path: ".cursor/docs/Agent-Runbook.md" },
  { name: "ReCall.md", desc: "Durable memory, ideas log, and current session focus goals.", path: ".cursor/docs/ReCall.md" },
];

const techStack = [
  "Next.js App Router", "React 18 / Tailwind", "TypeScript", "PowerShell Core",
  "Python Dotenv", "Hugging Face Hub", "Pillow / ImageOps", "Mem0 Vector Memory",
  "Qdrant Vector DB", "LM Studio Host", "LiteLLM DeepSeek Proxy", "ngrok secure tunnels",
  "ComfyUI Port 8188", "PyTorch 2.11 (CUDA 12.8)", "YOLO Face Detection", "CogVideoX-5B / SVD",
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const [status, setStatus] = useState<ServiceStatus>(IS_STATIC ? ALL_ONLINE : ALL_OFFLINE);
  const [loading, setLoading] = useState(!IS_STATIC);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => scrollY.on("change", (v) => setShowTop(v > 600)), [scrollY]);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/system/status");
      const data = await res.json();
      if (data.ok) setStatus(data.status);
    } catch {
      // server offline
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (IS_STATIC) return; // public export: no workstation to poll
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <>
      <ThreeBackground />
      <main className={`${styles.main} relative z-10`}>
      <div className={styles.scanline} aria-hidden="true" />

      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          <span className={styles.navLogoAccent}>&gt;</span> JONBEATZ
        </span>
        <div className={styles.navLinks}>
          <a href="#pipelines">PIPELINES</a>
          <a href="#workstation">WORKSTATION</a>
          <a href="#stack">TECH STACK</a>
        </div>
      </nav>

      {/* HERO */}
      <motion.section 
        className={styles.hero}
        style={{ y: heroY }}
      >
        {IS_DEV_SITE && (
          <div className={styles.heroPortal} aria-hidden="true">
            <div className={styles.portalScrim} />
            <div className={styles.portalBeam} />
            <div className={styles.portalBloom} />
          </div>
        )}
        <div className={styles.heroGrid} aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className={styles.heroGridCell} />
          ))}
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>// JONBEATZ_COMMAND_CENTER :: ACTIVE_STATION</p>
          <h1 className={styles.heroTitle}>
            {IS_DEV_SITE ? (
              <>JONBEATZ<span className={styles.heroTitleAccent}>.DEV</span></>
            ) : (
              <>JON-BEATZ<span className={styles.heroTitleAccent}>.COM</span></>
            )}
          </h1>
          <p className={styles.heroSub}>
            Personal AI Playground &amp; Automation Hub
          </p>
          <p className={styles.heroDesc}>
            Fully self-contained, high-fidelity command center driving private local models, 
            zero-VRAM cloud image generation, secure Google API scripts, and deep cognitive vector memory.
          </p>
          <div className={styles.heroCtas}>
            <a href="#pipelines" className={styles.ctaPrimary}>EXPLORE PIPELINES</a>
            <a href="#workstation" className={styles.ctaSecondary}>WORKSTATION TRUTH</a>
          </div>
          <p className={styles.heroStatus}>
            <span className={styles.statusDot} />
            WORKSPACE ACTIVE — D:\Hermes\projects\JonBeatz.dev
          </p>
        </div>
      </motion.section>

      {/* CAPABILITIES / PIPELINES */}
      <motion.section 
        className={styles.section} 
        id="pipelines"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>01</span>
          <h2 className={styles.sectionTitle}>ACTIVE PIPELINES</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.panelAura}>
        <div className={`${styles.projectsGrid} stagger-children`}>
          {capabilities.map((c) => {
            const online = status[c.service];
            return (
              <motion.div 
                key={c.name} 
                className={`${styles.projectCard} glow-accent-hover`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className={styles.projectCardTop}>
                  <span className={styles.projectName}>{c.name}</span>
                  <span className={`${styles.projectStatus} ${online ? styles.statusActive : styles.statusBuilding}`}>
                    {loading ? "..." : online ? "ONLINE" : "OFFLINE"}
                  </span>
                </div>
                <p className={styles.projectDesc}>{c.description}</p>
                <div className={styles.projectStack}>
                  {c.stack.map((s) => (
                    <span key={s} className={styles.tag}>{s}</span>
                  ))}
                </div>
                {IS_STATIC ? (
                  <span className={styles.projectLink}>READ DOCUMENTATION &rarr;</span>
                ) : (
                  <a href={c.url} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                    READ DOCUMENTATION &rarr;
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
        </div>
      </motion.section>

      {/* WORKSTATION KNOWLEDGE */}
      <motion.section 
        className={styles.section} 
        id="workstation"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>02</span>
          <h2 className={styles.sectionTitle}>WORKSTATION KNOWLEDGE</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={`${styles.panelAura} ${styles.panelBeam}`}>
        <div className={`${styles.projectsGrid} stagger-children`}>
          {workstationLinks.map((w) => (
            <motion.div 
              key={w.name} 
              className={`${styles.projectCard} glow-accent-hover`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className={styles.projectCardTop}>
                <span className={styles.projectName}>{w.name}</span>
                <span className={`${styles.projectStatus} ${styles.statusActive}`}>
                  TRUTH
                </span>
              </div>
              <p className={styles.projectDesc}>{w.desc}</p>
              <div className={styles.projectStack}>
                <span className={styles.tag}>{w.path}</span>
              </div>
              <span className={styles.projectLink}>VIEW FILE IN WORKSPACE &rarr;</span>
            </motion.div>
          ))}
        </div>
        </div>
      </motion.section>

      {/* TECH STACK */}
      <motion.section 
        className={styles.section} 
        id="stack"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>03</span>
          <h2 className={styles.sectionTitle}>WORKSTATION STACK</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.stackGrid}>
          {techStack.map((s, i) => (
            <motion.div 
              key={s} 
              className={styles.stackItem}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <span className={styles.stackAccent}>//</span> {s}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER CONSOLE */}
      <footer className={styles.footerConsole}>
        <div className={styles.footerConsoleLeft}>
          <div className={styles.waveform}>
            <div className={styles.wavebar} />
            <div className={styles.wavebar} />
            <div className={styles.wavebar} />
            <div className={styles.wavebar} />
            <div className={styles.wavebar} />
          </div>
          <span>J.A.R.V.I.S. ACTIVE SYSTEM</span>
          {!IS_DEV_SITE && (
            <div className={styles.statusCapsules}>
              {(Object.keys(PORT_LABELS) as Array<keyof ServiceStatus>).map((key) => (
                <div key={key} className={styles.capsule}>
                  <span className={`${styles.capsuleDot} ${status[key] ? styles.capsuleOnline : styles.capsuleOffline}`} />
                  {PORT_LABELS[key]}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.consoleActions}>
          {IS_DEV_SITE ? (
            <span className={styles.consoleLink}>&copy; 2026 &middot; Powered by VaderLabz</span>
          ) : (
            <>
              <span className={styles.consoleLink}>Ctrl+Shift+B Start Session</span>
              <span className={styles.consoleLink}>Ctrl+Shift+E End Session</span>
            </>
          )}
        </div>
      </footer>

      <button
        type="button"
        className={`${styles.scrollTop} ${showTop ? styles.scrollTopVisible : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <span className={styles.scrollTopArrow}>&uarr;</span>
      </button>
    </main>
    </>
  );
}

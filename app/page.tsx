'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaLinkedin } from "react-icons/fa6";

import {
  Mail,
 Menu, CircleX,  BadgeCheck,
  Phone,
  MapPin,
  Award,
  Code,
  Database,
  FileText,
  Users,
  TrendingUp,
  Download,
  ArrowRight,
  ExternalLink,
  Star,
  Zap,
  Target,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  X,
  Send,
  Link,
  MessageCircleMore,
  Globe,
  HeadphonesIcon,
  BarChart2,
  BrainCircuit,
} from 'lucide-react';

type Particle = {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

type ThemeAwareClassOptions = {
  dark: string;
  light: string;
};

export default function DeependerPremiumPortfolio() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const [beerCount, setBeerCount] = useState(420);
  const [showBeerAchievement, setShowBeerAchievement] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isMobileMenuOpenForModal, setIsMobileMenuOpenForModal] = useState(false);
const [showProjectsModal, setShowProjectsModal] = useState(false);
  const handleBeerClick = () => {
    setBeerCount((prev) => prev + 1);
    setShowBeerAchievement(true);

    window.setTimeout(() => {
      setShowBeerAchievement(false);
    }, 2200);
  };

  // form values
  
  const RESUME_VIEW_URL =
    'https://docs.google.com/document/d/1goFJDq8pAb8kbzO5bxXgfvy4rkmyH0-6-yw_7FkCvnI/edit?usp=sharing';
  const RESUME_DOWNLOAD_URL =
    'https://docs.google.com/document/d/1goFJDq8pAb8kbzO5bxXgfvy4rkmyH0-6-yw_7FkCvnI/export?format=pdf';

  // dynamic geolocation state
  const [visitorCity, setVisitorCity] = useState('India');
  const [visitorCountry, setVisitorCountry] = useState('IN');

  // contact form state
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Contact form submit
  const WEB3FORMS_ACCESS_KEY = '3918bdd2-1540-4605-b70d-8dffce6eaf53';

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('subject', 'New portfolio message from Deepender website');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setFormState('sent');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };
  // Dynamic geolocation popup
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data) => {
        if (data?.city) setVisitorCity(data.city);
        if (data?.country_code) setVisitorCountry(data.country_code);
      })
      .catch(() => { });
  }, []);

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const themeClass = ({ dark, light }: ThemeAwareClassOptions) => (isDark ? dark : light);

  const minutes = Math.floor(sessionSeconds / 60);
  const seconds = sessionSeconds % 60;

  useEffect(() => {
    setHasMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0) scale(${cursorVariant === 'hover' ? 1.35 : 1})`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorVariant]);

  // Hydration-safe particles
  useEffect(() => {
    setParticles(
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  // Session timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Intro + greeting sequence
  useEffect(() => {
    const t1 = window.setTimeout(() => { setShowIntro(false); setShowGreeting(true); }, 2800);
    const t2 = window.setTimeout(() => setShowGreeting(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Intersection observer for section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // ─── DATA ─────────────────────────────────────────────────────────────────

  const projects = [
  {
    title: 'Amazon Sales & Lead Analytics Dashboard',

    tagline: '100K+ transactions analyzed · 65% revenue in top 3 categories · 93% reporting time reduction',

    description: 'A complete BA Analyst case study using a real 100K-row Amazon-style e-commerce dataset from Kaggle. Transforms raw transaction data into actionable business insights.',
 
    challenge: "Amazon's sales leadership could not identify which product categories, regions, and customer segments drive the highest conversion value. Budget was allocated uniformly across all channels — resulting in an estimated 30–40% of marketing spend on low-ROI categories.",

    approach: [
      'Downloaded real 100K-row Amazon-style sales dataset from Kaggle (20 columns, product categories, regions, customer segments)',
      'Built star schema data model optimised for Power BI reporting with defined relationships and calculated columns',
      'Created interactive Power BI dashboard with DAX measures for YoY growth, customer lifetime value, and segment performance',
    ],

    tools: ['SQL', 'Power BI', 'DAX', 'Excel', 'Data Modeling', ],
    outcomes: [
      'Identified top 3 product categories generating 65% of total revenue — Pareto concentration confirmed',
      'Reduced monthly reporting cycle from 8 hours to 30 minutes — 93% time saving quantified',
      'Delivered 2–3 budget reallocation recommendations backed by SQL-derived data — actionable, not just descriptive',
    ],
    metrics: { transactions: '100K+', reporting: '93% faster', impact: '65% revenue in top 3' },
    BadgeCheck: '#',
    demo: '#',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Flight Booking Process Improvement Analysis',

    tagline: '~20% SLA compliance improvement · 6 critical gaps identified',

    description: 'A complete BA case study on airline disruption rebooking workflows — from stakeholder analysis and BPMN 2.0 process mapping to gap analysis, requirements documentation, and business recommendations. Based on real operational experience managing KLM airline workflows at IGT Solutions, Gurugram.',

    challenge: 'During peak flight disruption events, the operations team experienced a 35–45% spike in average case handling time and a 20–30% rise in passenger escalation volume. Rebooking, compensation, and seat reallocation workflows were fragmented — no automated handoffs between systems, no documented escalation criteria, and no real-time SLA visibility for team leads.',

    approach: [
      'Mapped stakeholder landscape across 7 roles: Airline Ops Manager, Frontline Agent, GDS Admin, Passenger, CRM Owner, Customer Service Manager, Compliance',
      'Built As-Is BPMN 2.0 process map in Draw.io — 4 swimlanes, 6 pain points annotated across disruption detection to case closure',
      'Designed To-Be process with 4 automation triggers: GDS pre-population, auto compensation calculation, CRM auto-logging, passenger notification',
    ],
    tools: ['BPMN 2.0', 'Draw.io', 'BRD', 'Stakeholder Analysis', 'RACI Matrix', ],
    
    outcomes: [
      'Identified 6 critical workflow gaps across disruption handling — SOP documentation, escalation criteria, GDS integration, compensation calculation, notifications, and performance monitoring',
      'Proposed GDS API integration eliminating 3–5 minutes of manual lookup per rebooking case — highest-impact fix',
      'Designed automated passenger notification within 30 minutes — replacing 30–90 minute manual delay',
    ],
    metrics: { gaps: '6 identified', sla: '~20% improvement', defensibility: '10/10' },
    BadgeCheck: '#',
    demo: '#',
    color: 'from-purple-500 to-pink-500',
  },
];

  // ─── OTHER PROJECTS (NEW) ─────────────────────────────────────────────────
  const otherProjects = [
    {
      title: '18 Candleriggs - Hotel Booking Platform',
      company: 'Super Minds IT',
      description: 'Event & booking platform for hotels, restaurants, and live event ticketing with real-time availability.',
      tech: ['React', 'Next.js', 'REST API', 'Tailwind'],
      url: 'https://18candleriggs.com/',
      emoji: '🕯️',
      color: 'from-rose-500 to-pink-600',
    },
    {
      title: 'Web3 Admin Dashboard',
      company: 'Casino Client',
      description: 'MetaMask-connected admin panel with crypto transactions (DAI/ETH/USDT/USDC), analytics charts & refund management.',
      tech: ['Web3.js', 'MetaMask', 'Chart.js', 'React'],
      url: '#',
      emoji: '⛓️',
      color: 'from-violet-500 to-purple-700',
    },
    {
      title: 'Affiliate Pages (~20)',
      company: 'Super Minds IT',
      description: '20+ high-conversion affiliate booking pages. Drove ₹10L+ revenue with optimised page load < 2s.',
      tech: ['HTML', 'CSS', 'JavaScript', 'SEO'],
      url: '#',
      emoji: '📄',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Netflix Clone',
      company: 'Client Project',
      description: 'Full streaming platform clone with movie browsing, genre filtering, and video playback for a client.',
      tech: ['React', 'TMDB API', 'Firebase', 'Styled Components'],
      url: '#',
      emoji: '🎬',
      color: 'from-red-600 to-red-800',
    },
  ];

  const skills = {
    'Business Analysis Core': {
      items: ['Requirements Gathering', 'Process Analysis', 'Gap Analysis', 'Stakeholder Management', 'BRD/FRD Documentation', 'User Stories & Use Cases', 'BPMN 2.0 Modeling', 'Root Cause Analysis'],
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
    'Data & Reporting': {
      items: ['SQL (Joins, CTEs, Window Functions)', 'Power BI Dashboards', 'DAX Formulas', 'Excel (Advanced)', 'Data Validation', 'KPI Development', 'Data Modeling'],
      icon: Database,
      color: 'from-purple-500 to-pink-500',
    },
    'APIs & Development': {
      items: ['REST APIs', 'React.js/Next.js', 'SEO Optimization', 'Postman Testing', 'API Documentation', 'Swagger/OpenAPI', 'Webhook Concepts', 'OAuth2 Authentication'],
      icon: Code,
      color: 'from-green-500 to-emerald-500',
    },
    'Agile & Collaboration': {
      items: ['JIRA Administration', 'Confluence Documentation', 'Agile/Scrum Ceremonies', 'Sprint Planning', 'Azure DevOps', 'Git Version Control', 'Kanban Workflows'],
      icon: Users,
      color: 'from-orange-500 to-red-500',
    },
    'Cloud & DevOps': {
      items: ['AWS Cloud Practitioner', 'Azure Fundamentals', 'CI/CD Pipelines', 'Docker Basics', 'Azure App Insights', 'Log Analytics', 'Cloud Architecture'],
      icon: Award,
      color: 'from-indigo-500 to-blue-500',
    },
    'Automation & AI': {
      items: ['Power Automate Workflows', 'Power Apps Development', 'RPA Concepts', 'ChatGPT/GenAI', 'Prompt Engineering', 'Process Automation'],
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
  };

  const timeline = [
    {
      year: '2025 - 2026',
      title: 'Operations Business Analyst',
      company: 'IGT Solutions',
      location: 'Gurugram, India',
      description: 'Currently managing multi-LOB airline operations, analyzing processes, and driving data-backed improvements. This is where I discovered my passion for Business Analysis.',
    achievements: [
  'Gathered and analyzed requirements across multiple business functions',
  'Performed process analysis and identified operational improvements',
  'Built KPI reports to support performance tracking and decision-making',
  'Collaborated with stakeholders to enhance workflows and service delivery',
],
      skills: ['Process Analysis', 'Multi-LOB Management', 'Operational Reporting', 'Stakeholder Coordination'],
      icon: Target,
    },
    {
      year: '2024 - 2025',
      title: 'Technical Support Analyst (L1) — US Telecom Client',
      company: 'Concentrix',
      location: 'Gurugram, India',
      description: 'Transitioned to technical support for US telecom client. Developed strong analytical and problem-solving skills while maintaining high customer satisfaction under pressure.',
      achievements: [
        'Handled 30-40 customer escalations daily with 95%+ CSAT',
        'Consistently met SLA targets for response and resolution time',
        'Created detailed incident documentation improving L2/L3 efficiency',
        'Diagnosed complex network issues using systematic root cause analysis',
      ],
      skills: ['Root Cause Analysis', 'Technical Documentation', 'SLA Management', 'Customer Success'],
      icon: Briefcase,
    },
    {
      year: '2022 - 2024',
      title: 'Frontend Developer & QA Analyst',
      company: 'Super Minds IT Services',
      location: 'Gurugram, India',
      description: 'Started my tech journey building React.js applications. Created 20+ affiliate booking pages, integrated REST APIs, and learned the fundamentals of translating business requirements into technical solutions.',
      achievements: [
        'Built 20+ high-conversion booking pages generating ₹10L+ revenue',
        'Optimized page load time from 4s to <2s (50% improvement)',
        'Integrated 15+ third-party APIs using Postman for testing',
        'Collaborated with marketing team on SEO strategy (30% traffic increase)',
      ],
      skills: ['React.js', 'REST APIs', 'Postman', 'SEO', 'Stakeholder Communication'],
      icon: Code,
    },
  ];

  // ─── CAREER PATH (NEW) ────────────────────────────────────────────────────
  const careerPath = [
    { role: 'Frontend\nDeveloper', icon: Code, color: 'from-cyan-400 to-blue-500', year: '2022' },
    { role: 'Support Engineer', icon: HeadphonesIcon, color: 'from-purple-400 to-pink-500', year: '2024' },
    { role: 'Operations\nAnalyst', icon: BarChart2, color: 'from-green-400 to-emerald-500', year: '2025' },
    { role: 'Business\nAnalyst', icon: BrainCircuit, color: 'from-amber-400 to-orange-500', year: 'Now →' },
  ];

  const certifications = [
    {
      name: 'The Complete GEN AI For Business Analysis',
      issuer: 'Analysts corner',
      date: '2026',
      color: 'from-orange-500 to-yellow-500',
      link:'https://drive.google.com/file/d/1jT2bJ77P9HPXX82w11ZSZVaLpWl_ontN/view',
      crediantial:'AI-0351-2605'
    },
    {
      name: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2025',
      color: 'from-blue-500 to-cyan-500',
      link:'https://www.udemy.com/certificate/UC-f8589ae2-9b7e-4ed8-b155-4768ca74f8d0/',
      crediantial:'AZ-900'

    },
     {
      name: 'Business Analysis "A to Z" Masterclass',
      issuer: 'UDEMY, Meetu Patel',
      date: '2026',
      color: 'from-orange-500 to-yellow-500',
      link:'https://www.udemy.com/certificate/UC-0e3dff73-ccba-4169-890c-ccada81b3bee/',
      crediantial:''

    },
  ];

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        Initializing portfolio...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${themeClass({
        dark: 'bg-black text-white',
        light: 'bg-zinc-50 text-zinc-950',
      })} transition-colors duration-500 overflow-x-hidden cursor-auto md:cursor-none`}
    >
      {/* ── Intro Screen ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-green-400 font-mono"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[90%] max-w-4xl border border-green-500/50 bg-black/90 shadow-[0_0_60px_rgba(34,197,94,0.25)]"
            >
              <div className="border-b border-green-500/30 px-6 py-4 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-6 text-xs md:text-sm text-green-500">deepender@portfolio:~$ ./welcome.sh</span>
              </div>
              <div className="p-8 space-y-3 text-sm md:text-base">
                <p>&gt; Initializing portfolio...</p>
                <p>&gt; Loading business analyst mindset... OK</p>
                <p>&gt; Connecting recruiters matrix... OK</p>
                <p>&gt; Opening opportunities... 🍻 OK</p>
                <p>&gt; Deploying creativity... OK</p>
                <p className="font-bold text-green-300">&gt; System ready. Let&apos;s build impact! 🎉</p>
                <motion.h1
                  className="pt-8 text-5xl md:text-7xl font-black tracking-tight text-green-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  DEEPENDER
                </motion.h1>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Geolocation Greeting Popup ───────────────────────────────────── */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            className="fixed top-20 right-4 md:top-24 md:right-6 z-[80] border-2 border-orange-400 bg-black/90 px-4 py-4 md:px-6 md:py-5 text-white shadow-[0_0_40px_rgba(251,146,60,0.25)] max-w-[280px] md:max-w-sm"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <button
              type="button"
              aria-label="Close greeting"
              onClick={() => setShowGreeting(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
            <div className="flex items-center gap-3 md:gap-4 pr-6">
              <div className="text-2xl md:text-3xl font-black font-serif text-orange-400">
                {visitorCountry}
              </div>
              <div>
                <div className="font-bold text-base md:text-lg">Namaste from India! 🙏</div>
                <div className="text-xs md:text-sm text-slate-400">
                  Visitor from{' '}
                  <span className="text-orange-400 font-semibold">{visitorCity}, India</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Session Timer ─────────────────────────────────────────────────── */}
      <motion.div
        className="fixed bottom-6 left-6 z-[70] border border-green-500/40 bg-black/80 px-5 py-4 font-mono text-green-400 backdrop-blur-xl shadow-[0_0_35px_rgba(34,197,94,0.16)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-bold">● Session time</p>
        <h3 className="text-2xl font-black text-white">
          {minutes}m {seconds}s
        </h3>
        <p className="text-xs text-slate-500">True dedication! 💪</p>
      </motion.div>

      {/* ── Custom Cursor ─────────────────────────────────────────────────── */}
      {hasMounted && (
        <div
          ref={cursorRef}
          className="fixed left-0 top-0 h-4 w-4 rounded-full border-2 border-white bg-white/20 pointer-events-none z-[1000] hidden md:block will-change-transform"
        />
      )}

      {/* ── Animated Background ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${themeClass({ dark: 'bg-gradient-to-br from-black via-zinc-950 to-emerald-950 opacity-95', light: 'bg-gradient-to-br from-zinc-50 via-white to-emerald-50 opacity-95' })}`} />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(45, 207, 105, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.16) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
            y: y1,
            opacity,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"
          style={{ y: y2 }}
          animate={{ x: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
     <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className={`fixed top-0 left-0 right-0 w-full ${themeClass({
    dark: 'bg-black/85 border-green-500/20',
    light: 'bg-white/85 border-green-500/30',
  })} backdrop-blur-xl z-40 border-b`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <motion.a href="#hero" className="text-3xl font-bold" whileHover={{ scale: 1.1 }}>
      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        DC
      </span>
    </motion.a>

    {/* Desktop Menu */}
    <div className="hidden lg:flex gap-8 items-center">
      {['About', 'Journey', 'Projects', 'Skills', 'Contact'].map((item) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          className={`${themeClass({
            dark: 'text-slate-300',
            light: 'text-zinc-700',
          })} hover:text-green-400 transition-colors relative`}
          whileHover={{ y: -2 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {item}

          {activeSection === item.toLowerCase() && (
            <motion.div
              layoutId="activeSection"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400"
            />
          )}
        </motion.a>
      ))}

      <motion.button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full border border-green-500/40 p-3 text-green-400 hover:bg-green-500/10"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-black"
      >
        Hire Me
      </motion.a>
    </div>

    {/* Mobile Buttons */}
    <div className="flex lg:hidden items-center gap-3">
      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className="rounded-full border border-green-500/40 p-2.5 text-green-400 hover:bg-green-500/10"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="rounded-full border border-green-500/40 p-2.5 text-green-400 hover:bg-green-500/10"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown */}
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.22 }}
        className={`${themeClass({
          dark: 'bg-black/95 border-green-500/20 text-white',
          light: 'bg-white/95 border-green-500/30 text-zinc-950',
        })} lg:hidden border-t px-4 sm:px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]`}
      >
        <div className="flex flex-col gap-4">
          {['About', 'Journey', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold hover:text-green-400 transition-colors"
            >
              {item}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 text-center font-bold text-black"
          >
            Hire Me
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.nav>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <AnimatePresence>
          {showBeerAchievement && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 180 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[90] rounded-xl bg-yellow-400 px-5 sm:px-8 py-4 text-black font-black text-sm sm:text-xl shadow-[0_0_45px_rgba(250,204,21,0.55)]"
            >
              🏆 Achievement Unlocked: 🥴 Absolutely Wasted!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-green-400 font-mono mb-4 flex items-center gap-2"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Star size={20} />
            </motion.div>
            Hi, my name is
          </motion.div>

          <motion.h1
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 ${themeClass({
              dark: 'from-white via-green-300 to-emerald-500',
              light: 'from-zinc-950 via-green-600 to-emerald-600',
            })} bg-gradient-to-r bg-clip-text text-transparent leading-[0.95]`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            Deepender <br />
            Choudhary
          </motion.h1>

          <motion.h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${themeClass({
              dark: 'text-slate-400',
              light: 'text-zinc-700',
            })} mb-8 leading-tight`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            I work across{' '}
            <span className="text-green-400">operations</span>, technology, and business execution.
          </motion.h2>


          <motion.div
            className="flex flex-col sm:flex-row gap-5 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group text-black"
            >
              See My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href={RESUME_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-green-400 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-400/10 transition-colors"
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Stats directly below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl"
          >
            {[
              { number: '3.5+', label: 'years across tech, support & operations' },
              { number: '20+', label: 'pages and projects shipped' },
              { number: 'Ops + Tech', label: 'bridging operations with technology' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.03 }}
                className="rounded-2xl border border-green-500/30 bg-black/40 p-5 backdrop-blur-xl"
              >
                <div className="text-3xl md:text-5xl font-black text-white">
                  {stat.number}
                </div>
                <div className="mt-1 text-sm text-green-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}

            <motion.button
              type="button"
              onClick={handleBeerClick}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="text-left rounded-2xl border border-green-500/30 bg-black/40 p-5 backdrop-blur-xl group"
            >
              <div className="text-3xl md:text-5xl font-black text-white">
                {beerCount}
                <span className="ml-1 text-green-400">🍺</span>
              </div>
              <div className="mt-1 text-sm text-slate-400 group-hover:text-green-400 transition-colors">
                beers consumed — click carefully
              </div>
            </motion.button>
          </motion.div>

          <motion.div className="flex gap-6 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
            {[
              { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/deepender-choudhary-337958248/' },
              { Icon: Mail, href: 'mailto:deependerchoudhary2003@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}
              >
                <Icon size={28} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-green-400" size={40} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT / STORY SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="min-h-screen px-4 sm:px-6 py-20 sm:py-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black flex items-center gap-4 sm:gap-6">
              <span className="text-green-400 font-mono text-2xl sm:text-3xl">01.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                My Story
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              className={`space-y-6 text-base sm:text-lg leading-relaxed ${themeClass({
                dark: 'text-slate-300',
                light: 'text-zinc-700',
              })}`}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400 leading-tight">
                I did not start with a perfect roadmap. I learned by moving, building, and correcting.
              </h3>

              <p>
                My first serious phase was preparing for the Indian Army. That period gave me
                discipline, structure, patience, and the habit of showing up consistently.
              </p>

              <p>
                Later, I moved toward technology and startups. I started understanding how websites,
                products, customers, and business operations connect in the real world.
              </p>

              <p>
                At <span className="text-emerald-400 font-semibold">Super Minds</span>, I worked on real
                projects, built pages, improved user flows, and saw how execution details affect
                business outcomes.
              </p>

              <p>
                At <span className="text-lime-400 font-semibold">Concentrix</span>, I worked in technical
                support. It taught me how to stay calm, understand problems quickly, communicate
                clearly, and document issues properly.
              </p>

              <p>
                Now at <span className="text-green-400 font-semibold">IGT Solutions</span>, I work around
                airline operations and business processes. I am learning how systems, teams,
                workflows, and customer impact come together at scale.
              </p>

              <motion.div
                className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34, 197, 94, 0.25)' }}
              >
                <h4 className="text-2xl font-bold text-green-400 mb-3">How I work</h4>
                <p>
                  I like practical work more than theory. Army preparation gave me discipline;
                  startups and operations taught me speed, ownership, and problem-solving.
                  I try to understand the problem, take action, and improve through real feedback.
                </p>
              </motion.div>

              

              <p className="text-xl font-bold text-green-400">
                Long term, I want to build useful products and solve problems where execution matters.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-green-400">Certifications</h3>

                {certifications.map((cert, i) => (
  <motion.a
    key={i}
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`${themeClass({
      dark: 'bg-black/50 border-green-500/30',
      light: 'bg-white/80 border-green-500/30',
    })} p-5 sm:p-6 border-2 rounded-xl block`}
    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.25)' }}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <div
          className={`${themeClass({
            dark: 'text-white',
            light: 'text-zinc-950',
          })} font-bold text-base sm:text-lg mb-1`}
        >
          {cert.name}
        </div>
        <div
          className={`${themeClass({
            dark: 'text-slate-400',
            light: 'text-zinc-600',
          })} text-sm`}
        >
          {cert.issuer} • {cert.date}
        </div>
        <div className="text-green-400 text-sm font-mono mt-1">
          {cert.crediantial}
        </div>
      </div>
      <Award className="text-green-400 shrink-0" size={28} />
    </div>
  </motion.a>
))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-green-400">Quick Facts</h3>

                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: 'Location', value: 'Gurugram, Haryana, India' },
                    { icon: GraduationCap, label: 'Education', value: 'BCA, Shri Khushal Das University' },
                    { icon: Target, label: 'Current Focus', value: 'Business analysis, operations, cloud fundamentals, and product thinking' },
                  ].map((fact, i) => (
                    <motion.div key={i} className="flex items-start gap-3" whileHover={{ x: 5 }}>
                      <fact.icon className="text-green-400 shrink-0 mt-1" size={20} />
                      <div>
                        <div
                          className={`${themeClass({
                            dark: 'text-white',
                            light: 'text-zinc-950',
                          })} font-semibold`}
                        >
                          {fact.label}
                        </div>
                        <div
                          className={`${themeClass({
                            dark: 'text-slate-400',
                            light: 'text-zinc-600',
                          })} text-sm`}
                        >
                          {fact.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          JOURNEY SECTION — Enhanced with career path visual + animated cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="journey" className={`min-h-screen px-4 sm:px-6 py-16 sm:py-24 relative ${themeClass({ dark: 'bg-slate-900/20', light: 'bg-emerald-50/40' })}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-6 flex items-center gap-4 sm:gap-6">
              <span className="text-green-400 font-mono text-2xl sm:text-3xl">02.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">My Journey</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
            <p className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl`}>
              Every role taught me something the next one needed. No wasted steps — just a deliberate path.
            </p>
          </motion.div>

          {/* ── Career Path Visual Flow (NEW) ──────────────────────────────── */}
          <div className="mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              className="relative"
            >
              {/* Desktop: horizontal flow */}
              <div className="hidden md:flex items-center justify-between relative">
                {/* Connecting gradient line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 via-green-500 to-amber-500 -translate-y-1/2 z-0" />

                {careerPath.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ delay: i * 0.18 }}
                    className="relative z-10 flex flex-col items-center"
                    style={{ width: '22%' }}
                  >
                    {/* Year label */}
                    <motion.div
                      className={`text-xs font-mono mb-3 px-3 py-1 ${themeClass({ dark: 'bg-slate-800 border-slate-700 text-slate-400', light: 'bg-white border-zinc-200 text-zinc-500' })} rounded-full border`}
                      whileHover={{ borderColor: 'rgb(34 197 94)', color: 'rgb(34 197 94)' }}
                    >
                      {step.year}
                    </motion.div>

                    {/* Icon circle */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-4 ${themeClass({ dark: 'border-black', light: 'border-zinc-50' })} mb-4`}
                      whileHover={{ scale: 1.15, rotate: 6, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <step.icon className="text-white" size={28} />
                    </motion.div>

                    {/* Role name */}
                    <div className={`text-center text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent whitespace-pre-line leading-tight`}>
                      {step.role}
                    </div>

                    {/* Current / Target badge */}
                    {i === careerPath.length - 1 && (
                      <motion.div
                        className="mt-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-xs font-mono"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Target
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile: vertical flow */}
              <div className="flex md:hidden flex-col gap-4 relative pl-8">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500" />
                {careerPath.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 relative"
                  >
                    <div className={`absolute -left-4 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center border-2 ${themeClass({ dark: 'border-black', light: 'border-zinc-50' })}`}>
                      <step.icon size={14} className="text-white" />
                    </div>
                    <div className={`ml-4 ${themeClass({ dark: 'bg-slate-800/60 border-slate-700', light: 'bg-white/80 border-zinc-200' })} rounded-xl px-4 py-3 border`}>
                      <div className={`text-xs font-mono ${themeClass({ dark: 'text-slate-400', light: 'text-zinc-500' })}`}>{step.year}</div>
                      <div className={`text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.role.replace('\n', ' ')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Detailed Timeline Cards ─────────────────────────────────────── */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3 sm:left-5 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-lime-500" />
            <div className="space-y-8 sm:space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.12, duration: 0.45 }}
                  className="relative pl-10 sm:pl-14 md:pl-20"
                >
                  <motion.div
                    className="absolute left-0 sm:left-2 md:left-5 top-5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center border-4 border-black"
                    whileHover={{ scale: 1.2 }}
                  >
                    <item.icon size={14} />
                  </motion.div>

                  <motion.div
                    className={`${themeClass({
                      dark: 'bg-black/50 border-green-500/20',
                      light: 'bg-white/80 border-green-500/30',
                    })} backdrop-blur-xl border rounded-2xl p-4 sm:p-5 md:p-6 hover:border-green-500/50 transition-all`}
                    whileHover={{
                      y: -4,
                      boxShadow: '0 12px 35px rgba(34, 197, 94, 0.14)',
                    }}
                  >
                    <div className="mb-3">
                      <div className="text-green-400 font-mono text-xs sm:text-sm mb-1">
                        {item.year}
                      </div>

                      <h3
                        className={`${themeClass({
                          dark: 'text-white',
                          light: 'text-zinc-950',
                        })} text-xl sm:text-2xl md:text-3xl font-bold mb-1`}
                      >
                        {item.title}
                      </h3>

                      <div className="text-emerald-400 font-semibold flex flex-wrap items-center gap-2 text-sm">
                        {item.company}
                        <span className="text-slate-500">•</span>
                        <span
                          className={`${themeClass({
                            dark: 'text-slate-400',
                            light: 'text-zinc-600',
                          })}`}
                        >
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`${themeClass({
                        dark: 'text-slate-300',
                        light: 'text-zinc-700',
                      })} mb-4 text-sm sm:text-base leading-relaxed`}
                    >
                      {item.description}
                    </p>

                    <div className="mb-4">
                      <div className="text-xs sm:text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                        <Star size={14} /> Key Achievements
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.achievements.map((achievement, j) => (
                          <motion.li
                            key={j}
                            className={`${themeClass({
                              dark: 'text-slate-300',
                              light: 'text-zinc-700',
                            })} text-xs sm:text-sm flex items-start gap-2`}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ delay: j * 0.05 }}
                          >
                            <ChevronRight className="text-green-400 shrink-0 mt-0.5" size={14} />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, j) => (
                        <motion.span
                          key={j}
                          className="px-2.5 py-1 bg-green-500/15 text-green-300 rounded-full text-[11px] sm:text-xs border border-green-500/25"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS SECTION — Featured (mobile-fixed) + Other Projects grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="min-h-screen px-4 sm:px-6 py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-12 sm:mb-16 flex items-center gap-4 sm:gap-6">
              <span className="text-green-400 font-mono text-2xl sm:text-3xl">03.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Projects & Work</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          {/* ── Featured Projects (mobile-responsive) ──────────────────────── */}
          <div className="space-y-16 sm:space-y-24 mb-24 sm:mb-32">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: '-80px' }}
                transition={{ duration: 0.75, delay: i * 0.18, type: 'spring', stiffness: 80 }}
                className="relative"
              >
                <motion.div
                  className={`${themeClass({ dark: 'from-black/40 to-slate-950/40 border-green-500/30', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} relative bg-gradient-to-br backdrop-blur-xl border-2 rounded-3xl p-6 sm:p-10 overflow-hidden group`}
                  whileHover={{ scale: 1.015, y: -8, boxShadow: '0 25px 80px rgba(34, 197, 94, 0.16)' }}
                >
                  <motion.div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`absolute top-0 right-0 text-7xl sm:text-9xl font-black ${themeClass({ dark: 'text-slate-800/20', light: 'text-zinc-200/80' })} select-none`}>0{i + 1}</div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                      <div className="flex-1">
                        <motion.div className="text-green-400 font-mono text-xs sm:text-sm mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                          Featured Project
                        </motion.div>
                        <h3 className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} text-2xl sm:text-4xl font-black mb-3 group-hover:text-green-400 transition-colors`}>{project.title}</h3>
                        <p className={`text-base sm:text-xl font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>{project.tagline}</p>
                        <p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-sm sm:text-lg leading-relaxed max-w-3xl`}>{project.description}</p>
                      </div>
                      <div className="flex gap-4 sm:ml-8">
                        <motion.a href={project.BadgeCheck} whileHover={{ scale: 1.2, rotate: 5 }} className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}>
                          <BadgeCheck size={28} />
                        </motion.a>
                        <motion.a href={project.demo} whileHover={{ scale: 1.2, rotate: -5 }} className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}>
                          <ExternalLink size={28} />
                        </motion.a>
                      </div>
                    </div>

                    {/* Challenge & Approach — stacked on mobile, 2-col on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                      <div className={`${themeClass({ dark: 'bg-slate-900/70 border-slate-700', light: 'bg-white/70 border-zinc-200' })} rounded-2xl p-4 sm:p-6 border`}>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Target className="text-red-400" size={20} />
                          <h4 className="text-base sm:text-xl font-bold text-red-400">The Challenge</h4>
                        </div>
                        <p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} leading-relaxed text-sm sm:text-base`}>{project.challenge}</p>
                      </div>
                      <div className={`${themeClass({ dark: 'bg-slate-900/70 border-slate-700', light: 'bg-white/70 border-zinc-200' })} rounded-2xl p-4 sm:p-6 border`}>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Zap className="text-yellow-400" size={20} />
                          <h4 className="text-base sm:text-xl font-bold text-yellow-400">My Approach</h4>
                        </div>
                        <ul className="space-y-2">
                          {project.approach.map((step, j) => (
                            <motion.li
                              key={j}
                              className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-xs sm:text-sm flex items-start gap-2`}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.08 }}
                            >
                              <ArrowRight className="text-green-400 shrink-0 mt-0.5" size={14} />
                              {step}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <TrendingUp className="text-green-400" size={20} />
                        <h4 className="text-base sm:text-xl font-bold text-green-400">Outcomes & Impact</h4>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {project.outcomes.map((outcome, j) => (
                          <motion.li
                            key={j}
                            className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-xs sm:text-sm flex items-start gap-2`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: j * 0.08 }}
                          >
                            <Star className="text-green-400 shrink-0 mt-0.5" size={14} />
                            {outcome}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-3 sm:gap-6 mb-6 sm:mb-8">
                      {Object.entries(project.metrics).map(([key, value], j) => (
                        <motion.div
                          key={j}
                          className={`${themeClass({ dark: 'bg-slate-900/70', light: 'bg-white/80' })} rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-green-500/30`}
                          whileHover={{ scale: 1.05, borderColor: 'rgb(34 197 94)' }}
                        >
                          <div className={`text-xl sm:text-3xl font-black bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>{value}</div>
                          <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-xs capitalize`}>{key}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.tools.map((tool, j) => (
                        <motion.span
                          key={j}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${project.color} bg-opacity-10 text-white rounded-lg text-xs sm:text-sm font-semibold border border-white/10`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.05 }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Other Projects Grid (NEW) ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl">📁</span>
              <h3 className={`text-xs sm:text-sm font-bold tracking-[0.25em] ${themeClass({ dark: 'text-slate-400', light: 'text-zinc-500' })} uppercase`}>
                Other Projects
              </h3>
              <div className={`flex-1 h-px ${themeClass({ dark: 'bg-slate-700', light: 'bg-zinc-200' })}`} />
            </div>

            {/* Grid: 1 col → 2 col → 4 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {otherProjects.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)' }}
                  className={`group relative ${themeClass({ dark: 'bg-slate-900/60 border-slate-700 hover:border-green-500/60', light: 'bg-white/70 border-zinc-200 hover:border-green-400/60' })} border rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                  {/* Top row: emoji + external link */}
                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="text-2xl">{proj.emoji}</div>
                    {proj.url !== '#' ? (
                      <motion.a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className={`${themeClass({ dark: 'text-slate-600 hover:text-green-400', light: 'text-zinc-400 hover:text-green-500' })} transition-colors`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    ) : (
                      <div className={`${themeClass({ dark: 'text-slate-700', light: 'text-zinc-300' })}`}>
                        <Globe size={16} />
                      </div>
                    )}
                  </div>

                  {/* Title + company */}
                  <div className="relative z-10 mb-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`${themeClass({ dark: 'text-white group-hover:text-green-400', light: 'text-zinc-950 group-hover:text-green-600' })} font-bold text-base transition-colors leading-tight`}>
                        {proj.title}
                      </h4>
                      <span className={`${themeClass({ dark: 'text-slate-500', light: 'text-zinc-400' })} text-xs font-mono shrink-0 mt-0.5`}>{proj.company}</span>
                    </div>
                    <p className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-xs leading-relaxed`}>{proj.description}</p>
                  </div>

                  {/* Tech tags */}
                  <div className="relative z-10 flex flex-wrap gap-1.5">
                    {proj.tech.map((t, j) => (
                      <span
                        key={j}
                        className={`px-2 py-0.5 ${themeClass({ dark: 'bg-slate-800 text-slate-400 border-slate-700 group-hover:border-slate-600', light: 'bg-zinc-100 text-zinc-500 border-zinc-200 group-hover:border-zinc-300' })} text-xs rounded-md border transition-colors`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
           </div>
        </motion.div>

        {/* ── View All Projects Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={() => setShowProjectsModal(true)}
            whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(34,197,94,0.45)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 rounded-2xl font-black text-lg overflow-hidden border-2 border-green-400 text-white"
          >
            {/* animated gradient background */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-green-400 group-hover:text-black transition-colors duration-300">📁</span>
              <span className="text-white group-hover:text-black transition-colors duration-300">
                View All Portfolio Projects
              </span>
              <motion.span
                className="text-green-400 group-hover:text-black transition-colors duration-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        </div>
      </section>
      

      {/* ═══════════════════════════════════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="skills" className={`min-h-screen px-6 py-32 relative ${themeClass({ dark: 'bg-slate-900/20', light: 'bg-emerald-50/40' })}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6">
              <span className="text-green-400 font-mono text-3xl">04.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Skills & Expertise</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, data], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 90 }}
              >
                <motion.div
                  className={`${themeClass({ dark: 'from-black/50 to-slate-950/50 border-green-500/20', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} h-full bg-gradient-to-br backdrop-blur-xl border-2 rounded-2xl p-8 group`}
                  whileHover={{ scale: 1.04, y: -8, borderColor: 'rgb(34 197 94)', boxShadow: '0 25px 70px rgba(34, 197, 94, 0.18)' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div className={`p-3 bg-gradient-to-r ${data.color} rounded-xl`} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <data.icon className="text-white" size={28} />
                    </motion.div>
                    <h3 className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} text-2xl font-bold`}>{category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {data.items.map((skill, j) => (
                      <motion.li
                        key={j}
                        className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} flex items-start gap-2 group/item`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span className="text-green-400 shrink-0 mt-1" whileHover={{ scale: 1.5 }}>▹</motion.span>
                        <span className="group-hover/item:text-green-400 transition-colors">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-32 relative">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-center flex items-center justify-center gap-6">
              <span className="text-green-400 font-mono text-3xl">05.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Let&apos;s Work Together</span>
            </h2>
          </motion.div>

          <motion.p
            className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-2xl mb-16 max-w-3xl mx-auto text-center leading-relaxed`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            I am actively looking for{' '}
            <span className="text-green-400 font-bold">Business Analyst opportunities</span> where I can contribute from day one.
            If you are hiring or want to discuss how my operational background can add value to your team,{' '}
            <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold`}>let us connect</span>.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Mail, label: 'Email', value: 'deependerchoudhary2003@gmail.com', href: 'mailto:deependerchoudhary2003@gmail.com', color: 'from-red-500 to-orange-500' },
              { icon: Phone, label: 'Phone', value: '+91 9729880411', href: 'tel:+919729880411', color: 'from-green-500 to-emerald-500' },
              { icon: FaLinkedin, label: 'LinkedIn', value: 'Connect with me', href: '#', color: 'from-blue-500 to-cyan-500' },
              { icon: MessageCircleMore, label: 'WhatsApp', value: 'Chat directly', href: 'https://wa.me/919729880411', color: 'from-green-400 to-teal-500' },
            ].map((contact, i) => (
              <motion.a
                key={i}
                href={contact.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 90 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${themeClass({ dark: 'from-black/50 to-slate-950/50 border-green-500/20', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} bg-gradient-to-br backdrop-blur-xl border-2 rounded-2xl p-6 hover:border-green-500 transition-all group`}
              >
                <motion.div className={`mb-4 p-4 bg-gradient-to-r ${contact.color} rounded-xl w-fit`} whileHover={{ rotate: 5 }}>
                  <contact.icon className="text-white" size={32} />
                </motion.div>
                <div className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold text-lg mb-1 group-hover:text-green-400 transition-colors`}>{contact.label}</div>
                <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm break-words`}>{contact.value}</div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form (Formspree) */}
          <motion.form
            onSubmit={handleFormSubmit}
            className={`${themeClass({ dark: 'bg-black/70 border-green-500/30', light: 'bg-white/80 border-green-500/30' })} mx-auto max-w-2xl border p-6 md:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(34,197,94,0.12)]`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="mb-6 md:mb-8">
              <label className="mb-2 block text-xs md:text-sm font-bold text-green-400">☕ NAME</label>
              <input
                name="name"
                required
                placeholder="Your awesome name"
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full border-b bg-transparent py-3 md:py-4 text-base md:text-xl outline-none focus:border-green-400 transition-colors`}
              />
            </div>
            <div className="mb-6 md:mb-8">
              <label className="mb-2 block text-xs md:text-sm font-bold text-green-400">💌 EMAIL</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@awesome.com"
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full border-b bg-transparent py-3 md:py-4 text-base md:text-xl outline-none focus:border-green-400 transition-colors`}
              />
            </div>
            <div className="mb-6 md:mb-8">
              <label className="mb-2 block text-xs md:text-sm font-bold text-green-400">💬 MESSAGE</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Let's build something cool (or grab a drink)..."
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full resize-none border-b bg-transparent py-3 md:py-4 text-base md:text-xl outline-none focus:border-green-400 transition-colors`}
              />
            </div>

            <AnimatePresence mode="wait">
              {formState === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-4 md:py-5 bg-green-500/20 border border-green-500 text-green-400 font-bold text-center rounded"
                >
                  ✅ Message sent! I&apos;ll get back to you soon.
                </motion.div>
              ) : formState === 'error' ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                  <div className="w-full py-3 bg-red-500/20 border border-red-500 text-red-400 font-bold text-center rounded text-sm">
                    ❌ Something went wrong. Try emailing directly.
                  </div>
                  <button type="submit" className="w-full py-4 bg-green-500 text-black font-black hover:bg-green-400 transition-colors">
                    Retry
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  type="submit"
                  disabled={formState === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 md:py-5 text-base md:text-lg font-black text-black transition-colors flex items-center justify-center gap-3 disabled:opacity-60 bg-green-500 hover:bg-green-400"
                >
                  {formState === 'sending' ? 'Sending...' : 'Send Message 🍻'}
                  <Send size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Resume Buttons */}
          <motion.div
            className="text-center mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <motion.a
              href={RESUME_DOWNLOAD_URL}
              download="Deepender_Choudhary_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,197,94,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl md:rounded-2xl font-bold text-lg md:text-2xl inline-flex items-center gap-3 text-black"
            >
              Download Resume
              <Download size={22} />
            </motion.a>
            <motion.a
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-12 py-4 md:py-6 border-2 border-green-400 rounded-xl md:rounded-2xl font-bold text-lg md:text-2xl inline-flex items-center gap-3 hover:bg-green-400/10 transition-colors"
            >
              View Resume
              <ExternalLink size={22} />
            </motion.a>
          </motion.div>
        </div>
      </section>
{/* ══════════════════════════════════════════════════════════════════
          ALL PROJECTS MODAL
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showProjectsModal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowProjectsModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal box */}
            <motion.div
              className={`relative z-10 w-full max-w-3xl max-h-[420px] sm:max-h-[80vh] rounded-3xl border-2 overflow-hidden flex flex-col ${themeClass({
                dark: 'bg-black/90 border-green-500/40',
                light: 'bg-white/95 border-green-500/40',
              })}`}
              initial={{ scale: 0.88, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              {/* Modal header */}
              <div className={`flex items-center justify-between px-6 py-5 border-b ${themeClass({ dark: 'border-green-500/20', light: 'border-green-500/20' })} shrink-0`}>
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    All Portfolio Projects
                  </h3>
                  <p className={`text-xs mt-0.5 font-mono ${themeClass({ dark: 'text-slate-400', light: 'text-zinc-500' })}`}>
                    5 projects · Click any to view full case study
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setShowProjectsModal(false)}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full border border-green-500/40 flex items-center justify-center text-green-400 hover:bg-green-500/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Scrollable project list */}
              <div className="overflow-y-auto flex-1 px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
                {[
                  {
  num: '01',
  title: 'Flight Booking Process Improvement Analysis',
  desc: 'End-to-end BA case study on airline disruption rebooking workflows. BPMN 2.0 process maps, stakeholder analysis. Based on real KLM/IGT operational experience.',
  domain: 'Aviation · BPMN 2.0 · Stakeholder Analysis · Gap Analysis',
  color: 'from-blue-500 to-cyan-500',
  emoji: '✈️',
  link: '/projects/project-1-flight-booking.html', // replace with Netlify link
},
                 {
  num: '02',
  title: 'Customer Refund Process Improvement Analysis',
  desc: 'E-commerce refund workflow redesign — 35% rise in support tickets traced to missing refund status visibility (root cause). JIRA sprint board with Epic→Story→Task→Bug hierarchy, and SQL analytics.',
  domain: 'E-Commerce · Requirements Engineering · BPMN · JIRA / Agile',
  color: 'from-teal-500 to-green-500',
  emoji: '🛒',
  link: '/projects/project-2-customer-refund.html',
},
                  {
  num: '03',
  title: 'Amazon E-Commerce Sales & Lead Analytics Dashboard',
  desc: 'BA + Data Analyst case study on 100K+ Amazon-style transactions. Power BI dashboard with DAX measures, Pareto analysis (65% revenue in top 3 categories), and budget reallocation recommendations.',
  domain: 'Sales Analytics · SQL · Power BI · DAX · Pareto Analysis',
  color: 'from-orange-500 to-amber-500',
  emoji: '📦',
  link: '/projects/project-3-amazon.html',
},
                  {
  num: '04',
  title: 'Zomato Refund & Delivery Failure Process Analysis',
  desc: 'Full BA case study using Zomato\'s public order dataset — 34% of refund tickets traced to missing real-time order tracking (root cause). Includes mock Jira board, and a live BI dashboard with Pareto insight.',
  domain: 'Food Delivery · Zomato Dataset · Process Mapping · MoSCoW · SQL',
  color: 'from-pink-500 to-rose-500',
  emoji: '🍕',
  link: '/projects/project-4-zomato-refund.html',
},
                                 
                  {
  num: '05',
  title: 'HDFC Bank Credit Card Default Risk & Collections Process Improvement',
  desc: 'BFSI BA case study using UCI Credit Card Default Dataset — default rate rose 15%→22% over 6 quarters, traced to a missing CRM-to-analytics API bridge. Covers a Power BI collections dashboard. ₹480 Cr NPA exposure quantified.',
  domain: 'BFSI · Credit Risk · UCI Dataset · SQL · Risk Register · RACI',
  color: 'from-yellow-400 to-orange-500',
  emoji: '🏦',
  link: '/projects/project-5-hdfc-credit.html',
},
                ].map((project, i) => (
                  <motion.div
  key={i}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.06 }}
  whileHover={{ scale: 1.015, x: 4 }}
  className={`group relative rounded-xl border overflow-hidden ${themeClass({
    dark: 'border-slate-700/60 bg-slate-900/50 hover:border-green-500/50',
    light: 'border-zinc-200 bg-zinc-50/80 hover:border-green-400/60',
  })} transition-all duration-200`}
>
  {/* Left color bar */}
  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.color}`} />

  <div className="flex flex-col gap-2 pl-5 pr-4 py-3 sm:pl-6 sm:pr-5 sm:py-4">

    {/* Row 1 — number + emoji + title */}
    <div className="flex items-start gap-2">
      <div className="shrink-0 flex items-center gap-1 pt-0.5">
        <span className={`font-mono text-[9px] leading-none font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
          {project.num}
        </span>
        <span className="text-sm sm:text-lg">{project.emoji}</span>
      </div>
      <h4 className={`flex-1 font-bold text-[13px] sm:text-sm leading-snug ${themeClass({
        dark: 'text-white group-hover:text-green-400',
        light: 'text-zinc-950 group-hover:text-green-600',
      })} transition-colors`}>
        {project.title}
      </h4>
    </div>

    {/* Description — desktop only */}
    <p className={`hidden sm:block text-xs leading-relaxed pl-7 ${themeClass({
      dark: 'text-slate-400',
      light: 'text-zinc-500',
    })}`}>
      {project.desc}
    </p>

    {/* Row 2 — domain tags (separate boxes) + View button */}
    <div className="flex items-center justify-between gap-2 pl-7 sm:pl-0">
      <div className="flex flex-wrap gap-1 flex-1">
        {project.domain.split(' · ').map((tag, idx) => (
          <span
            key={idx}
            className={`text-[8px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full border ${themeClass({
              dark: 'border-slate-600 text-slate-400 bg-slate-800/60',
              light: 'border-zinc-300 text-zinc-500 bg-zinc-100',
            })}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={(e) => e.stopPropagation()}
        className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold bg-gradient-to-r ${project.color} text-white whitespace-nowrap`}
      >
        View →
      </motion.a>
    </div>

  </div>
</motion.div>
                ))}
              </div>

              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className={`${themeClass({ dark: 'border-green-500/20 bg-black/80', light: 'border-green-500/30 bg-white/80' })} border-t py-12 px-6 backdrop-blur-xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.p
              className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} mb-4`}
              whileHover={{ scale: 1.02 }}
            >
              Designed & Built by Deepender Choudhary
            </motion.p>
            <motion.p
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 bg-clip-text"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Not from IIT. Not from IIM. Just someone who gets things done.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
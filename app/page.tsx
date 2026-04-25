'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Badge,
  BadgeCheck,
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
  Sun,
  Moon,
  X,
  Send,
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

  // Hydration-safe particles. Do not use Math.random() directly in JSX in Next.js.
  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }).map((_, i) => ({
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

  // Intro screen and greeting popup
  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
      setShowGreeting(true);
    }, 2800);

    const greetingTimer = window.setTimeout(() => {
      setShowGreeting(false);
    }, 6500);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(greetingTimer);
    };
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

  const projects = [
    {
      title: 'E-Commerce Sales Analytics Dashboard',
      tagline: '50K+ transactions analyzed, 65% revenue concentration identified',
      description: 'Built comprehensive sales analytics solution using SQL and Power BI to transform raw transaction data into actionable business insights',
      challenge: 'Business stakeholders needed real-time visibility into product performance, customer segments, and revenue trends but were drowning in Excel spreadsheets',
      approach: [
        'Downloaded Kaggle e-commerce dataset with 50,000+ transactions',
        'Wrote complex SQL queries using JOINs, CTEs, and Window Functions for data transformation',
        'Created star schema for optimized reporting',
        'Built interactive Power BI dashboard with drill-down capabilities',
        'Implemented DAX measures for YoY growth, customer lifetime value, and cohort analysis',
      ],
      tools: ['SQL', 'Power BI', 'DAX', 'Excel', 'Data Modeling'],
      outcomes: [
        'Identified top 3 product categories generating 65% of total revenue',
        'Discovered customer segment responsible for 40% of repeat purchases',
        'Reduced monthly reporting time from 8 hours to 30 minutes (93% improvement)',
        'Enabled data-driven inventory decisions saving estimated 15% in holding costs',
      ],
      metrics: { time: '30% faster', accuracy: '100%', impact: '₹2L+ saved' },
      BadgeCheck: '#',
      demo: '#',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Flight Operations Process Optimization',
      tagline: '25% reduction in SLA violations through process redesign',
      description: 'Analyzed and optimized KLM Airlines booking workflow serving 200+ daily passengers across multiple Lines of Business',
      challenge: 'Operations team experiencing 15% SLA violations during peak hours due to process bottlenecks in Claims, Seating, and Rebooking workflows',
      approach: [
        'Conducted stakeholder interviews with 6 LOB managers',
        'Mapped current-state processes using BPMN 2.0 in Microsoft Visio',
        'Performed time-motion study identifying 3 critical bottlenecks',
        'Designed future-state workflow with parallel processing capabilities',
        'Documented requirements in comprehensive BRD with ROI analysis',
      ],
      tools: ['BPMN 2.0', 'Microsoft Visio', 'Process Analysis', 'BRD', 'Stakeholder Management'],
      outcomes: [
        'Reduced average case handling time from 8 minutes to 6 minutes (25% improvement)',
        'Proposed automation of passenger eligibility checks (60% time savings)',
        'Created reusable process templates for 7 LOBs',
        'Projected 25% reduction in SLA violations if implemented (from 15% to 11%)',
      ],
      metrics: { time: '25% faster', efficiency: '60% automation', impact: '99% SLA' },
      BadgeCheck: '#',
      demo: '#',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'AI-Powered Requirements Elicitation',
      tagline: '40% faster sprint planning with GenAI assistance',
      description: 'Leveraged ChatGPT to accelerate user story creation and requirements documentation for agile development teams',
      challenge: 'Manual requirements gathering taking 3-4 days per sprint, causing delays in development kickoff and reducing available coding time',
      approach: [
        'Developed structured prompt templates for ChatGPT',
        'Generated 15 user stories with acceptance criteria in 90 minutes',
        'Validated AI-generated requirements with stakeholders',
        'Created reusable prompt library for common BA tasks',
        'Documented best practices for AI-assisted analysis',
      ],
      tools: ['ChatGPT', 'JIRA', 'Agile/Scrum', 'User Stories', 'Prompt Engineering'],
      outcomes: [
        'Reduced requirements documentation time from 3 days to 1.5 days',
        'Generated 40+ user stories across 3 sprints with 95% stakeholder acceptance',
        'Freed up 8 hours per sprint for deeper analysis and validation',
        'Built knowledge base of 50+ reusable prompts for team',
      ],
      metrics: { time: '40% faster', stories: '40+ created', accuracy: '95%' },
      BadgeCheck: '#',
      demo: '#',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const skills = {
    'Business Analysis Core': {
      items: ['Requirements Gathering', 'Process Analysis', 'Gap Analysis', 'Stakeholder Management', 'BRD/FRD Documentation', 'User Stories & Use Cases', 'BPMN 2.0 Modeling', 'Root Cause Analysis'],
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
    'Data & Analytics': {
      items: ['SQL (Joins, CTEs, Window Functions)', 'Power BI Dashboards', 'DAX Formulas', 'Excel (Advanced)', 'Data Validation', 'KPI Development', 'Data Modeling'],
      icon: Database,
      color: 'from-purple-500 to-pink-500',
    },
    'APIs & Integration': {
      items: ['REST APIs', 'JSON/XML', 'Postman Testing', 'API Documentation', 'Swagger/OpenAPI', 'Webhook Concepts', 'OAuth2 Authentication'],
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
      year: '2022 - 2024',
      title: 'Frontend Developer',
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
    {
      year: '2024 - 2025',
      title: 'Technical Support Analyst (L1)',
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
      year: '2025 - Present',
      title: 'Operations Business Analyst',
      company: 'IGT Solutions (KLM Airlines)',
      location: 'Gurugram, India',
      description: 'Currently managing multi-LOB airline operations, analyzing processes, and driving data-backed improvements. This is where I discovered my passion for Business Analysis.',
      achievements: [
        'Managing 6-7 Lines of Business (Claims, Seating, Rebooking, GST)',
        'Handling 50+ operational cases daily maintaining 99%+ SLA',
        'Analyzed real-time flight disruptions affecting 200+ passengers',
        'Generated operational reports tracking KPIs and performance metrics',
        'Contributed to process documentation and SOP improvements',
      ],
      skills: ['Process Analysis', 'Multi-LOB Management', 'Operational Reporting', 'Stakeholder Coordination'],
      icon: Target,
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2026',
      credential: 'CLF-C02',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2025',
      credential: 'AZ-900',
      color: 'from-blue-500 to-cyan-500',
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
      className={`min-h-screen ${themeClass({ dark: 'bg-black text-white', light: 'bg-zinc-50 text-zinc-950' })} transition-colors duration-500 overflow-hidden cursor-none`}
    >
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

      <AnimatePresence>
        {showGreeting && (
          <motion.div
            className="fixed top-24 right-6 z-[80] border-2 border-orange-400 bg-black/90 px-6 py-5 text-white shadow-[0_0_40px_rgba(251,146,60,0.25)]"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
          >
            <button
              type="button"
              aria-label="Close greeting"
              onClick={() => setShowGreeting(false)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4 pr-8">
              <div className="text-3xl font-black font-serif">IN</div>
              <div>
                <div className="font-bold text-lg">Namaste from India! 🙏</div>
                <div className="text-sm text-slate-400">
                  Visitor from <span className="text-orange-400">New Delhi, India</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Timer */}
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

      {/* Custom Cursor */}
      {hasMounted && (
        <div
          ref={cursorRef}
          className="fixed left-0 top-0 h-4 w-4 rounded-full border-2 border-white bg-white/20 pointer-events-none z-[1000] hidden md:block will-change-transform"
        />
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${themeClass({ dark: 'bg-gradient-to-br from-black via-zinc-950 to-emerald-950 opacity-95', light: 'bg-gradient-to-br from-zinc-50 via-white to-emerald-50 opacity-95' })}`} />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.16) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
            y: y1,
            opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"
          style={{ y: y2 }}
          animate={{ x: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full ${themeClass({ dark: 'bg-black/80 border-green-500/20', light: 'bg-white/80 border-green-500/30' })} backdrop-blur-xl z-40 border-b`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="text-3xl font-bold" whileHover={{ scale: 1.1 }}>
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">DC</span>
          </motion.div>

          <div className="hidden lg:flex gap-8 items-center">
            {['About', 'Journey', 'Projects', 'Skills', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} hover:text-green-400 transition-colors relative`}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div layoutId="activeSection" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400" />
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
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl z-10"
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
            className={`text-5xl md:text-8xl font-black mb-6 ${themeClass({ dark: 'from-white via-green-400 to-emerald-500', light: 'from-zinc-950 via-green-600 to-emerald-600' })} bg-gradient-to-r bg-clip-text text-transparent`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            Deepender Choudhary
          </motion.h1>

          <motion.h2
            className={`text-4xl md:text-6xl font-bold ${themeClass({ dark: 'text-slate-400', light: 'text-zinc-700' })} mb-8`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            I transform{' '}
            <motion.span className="text-green-400" animate={{ color: ['#4ade80', '#22c55e', '#4ade80'] }} transition={{ duration: 3, repeat: Infinity }}>
              data
            </motion.span>{' '}
            into{' '}
            <motion.span className="text-emerald-400" animate={{ color: ['#22c55e', '#4ade80', '#22c55e'] }} transition={{ duration: 3, repeat: Infinity }}>
              business decisions
            </motion.span>
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="max-w-3xl">
            <p className={`text-xl ${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} mb-4 leading-relaxed`}>
              <span className="text-green-400 font-bold">Business Analyst</span> with <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-semibold`}>3+ years</span> bridging technical operations and business strategy.
            </p>
            <p className={`text-lg ${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} mb-8 leading-relaxed`}>
              From <span className="text-green-400">Frontend Developer</span> → <span className="text-emerald-400">Technical Support</span> → <span className="text-lime-400">Operations Analyst</span> → <span className="text-green-400">Business Analyst</span>
            </p>
            <motion.p
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-12"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Not from IIT. Not from IIM. From the real world where I learned by doing.
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-6 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-lg flex items-center gap-2 group text-black"
            >
              Let&apos;s Talk
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-green-400 rounded-xl font-bold text-lg flex items-center gap-2 hover:bg-green-400/10 transition-colors"
            >
              <Download size={20} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div className="flex gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            {[
              { Icon: Badge, href: '#' },
              { Icon: BadgeCheck, href: '#' },
              { Icon: Mail, href: 'mailto:deependerchoudhary2003@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a key={i} href={href} whileHover={{ scale: 1.2, rotate: 5 }} className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}>
                <Icon size={28} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="text-green-400" size={40} />
        </motion.div>
      </section>

      {/* About/Story Section */}
      <section id="about" className="min-h-screen px-6 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6">
              <span className="text-green-400 font-mono text-3xl">01.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">My Story</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.25 }} className={`space-y-6 ${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} leading-relaxed`}>
              <motion.div className="text-2xl font-bold text-green-400 mb-6" whileHover={{ scale: 1.02 }}>
                I&apos;m 22. From a middle-class family in Haryana. At a crossroads.
              </motion.div>

              <p className="text-lg">
                <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-semibold`}>Government exams vs private sector.</span> Stability vs growth. Safety vs opportunity. I chose growth because I have <span className="text-green-400">3-4 years to get settled</span> before I get married. I cannot afford to wait for exam results that might come when I am 24.
              </p>

              <p>
                I started at <span className="text-emerald-400 font-semibold">Super Minds</span>, coding React.js and building booking pages. That&apos;s where I learned how businesses think — conversion rates, user journeys, ROI. Not from a textbook. From shipping real products.
              </p>

              <p>
                Then <span className="text-lime-400 font-semibold">Concentrix</span> — technical support for a US telecom client. 30-40 angry customers daily. Network down. Internet slow. Every call was a mini root cause analysis. I learned to diagnose, document, escalate with context. <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-semibold`}>95%+ CSAT wasn&apos;t luck. It was systematic thinking.</span>
              </p>

              <p>
                Now I&apos;m at <span className="text-green-400 font-semibold">IGT Solutions</span> managing KLM Airlines operations. 6-7 Lines of Business. Claims. Seating. Rebooking. Real-time flight disruptions affecting 200+ passengers. I am not just handling tickets — I am <span className="text-green-400 font-semibold">analyzing processes, identifying bottlenecks, generating reports, maintaining 99%+ SLA</span>.
              </p>

              <motion.div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl" whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}>
                <div className="text-2xl font-bold text-green-400 mb-3">Here&apos;s what makes me different:</div>
                <p className="text-lg">
                  I do not have a fancy degree from IIT or IIM. What I have is <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold`}>3+ years of real operational experience</span> that taught me what business analysis actually means. I have lived SLA pressure. I have handled stakeholder escalations. I have analyzed messy processes and made them better.
                </p>
              </motion.div>

              <p className="text-lg">
                I have earned <span className="text-orange-400 font-semibold">AWS Cloud Practitioner</span> and <span className="text-blue-400 font-semibold">Azure Fundamentals</span> certifications. I am learning SQL, Power BI, BPMN, GenAI. I am building projects to prove I can deliver. I am not just learning theory — I&apos;m applying it to real problems.
              </p>

              <motion.div className="text-xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 bg-clip-text" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }}>
                My goal? Build a career solving real business problems. Reach 10-15 LPA in 2-3 years. Eventually start a business with my brother. But right now? Land a BA role where I can learn from the best and deliver impact from day one.
              </motion.div>
            </motion.div>

            {/* Stats & Highlights */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.25 }} className={`${themeClass({ dark: 'bg-black/50 border-green-500/20', light: 'bg-white/70 border-green-500/30' })} backdrop-blur-xl border rounded-2xl p-8`}>
                <h3 className="text-3xl font-bold mb-8 text-green-400">By The Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '3+', label: 'Years Experience', color: 'from-green-400 to-emerald-400' },
                    { number: '99%', label: 'SLA Achievement', color: 'from-green-400 to-emerald-400' },
                    { number: '50+', label: 'Daily Cases', color: 'from-lime-400 to-green-400' },
                    { number: '6-7', label: 'LOBs Managed', color: 'from-orange-400 to-red-400' },
                  ].map((stat, i) => (
                    <motion.div key={i} className={`${themeClass({ dark: 'bg-slate-900/70 border-slate-700', light: 'bg-zinc-50 border-zinc-200' })} text-center p-4 rounded-xl border`} whileHover={{ scale: 1.05, borderColor: 'rgb(34 197 94)' }}>
                      <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>{stat.number}</div>
                      <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm`}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} className="space-y-4">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Certifications</h3>
                {certifications.map((cert, i) => (
                  <motion.div key={i} className={`${themeClass({ dark: 'bg-black/50 border-green-500/30', light: 'bg-white/80 border-green-500/30' })} p-6 border-2 rounded-xl`} whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold text-lg mb-1`}>{cert.name}</div>
                        <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm`}>{cert.issuer} • {cert.date}</div>
                        <div className="text-green-400 text-sm font-mono mt-1">{cert.credential}</div>
                      </div>
                      <Award className="text-green-400" size={32} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Facts */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.25 }} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Quick Facts</h3>
                <div className="space-y-3">
                  {[
                    { icon: MapPin, label: 'Location', value: 'Gurugram, Haryana, India' },
                    { icon: GraduationCap, label: 'Education', value: 'BCA, Shri Khushal Das University' },
                    { icon: Target, label: 'Goal', value: '10-15 LPA in 2-3 years' },
                  ].map((fact, i) => (
                    <motion.div key={i} className="flex items-start gap-3" whileHover={{ x: 5 }}>
                      <fact.icon className="text-green-400 shrink-0 mt-1" size={20} />
                      <div>
                        <div className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-semibold`}>{fact.label}</div>
                        <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm`}>{fact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section id="journey" className={`min-h-screen px-6 py-32 relative ${themeClass({ dark: 'bg-slate-900/20', light: 'bg-emerald-50/40' })}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6">
              <span className="text-green-400 font-mono text-3xl">02.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">My Journey</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-lime-500" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ delay: i * 0.18, duration: 0.65, type: 'spring', stiffness: 80 }} className="relative pl-24">
                  {/* Timeline dot */}
                  <motion.div className="absolute left-5 top-6 w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center border-4 border-black" whileHover={{ scale: 1.3, boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)' }}>
                    <item.icon size={16} />
                  </motion.div>

                  <motion.div className={`${themeClass({ dark: 'bg-black/50 border-green-500/20', light: 'bg-white/80 border-green-500/30' })} backdrop-blur-xl border rounded-2xl p-8 hover:border-green-500/50 transition-all`} whileHover={{ scale: 1.03, y: -6, boxShadow: '0 25px 70px rgba(34, 197, 94, 0.22)' }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-green-400 font-mono text-sm mb-2">{item.year}</div>
                        <h3 className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} text-3xl font-bold mb-2`}>{item.title}</h3>
                        <div className="text-emerald-400 font-semibold flex items-center gap-2">
                          {item.company}
                          <span className="text-slate-500">•</span>
                          <span className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm`}>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} mb-6 leading-relaxed`}>{item.description}</p>

                    <div className="mb-6">
                      <div className="text-sm font-bold text-green-400 mb-3">Key Achievements</div>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, j) => (
                          <motion.li key={j} className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-sm flex items-start gap-2`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ delay: j * 0.1 }}>
                            <Star className="text-green-400 shrink-0 mt-0.5" size={16} />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, j) => (
                        <motion.span key={j} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30" whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}>
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

      {/* Projects Section - PART 1 */}
      <section id="projects" className="min-h-screen px-6 py-32 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-16 flex items-center gap-6">
              <span className="text-green-400 font-mono text-3xl">03.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Projects & Work</span>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400/50 to-transparent" />
            </h2>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2, margin: '-80px' }} transition={{ duration: 0.75, delay: i * 0.18, type: 'spring', stiffness: 80 }} className="relative">
                {/* Project card */}
                <motion.div className={`${themeClass({ dark: 'from-black/40 to-slate-950/40 border-green-500/30', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} relative bg-gradient-to-br backdrop-blur-xl border-2 rounded-3xl p-10 overflow-hidden group`} whileHover={{ scale: 1.015, y: -8, boxShadow: '0 25px 80px rgba(34, 197, 94, 0.16)' }}>
                  {/* Animated gradient overlay */}
                  <motion.div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Project number */}
                  <div className={`absolute top-0 right-0 text-9xl font-black ${themeClass({ dark: 'text-slate-800/20', light: 'text-zinc-200/80' })} select-none`}>0{i + 1}</div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-6">
                      <div className="flex-1">
                        <motion.div className="text-green-400 font-mono text-sm mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                          Featured Project
                        </motion.div>
                        <h3 className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} text-4xl font-black mb-3 group-hover:text-green-400 transition-colors`}>{project.title}</h3>
                        <p className={`text-xl font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>{project.tagline}</p>
                        <p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-lg leading-relaxed max-w-3xl`}>{project.description}</p>
                      </div>

                      <div className="flex gap-4 lg:ml-8">
                        <motion.a href={project.BadgeCheck} whileHover={{ scale: 1.2, rotate: 5 }} className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}>
                          <BadgeCheck size={32} />
                        </motion.a>
                        <motion.a href={project.demo} whileHover={{ scale: 1.2, rotate: -5 }} className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} hover:text-green-400 transition-colors`}>
                          <ExternalLink size={32} />
                        </motion.a>
                      </div>
                    </div>

                    {/* Challenge & Approach */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className={`${themeClass({ dark: 'bg-slate-900/70 border-slate-700', light: 'bg-white/70 border-zinc-200' })} rounded-2xl p-6 border`}>
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="text-red-400" size={24} />
                          <h4 className="text-xl font-bold text-red-400">The Challenge</h4>
                        </div>
                        <p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} leading-relaxed`}>{project.challenge}</p>
                      </div>

                      <div className={`${themeClass({ dark: 'bg-slate-900/70 border-slate-700', light: 'bg-white/70 border-zinc-200' })} rounded-2xl p-6 border`}>
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="text-yellow-400" size={24} />
                          <h4 className="text-xl font-bold text-yellow-400">My Approach</h4>
                        </div>
                        <ul className="space-y-2">
                          {project.approach.map((step, j) => (
                            <motion.li key={j} className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-sm flex items-start gap-2`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.1 }}>
                              <ArrowRight className="text-green-400 shrink-0 mt-0.5" size={16} />
                              {step}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-green-400" size={24} />
                        <h4 className="text-xl font-bold text-green-400">Outcomes & Impact</h4>
                      </div>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {project.outcomes.map((outcome, j) => (
                          <motion.li key={j} className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} flex items-start gap-2`} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.1 }}>
                            <Star className="text-green-400 shrink-0 mt-1" size={16} />
                            {outcome}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-6 mb-8">
                      {Object.entries(project.metrics).map(([key, value], j) => (
                        <motion.div key={j} className={`${themeClass({ dark: 'bg-slate-900/70', light: 'bg-white/80' })} rounded-xl px-6 py-4 border border-green-500/30`} whileHover={{ scale: 1.05, borderColor: 'rgb(34 197 94)' }}>
                          <div className={`text-3xl font-black bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>{value}</div>
                          <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm capitalize`}>{key}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-3">
                      {project.tools.map((tool, j) => (
                        <motion.span key={j} className={`px-4 py-2 bg-gradient-to-r ${project.color} bg-opacity-10 text-white rounded-lg text-sm font-semibold border-2 border-opacity-30`} whileHover={{ scale: 1.1, y: -2 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.05 }}>
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 90 }}>
                <motion.div className={`${themeClass({ dark: 'from-black/50 to-slate-950/50 border-green-500/20', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} h-full bg-gradient-to-br backdrop-blur-xl border-2 rounded-2xl p-8 group`} whileHover={{ scale: 1.04, y: -8, borderColor: 'rgb(34 197 94)', boxShadow: '0 25px 70px rgba(34, 197, 94, 0.18)' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div className={`p-3 bg-gradient-to-r ${data.color} rounded-xl`} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <data.icon className="text-white" size={28} />
                    </motion.div>
                    <h3 className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} text-2xl font-bold`}>{category}</h3>
                  </div>

                  <ul className="space-y-3">
                    {data.items.map((skill, j) => (
                      <motion.li key={j} className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} flex items-start gap-2 group/item`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.05 }} whileHover={{ x: 5 }}>
                        <motion.span className="text-green-400 shrink-0 mt-1" whileHover={{ scale: 1.5 }}>
                          ▹
                        </motion.span>
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

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-32 relative">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-center flex items-center justify-center gap-6">
              <span className="text-green-400 font-mono text-3xl">05.</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Let&apos;s Work Together</span>
            </h2>
          </motion.div>

          <motion.p className={`${themeClass({ dark: 'text-slate-300', light: 'text-zinc-700' })} text-2xl mb-16 max-w-3xl mx-auto text-center leading-relaxed`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            I am actively looking for <span className="text-green-400 font-bold">Business Analyst opportunities</span> where I can contribute from day one. If you are hiring or want to discuss how my operational background can add value to your team, <span className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold`}>let us connect</span>.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Mail, label: 'Email', value: 'deependerchoudhary2003@gmail.com', href: 'mailto:deependerchoudhary2003@gmail.com', color: 'from-red-500 to-orange-500' },
              { icon: Phone, label: 'Phone', value: '+91 9729880411', href: 'tel:+919729880411', color: 'from-green-500 to-emerald-500' },
              { icon: Badge, label: 'Badge', value: 'Connect with me', href: '#', color: 'from-blue-500 to-cyan-500' },
              { icon: BadgeCheck, label: 'BadgeCheck', value: 'View my code', href: '#', color: 'from-purple-500 to-pink-500' },
            ].map((contact, i) => (
              <motion.a key={i} href={contact.href} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 90 }} whileHover={{ scale: 1.05, y: -5 }} className={`${themeClass({ dark: 'from-black/50 to-slate-950/50 border-green-500/20', light: 'from-white/80 to-emerald-50/70 border-green-500/30' })} bg-gradient-to-br backdrop-blur-xl border-2 rounded-2xl p-6 hover:border-green-500 transition-all group`}>
                <motion.div className={`mb-4 p-4 bg-gradient-to-r ${contact.color} rounded-xl w-fit`} whileHover={{ rotate: 5 }}>
                  <contact.icon className="text-white" size={32} />
                </motion.div>
                <div className={`${themeClass({ dark: 'text-white', light: 'text-zinc-950' })} font-bold text-lg mb-1 group-hover:text-green-400 transition-colors`}>{contact.label}</div>
                <div className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} text-sm break-words`}>{contact.value}</div>
              </motion.a>
            ))}
          </div>

          <motion.form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className={`${themeClass({ dark: 'bg-black/70 border-green-500/30', light: 'bg-white/80 border-green-500/30' })} mx-auto max-w-2xl border p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(34,197,94,0.12)]`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-green-400">☕ NAME</label>
              <input
                name="name"
                required
                placeholder="Your awesome name"
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full border-b bg-transparent py-4 text-xl outline-none focus:border-green-400`}
              />
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-green-400">💌 EMAIL</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@awesome.com"
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full border-b bg-transparent py-4 text-xl outline-none focus:border-green-400`}
              />
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-green-400">💬 MESSAGE</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Let’s build something cool (or grab a drink)..."
                className={`${themeClass({ dark: 'text-white placeholder:text-slate-500 border-slate-700', light: 'text-zinc-950 placeholder:text-zinc-400 border-zinc-300' })} w-full resize-none border-b bg-transparent py-4 text-xl outline-none focus:border-green-400`}
              />
            </div>

            <button type="submit" className="w-full bg-green-500 py-5 text-lg font-black text-black hover:bg-green-400 transition-colors flex items-center justify-center gap-3">
              Send Message 🍻
              <Send size={20} />
            </button>
          </motion.form>

          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-bold text-2xl inline-flex items-center gap-3 text-black"
            >
              Download Resume
              <Download size={28} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClass({ dark: 'border-green-500/20 bg-black/80', light: 'border-green-500/30 bg-white/80' })} border-t py-12 px-6 backdrop-blur-xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.p className={`${themeClass({ dark: 'text-slate-400', light: 'text-zinc-600' })} mb-4`} whileHover={{ scale: 1.02 }}>
              Designed & Built by Deepender Choudhary
            </motion.p>
            <motion.p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 bg-clip-text" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }}>
              Not from IIT. Not from IIM. Just someone who gets things done.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}

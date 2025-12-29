'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Project data structure
interface ProjectData {
  id: string;
  index: string;
  title: string;
  domain: string;
  problem: string;
  challenges: string[];
  engineering: string[];
  techStack: string[];
  links?: { label: string; url: string }[];
}

const projectsData: ProjectData[] = [
  {
    id: 'emr-platform',
    index: '01',
    title: 'EMR Platform',
    domain: 'Healthcare Systems',
    problem: 'A cloud-based Electronic Medical Records platform designed to streamline clinical workflows for doctors and healthcare staff.',
    challenges: [
      'Designing fast, intuitive prescription and consultation flows',
      'Managing role-based access for doctors, staff, and admins',
      'Ensuring data consistency across patient records',
      'Balancing usability with healthcare data sensitivity'
    ],
    engineering: [
      'Role-based access system with secure authentication',
      'Optimized consultation interface for rapid data entry',
      'Structured EMR data models for scalability',
      'Cloud deployment with real-time updates'
    ],
    techStack: ['React', 'Firebase', 'Firestore', 'Authentication', 'Tailwind CSS'],
    links: []
  },
  {
    id: 'log-analysis',
    index: '02',
    title: 'Real-Time Log Analysis using LLMs',
    domain: 'AI Infrastructure',
    problem: 'A real-time system for analyzing large-scale system logs to detect anomalies and classify severity using LLMs.',
    challenges: [
      'Handling high log throughput with low latency',
      'Structuring unstructured logs for model inference',
      'Reducing false positives in anomaly detection',
      'Integrating ML inference into a real-time pipeline'
    ],
    engineering: [
      'Log parsing and feature extraction pipeline',
      'TinyBERT-based severity classification',
      'Anomaly detection using statistical and ML methods',
      'Real-time inference with optimized latency'
    ],
    techStack: ['Python', 'PyTorch', 'TinyBERT', 'Optuna', 'Streamlit', 'BGL Dataset'],
    links: []
  },
  {
    id: 'bill-automation',
    index: '03',
    title: 'Purchase Bill Automation',
    domain: 'Business Automation',
    problem: 'A desktop-based automation system to digitize and process purchase bills, reducing manual accounting effort.',
    challenges: [
      'Handling inconsistent bill formats',
      'Extracting structured data from scanned documents',
      'Designing workflows resilient to OCR errors',
      'Integrating automation into existing accounting processes'
    ],
    engineering: [
      'OCR-based data extraction pipeline',
      'Rule-based and heuristic validation logic',
      'Automated data normalization and export',
      'Error-handling flows for low-confidence inputs'
    ],
    techStack: ['Python', 'GPT api', 'Tauri', 'PywinAuto', 'Automation Scripts'],
    links: []
  },
  {
    id: 'isl-recognition',
    index: '04',
    title: 'ISL Recognition System',
    domain: 'Computer Vision',
    problem: 'A computer vision system to recognize Indian Sign Language alphabets in real time using deep learning.',
    challenges: [
      'Achieving high accuracy with real-time constraints',
      'Handling variations in hand position and lighting',
      'Designing a robust preprocessing pipeline',
      'Supporting smooth real-time inference'
    ],
    engineering: [
      'MediaPipe-based hand detection',
      'CNN model for ISL alphabet classification',
      'Optimized preprocessing and augmentation pipeline',
      'Real-time inference with visual and audio feedback'
    ],
    techStack: ['Python', 'TensorFlow', 'Keras', 'MediaPipe', 'OpenCV'],
    links: []
  }
];

// Modal component
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: ProjectData | null; 
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // ESC key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);
  
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.0, 0.0, 1] }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        style={{ 
          backgroundColor: 'rgba(11, 11, 15, 0.85)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.2, 0.0, 0.0, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl mx-4 mb-4 md:mb-0 max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-2xl"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border-subtle)'
          }}
        >
          <div className="p-6 md:p-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="mb-6 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              ← Close
            </button>
            
            {/* Project title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {project.title}
            </h2>
            
            {/* Domain tag */}
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {project.domain}
            </p>
            
            {/* Problem context */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Problem Space</h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.problem}
              </p>
            </div>
            
            {/* Challenges */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Key Constraints</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Artifact */}
            {project.id === 'emr-platform' && (
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border-subtle)' }}>
                  <Image
                    src="/projects/emr/consultationPage.webp"
                    alt="EMR consultation interface"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    style={{ opacity: 0.85 }}
                  />
                </div>
              </div>
            )}
            {project.id === 'log-analysis' && (
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border-subtle)' }}>
                  <Image
                    src="/projects/logAnalysis/analysisDashboard.png"
                    alt="Log analysis dashboard"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    style={{ opacity: 0.85 }}
                  />
                </div>
              </div>
            )}
            {project.id === 'bill-automation' && (
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border-subtle)' }}>
                  <Image
                    src="/projects/purchase-automation/PBA2datapreview2.webp"
                    alt="Bill automation data preview"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    style={{ opacity: 0.85 }}
                  />
                </div>
              </div>
            )}

            {/* Engineering */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">System Design & Implementation</h3>
              <ul className="space-y-2">
                {project.engineering.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tech stack */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Links (if present) */}
            {project.links && project.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Links</h3>
                <div className="flex flex-col gap-2">
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Project component with scroll-based dominance
function Project({ 
  index, 
  title, 
  children,
  onClick
}: { 
  index: string; 
  title: string; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate opacity: peaks at 1 when project is centered, fades to 0.2 otherwise
  const opacityDesktop = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [0.2, 0.5, 1, 0.5, 0.2]
  );
  
  // Calculate scale: slightly larger when centered
  const scaleDesktop = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [0.92, 0.96, 1, 0.96, 0.92]
  );
  
  // Use static values on mobile, animated values on desktop
  const opacity = isMobile ? 1 : opacityDesktop;
  const scale = isMobile ? 1 : scaleDesktop;
  
  return (
    <motion.div 
      ref={ref}
      className="min-h-[50vh] md:min-h-[70vh] flex flex-col md:flex-row md:items-center py-12 cursor-pointer group relative"
      style={{ 
        opacity,
        scale
      }}
      onClick={onClick}
      whileHover={{ 
        transition: { duration: 0.2 }
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(94, 234, 212, 0.03), transparent 70%)',
          filter: 'blur(20px)'
        }}
      />
      
      <div className="md:w-24 mb-6 md:mb-0 relative z-10">
        <div className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{index}</div>
      </div>
      <div className="flex-1 md:pl-12 relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please check your connection.');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="hero-section min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.2, 0.0, 0.0, 1] 
        }}
      >
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(94, 234, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 234, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            zIndex: 0
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-secondary))',
            zIndex: 1
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-secondary))',
            zIndex: 1
          }}
        />
        
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          {/* Portrait - Above text on mobile, right side on desktop */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div 
              className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden relative"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 0 60px rgba(94, 234, 212, 0.1)'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 80px rgba(94, 234, 212, 0.15)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/portfolioProfile.png"
                alt="Kaushal's portrait"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, 320px"
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1">
            {/* Intro line */}
            <motion.p 
              className="text-sm md:text-base mb-4" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Hello — I'm Kaushal.
            </motion.p>

            {/* Accent line */}
            <motion.div 
              className="h-px mb-6 bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ color: 'var(--color-accent)', width: '120px' }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120px', opacity: 0.6 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.2, 0.0, 0.0, 1],
                delay: 0.3
              }}
            />
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Designing full-stack systems with intelligence and intent.
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              I build full-stack applications, automation tools, and AI-powered systems
              with a strong focus on logic, performance, and user experience.
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg mb-12 italic" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Clarity before complexity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.button 
                className="px-6 py-3 rounded-lg font-medium relative overflow-hidden group" 
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(94, 234, 212, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ transform: 'translateX(-100%)' }} />
              </motion.button>
              <motion.button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-medium" 
                style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'var(--color-accent)',
                  boxShadow: '0 0 20px rgba(94, 234, 212, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section className="relative" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        {/* Top gradient transition */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg-primary), transparent)',
            zIndex: 1
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-primary))',
            zIndex: 1
          }}
        />
        
        {/* Subtle accent glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.02] blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--color-accent)' }} />
        
        <div className="max-w-6xl w-full mx-auto px-6 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <motion.div 
              className="h-1 rounded-full mb-16"
              style={{ 
                background: 'linear-gradient(90deg, var(--color-accent), transparent)',
                width: '120px'
              }}
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
          
          {projectsData.map((project, idx) => (
            <Project 
              key={project.id}
              index={project.index} 
              title={project.title}
              onClick={() => setActiveProject(project)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="mb-3">
                  <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}>
                    {project.domain}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-base md:text-lg mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.problem.substring(0, 120)}...
                </p>
                
                {/* Tech stack with pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 4).map((tech, techIdx) => (
                    <motion.span
                      key={techIdx}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 + techIdx * 0.05 }}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: 'var(--color-text-secondary)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <motion.span 
                  className="text-sm md:text-base view-details-link inline-flex items-center gap-2" 
                  style={{ color: 'var(--color-accent)' }}
                  whileHover={{ x: 4 }}
                >
                  View details
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.div>
            </Project>
          ))}
        </div>
      </section>

      {/* Core Competencies Section */}
      <motion.section 
        className="px-6 py-24 relative"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        {/* Top gradient transition */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg-secondary), transparent)',
            zIndex: 0
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-secondary))',
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Core Competencies</h2>
            <div className="h-px w-16 bg-gradient-to-r from-current to-transparent opacity-20 mb-6" />
            
            <p className="text-base md:text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              I focus on understanding systems deeply before building them,
              so the solutions are scalable, reliable, and easy to use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Pillar 1 */}
            <div className="pillar-item p-6 rounded-xl" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                System Design & Architecture
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Designing clear data and control flows instead of tightly coupled logic
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Making conscious trade-offs between scalability, simplicity, and performance
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Structuring backend services and APIs for long-term maintainability
                  </span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-item p-6 rounded-xl" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                AI / ML Systems (Applied)
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Treating ML models as system components, not black boxes
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Handling latency, accuracy trade-offs, and failure cases in real-world usage
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Evaluating models using meaningful metrics instead of raw accuracy alone
                  </span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-item p-6 rounded-xl" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                Automation & Optimization
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Identifying repetitive or error-prone workflows and automating them
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Designing systems that fail gracefully and are easy to debug
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Optimizing for reliability and clarity before premature performance gains
                  </span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-item p-6 rounded-xl" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
              <h3 className="text-xl md:text-2xl font-semibold mb-5">
                Frontend Engineering & UX
              </h3>
              <ul className="space-y-3.5">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Managing complex state without compromising user experience
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Designing interactions that feel intentional, not decorative
                  </span>
                </li>
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Balancing performance, accessibility, and visual clarity
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Professional Background Section */}
      <motion.section 
        className="px-6 py-24 min-h-screen flex items-center relative"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        {/* Top gradient transition */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg-primary), transparent)',
            zIndex: 0
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-primary))',
            zIndex: 0
          }}
        />
        
        {/* Subtle accent glow on right */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-[0.02] blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--color-accent)' }} />
        
        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Professional Background</h2>
            <div className="h-px w-16 bg-gradient-to-r from-current to-transparent opacity-20 mb-6" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Professional Experience */}
            <div>
              <h3 className="text-2xl font-semibold mb-8" style={{ color: 'var(--color-text-primary)' }}>Experience</h3>
              
              <div className="relative pl-6 border-l" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-text-secondary)', transform: 'translateX(-5px)' }} />
                
                <div className="pb-8">
                  <div className="mb-4">
                    <p className="text-lg font-semibold mb-1">Software Engineering Intern</p>
                    <p className="text-base mb-1" style={{ color: 'var(--color-text-secondary)' }}>Tark Technologies</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>2024</p>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Designed and implemented a billing engine using object-oriented principles and SOLID design patterns
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Focused on scalable architecture and maintainable code structure
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Developed debugging and optimization skills through production system work
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Credentials Column */}
            <div className="space-y-10">
              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Certifications</h3>
                
                <div className="p-5 rounded-lg" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
                  <p className="text-base font-medium mb-2">Microsoft Azure AI-900</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Azure AI Fundamentals</p>
                </div>
              </div>

              {/* Patents & Research */}
              <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Research & IP</h3>
                
                <div className="p-5 rounded-lg" style={{ border: '1px solid var(--color-border-subtle)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
                  <p className="text-base font-medium mb-2">Patent Application</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    Novel methodology for real-time log analysis using machine learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="px-6 py-20 min-h-screen flex items-center relative"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        {/* Top gradient transition */}
        <div 
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg-secondary), transparent)',
            zIndex: 0
          }}
        />
        
        {/* Bottom gradient transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-secondary))',
            zIndex: 0
          }}
        />
        
        <div className="max-w-3xl w-full mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">About</h2>
          
          {/* Identity line */}
          <p className="text-xl md:text-2xl font-medium mb-10 leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
            I build systems by thinking deeply before building quickly.
          </p>
          
          {/* Explanatory paragraph */}
          <p className="text-base md:text-lg leading-relaxed mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            I prioritize understanding the problem space and constraints before writing code. 
            Solutions should be clear, maintainable, and built to last—not clever for the sake of complexity. 
            I care deeply about usability and real-world impact, where software reduces friction and handles complexity gracefully.
          </p>
          
          {/* Working principles */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>How I work</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-text-primary)', minWidth: '4px' }}>·</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Design systems with clear boundaries and maintainable architecture that teams can reason about
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-text-primary)', minWidth: '4px' }}>·</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Treat user experience as a first-class concern, not an afterthought
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-text-primary)', minWidth: '4px' }}>·</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Engage in direct communication and constructive technical debate to reach better solutions
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="px-6 py-24 min-h-screen flex items-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        {/* Top gradient transition */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg-primary), transparent)',
            zIndex: 0
          }}
        />
        
        {/* Subtle accent glow center */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--color-accent)', transform: 'translate(-50%, -50%)' }} />
        
        <div className="max-w-5xl w-full mx-auto relative z-10">
          <div className="mb-16 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Let's Connect
            </motion.h2>
            <motion.div 
              className="h-px w-20 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mb-6 mx-auto"
              style={{ color: 'var(--color-accent)' }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '80px', opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.p 
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              I'd love to hear from you! Whether you have a project in mind, want to collaborate on something interesting, or just want to say hello — drop me a message below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
            {/* Contact Links - Compact */}
            <div className="lg:col-span-2 space-y-4">
              <motion.a 
                href="mailto:kaushalambaliya69199@gmail.com" 
                className="flex items-center gap-4 p-4 rounded-lg group"
                style={{ border: '1px solid var(--color-border-subtle)' }}
                whileHover={{ 
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'rgba(94, 234, 212, 0.02)'
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(94, 234, 212, 0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>Email</p>
                  <p className="text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>kaushalambaliya69199@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="https://github.com/Kaushal2710" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg group"
                style={{ border: '1px solid var(--color-border-subtle)' }}
                whileHover={{ 
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'rgba(94, 234, 212, 0.02)'
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(94, 234, 212, 0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>GitHub</p>
                  <p className="text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>Kaushal2710</p>
                </div>
              </motion.a>

              <motion.a 
                href="https://www.linkedin.com/in/kaushal-ambaliya-81934a220/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg group"
                style={{ border: '1px solid var(--color-border-subtle)' }}
                whileHover={{ 
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'rgba(94, 234, 212, 0.02)'
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(94, 234, 212, 0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>LinkedIn</p>
                  <p className="text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>Connect</p>
                </div>
              </motion.a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Name <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={formStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg text-base transition-all duration-300"
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                        outline: 'none',
                        opacity: formStatus === 'loading' ? 0.6 : 1
                      }}
                      whileFocus={{ scale: 1.01 }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border-subtle)'}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Email <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={formStatus === 'loading'}
                      className="w-full px-4 py-3 rounded-lg text-base transition-all duration-300"
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                        outline: 'none',
                        opacity: formStatus === 'loading' ? 0.6 : 1
                      }}
                      whileFocus={{ scale: 1.01 }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border-subtle)'}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Message <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Hello! I'd love to connect about...&#10;&#10;Looking forward to hearing from you! 😊"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-lg text-base resize-none transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      opacity: formStatus === 'loading' ? 0.6 : 1
                    }}
                    whileFocus={{ scale: 1.005 }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border-subtle)'}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-6 py-3.5 rounded-lg font-medium relative overflow-hidden"
                  style={{ 
                    backgroundColor: formStatus === 'loading' ? 'rgba(94, 234, 212, 0.5)' : 'var(--color-accent)', 
                    color: 'var(--color-bg-primary)',
                    border: 'none',
                    cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer'
                  }}
                  whileHover={formStatus !== 'loading' ? { scale: 1.02, boxShadow: '0 0 40px rgba(94, 234, 212, 0.4)' } : {}}
                  whileTap={formStatus !== 'loading' ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {formStatus === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </span>
                  )}
                </motion.button>

                <AnimatePresence mode="wait">
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="p-4 rounded-lg flex items-center gap-3"
                      style={{ backgroundColor: 'rgba(94, 234, 212, 0.1)', border: '1px solid var(--color-accent)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>Message sent successfully!</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="p-4 rounded-lg flex items-center gap-3"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgb(239, 68, 68)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(239, 68, 68)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'rgb(239, 68, 68)' }}>Failed to send message</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}

      {/* Footer */}
      <footer className="relative py-12 px-6" style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left - Brand */}
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Kaushal Ambaliya</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Building intelligent systems with clarity and intent.
              </p>
            </div>

            {/* Center - Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <a href="#projects" className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  Projects
                </a>
                <a href="#" className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  Core Competencies
                </a>
                <a href="#" className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  About
                </a>
                <a href="#contact" className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  Contact
                </a>
              </nav>
            </div>

            {/* Right - Connect */}
            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Connect</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:kaushalambaliya69199@gmail.com" className="text-sm flex items-center gap-2 transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email
                </a>
                <a href="https://github.com/Kaushal2710" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/kaushal-ambaliya-81934a220/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom - Copyright */}
          <div className="pt-8 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                © {new Date().getFullYear()} Kaushal Ambaliya. All rights reserved.
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Designed & Built with <span style={{ color: 'var(--color-accent)' }}>React</span> & <span style={{ color: 'var(--color-accent)' }}>Next.js</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
    domain: 'Healthcare Infrastructure',
    problem: 'Medical practices needed a unified system to manage patient records, appointments, and billing without vendor lock-in or data silos.',
    challenges: [
      'Real-time data synchronization across multiple clinics',
      'HIPAA compliance and audit trail requirements',
      'Integration with legacy insurance systems'
    ],
    engineering: [
      'Built event-driven architecture for reliable data replication',
      'Implemented role-based access control with audit logging',
      'Designed API layer for third-party integrations'
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'React', 'TypeScript'],
    links: []
  },
  {
    id: 'log-analysis',
    index: '02',
    title: 'Real-Time Log Analysis using LLMs',
    domain: 'DevOps Automation',
    problem: 'Engineering teams spent hours parsing logs manually to diagnose production incidents, delaying resolution times.',
    challenges: [
      'Processing high-volume log streams without latency',
      'Context-aware anomaly detection across distributed services',
      'Cost-effective LLM usage at scale'
    ],
    engineering: [
      'Built streaming pipeline with intelligent log aggregation',
      'Implemented context-aware prompting for pattern detection',
      'Designed caching layer to reduce LLM API costs by 70%'
    ],
    techStack: ['Python', 'OpenAI API', 'Kafka', 'Elasticsearch', 'FastAPI'],
    links: []
  },
  {
    id: 'bill-automation',
    index: '03',
    title: 'Purchase Bill Automation',
    domain: 'Financial Operations',
    problem: 'Finance teams manually extracted data from PDF invoices, leading to errors and delayed payment cycles.',
    challenges: [
      'Handling inconsistent PDF formats across vendors',
      'Maintaining accuracy despite OCR limitations',
      'Integration with existing ERP workflows'
    ],
    engineering: [
      'Built ML pipeline for document classification and extraction',
      'Implemented confidence-based human review routing',
      'Created API connectors for ERP reconciliation'
    ],
    techStack: ['Python', 'Tesseract', 'spaCy', 'PostgreSQL', 'Flask'],
    links: []
  },
  {
    id: 'isl-recognition',
    index: '04',
    title: 'ISL Recognition System',
    domain: 'Accessibility Technology',
    problem: 'Communication barriers prevented deaf individuals from accessing real-time services without trained interpreters.',
    challenges: [
      'Real-time gesture recognition with limited training data',
      'Handling lighting and background variations',
      'Low-latency inference on edge devices'
    ],
    engineering: [
      'Trained custom CNN model on augmented ISL dataset',
      'Implemented temporal smoothing for gesture sequences',
      'Optimized model for mobile deployment using TFLite'
    ],
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'MediaPipe', 'React Native'],
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
              <h3 className="text-lg font-semibold mb-3">Context</h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.problem}
              </p>
            </div>
            
            {/* Challenges */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Why it was hard</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Engineering */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">What was engineered</h3>
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
  
  // Calculate opacity: peaks at 1 when project is centered, fades to 0.5 otherwise
  const opacityDesktop = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.65, 1],
    [0.5, 0.8, 1, 0.8, 0.5]
  );
  
  // Calculate scale: slightly larger when centered
  const scaleDesktop = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.65, 1],
    [0.96, 0.98, 1, 0.98, 0.96]
  );
  
  // Use static values on mobile, animated values on desktop
  const opacity = isMobile ? 1 : opacityDesktop;
  const scale = isMobile ? 1 : scaleDesktop;
  
  return (
    <motion.div 
      ref={ref}
      className="min-h-[50vh] md:min-h-[70vh] flex flex-col md:flex-row md:items-center py-12 cursor-pointer"
      style={{ 
        opacity,
        scale
      }}
      onClick={onClick}
    >
      <div className="md:w-24 mb-6 md:mb-0">
        <span className="text-sm font-mono" style={{ color: 'var(--color-text-secondary)' }}>{index}</span>
      </div>
      <div className="flex-1 md:pl-12">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-6 py-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.2, 0.0, 0.0, 1] 
        }}
      >
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Designing full-stack systems with intelligence and intent.
          </h1>
          
          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            I build full-stack applications, automation tools, and AI-powered systems
            with a strong focus on logic, performance, and user experience.
          </p>
          
          <p className="text-base md:text-lg mb-12 italic" style={{ color: 'var(--color-text-secondary)' }}>
            Clarity before complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}>
              View Projects
            </button>
            <button className="px-6 py-3 rounded-lg font-medium" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-primary)' }}>
              Contact Me
            </button>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl w-full mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Projects</h2>
          
          {projectsData.map((project) => (
            <Project 
              key={project.id}
              index={project.index} 
              title={project.title}
              onClick={() => setActiveProject(project)}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">{project.title}</h3>
              <p className="text-base md:text-lg mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {project.problem.substring(0, 100)}...
              </p>
              <p className="text-sm md:text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                {project.techStack.slice(0, 3).join(' · ')}
              </p>
              <span className="text-sm md:text-base view-details-link" style={{ color: 'var(--color-accent)' }}>View details</span>
            </Project>
          ))}
        </div>
      </section>

      {/* Technical Depth Section */}
      <motion.section 
        className="px-6 py-20"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Depth</h2>
          
          <p className="text-base md:text-lg mb-16 max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
            I focus on understanding systems deeply before building them,
            so the solutions are scalable, reliable, and easy to use.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Pillar 1 */}
            <div className="pillar-item">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                System Design & Architecture
              </h3>
              <ul className="space-y-3">
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
            <div className="pillar-item">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                AI / ML Systems (Applied)
              </h3>
              <ul className="space-y-3">
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
            <div className="pillar-item">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Automation & Optimization
              </h3>
              <ul className="space-y-3">
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
            <div className="pillar-item">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Frontend Engineering & UX
              </h3>
              <ul className="space-y-3">
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

      {/* Experience & Credentials Section */}
      <motion.section 
        className="px-6 py-20"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Experience & Credentials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Professional Experience */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">Professional Experience</h3>
              
              <div className="mb-8">
                <div className="mb-3">
                  <p className="text-lg font-medium">Software Engineering Intern</p>
                  <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>Tark Technologies</p>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      Worked on building a billing engine using object-oriented design principles
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      Applied SOLID principles and class-level design for scalable code
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      Gained experience in debugging, optimization, and writing maintainable systems
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Certifications / Credentials */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">Certifications</h3>
              
              <ul className="space-y-3 mb-10">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Microsoft Azure AI-900: Azure AI Fundamentals
                  </span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-semibold mb-6">Patents & Research</h3>
              
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span style={{ color: 'var(--color-text-secondary)', minWidth: '4px' }}>·</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Patent filed for novel methodology in real-time log analysis
                  </span>
                </li>
              </ul>
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

      {/* Placeholder for future sections */}
      {/* Add Contact, About, etc. here */}
    </div>
  );
}

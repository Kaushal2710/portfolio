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
  images?: string[];
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
    links: [],
    images: ['/projects/emr/consultationPage.webp']
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
    links: [],
    images: [
      '/projects/logAnalysis/analysisDashboard.png',
      '/projects/logAnalysis/LA1Loganalysis1.png',
      '/projects/logAnalysis/LA3Loganalysis3.png'
    ]
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
    links: [],
    images: [
      '/projects/purchase-automation/PBA2datapreview2.webp',
      '/projects/purchase-automation/PBA1uploadpage1.jpeg'
    ]
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

// Additional projects data
const additionalProjectsData = [
  {
    id: 'depot-inventory',
    title: 'Inventory & Order Management Platform',
    subtitle: 'Depot Business',
    description: 'Sales and inventory management system designed for depot businesses handling products from multiple factories, with order tracking and salesperson workflows.',
    overview: 'A web-based inventory and order management system built for depot businesses handling products from multiple factories and sales channels.',
    useCase: [
      'Multi-product inventory tracking',
      'Salesperson order entry and planning',
      'Centralized order visibility for admins',
      'Business-focused usability over complexity'
    ],
    features: [
      'Inventory tracking across product categories',
      'Order creation and status tracking',
      'Salesperson workflows with location data',
      'Admin dashboard for inventory and orders'
    ],
    role: [
      'Designed UI and data flow',
      'Implemented frontend and database logic',
      'Integrated role-based access',
      'Deployed and tested end-to-end'
    ],
    techStack: ['React', 'Firebase', 'Firestore', 'RBAC', 'Tailwind CSS'],
    images: ['/projects/depot-inventory/cover.webp']
  },
  {
    id: 'ims',
    title: 'Inventory Management System',
    subtitle: 'IMS',
    description: 'Internal inventory management system focused on stock tracking, role-based operations, and streamlined data entry for business use.',
    overview: 'An internal inventory management system designed to simplify stock tracking and operational workflows for small to mid-sized business environments.',
    useCase: [
      'Internal stock tracking',
      'Controlled access based on user roles',
      'Fast data entry and updates',
      'Reliability over feature overload'
    ],
    features: [
      'CRUD operations for inventory items',
      'Role-based access control',
      'Clean and focused internal UI',
      'Data consistency checks'
    ],
    role: [
      'Designed system structure',
      'Built frontend and backend integration',
      'Implemented access control logic',
      'Handled testing and refinements'
    ],
    techStack: ['React', 'SQL', 'Backend APIs'],
    images: ['/projects/ims/cover.webp']
  },
  {
    id: 'tidytown',
    title: 'TidyTown',
    subtitle: 'Civic Platform',
    description: 'Civic waste management platform enabling waste tracking, user engagement, and data-driven sustainability insights.',
    overview: 'A civic-focused waste management platform aimed at tracking waste generation and encouraging sustainable practices through data.',
    useCase: [
      'Waste tracking at user level',
      'Data-driven insights for waste reduction',
      'Community-facing usability',
      'Integration of ML-driven classification'
    ],
    features: [
      'Waste logging and categorization',
      'Data visualization and insights',
      'ML-based waste classification integration',
      'User-friendly frontend flows'
    ],
    role: [
      'Designed frontend experience',
      'Integrated Firebase backend',
      'Connected ML outputs to UI',
      'Iterated based on usability testing'
    ],
    techStack: ['React', 'Firebase', 'ML Models', 'Data Visualization'],
    images: ['/projects/tidytown/cover.webp']
  }
];

// Image carousel component for project modal
function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [maxHeight, setMaxHeight] = useState<number>(450);

  if (!images || images.length === 0) return null;

  // Calculate max height of all images in this set
  useEffect(() => {
    if (images.length === 0) return;

    const loadImages = async () => {
      const heights = await Promise.all(
        images.map(
          (src) =>
            new Promise<number>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                // Calculate height for 800px width (standard)
                const aspectRatio = img.height / img.width;
                resolve(800 * aspectRatio);
              };
              img.onerror = () => resolve(450); // fallback
              img.src = src;
            })
        )
      );
      setMaxHeight(Math.max(...heights, 450));
    };

    loadImages();
  }, [images]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div className="mb-6 md:mb-8 -mx-5 md:mx-0">
      <div 
        className="relative md:rounded-lg overflow-hidden" 
        style={{ 
          border: '1px solid var(--color-border-subtle)',
          height: `${maxHeight}px`,
          backgroundColor: 'var(--color-bg-secondary)'
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 25 },
              opacity: { duration: 0.15 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              const swipeVelocityThreshold = 500;
              
              if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocityThreshold) {
                // Swiped right - go to previous
                goToPrevious();
              } else if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocityThreshold) {
                // Swiped left - go to next
                goToNext();
              }
            }}
            className="absolute inset-0"
          >
            {/* Blurred background layer */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px) brightness(0.4)',
                transform: 'scale(1.2)'
              }}
            />
            
            {/* Main image centered */}
            <div className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src={images[currentIndex]}
                  alt={`Project screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  quality={90}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {images.length > 1 && (
          <>
            {/* Previous button */}
            <motion.button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full transition-all z-20"
              style={{
                backgroundColor: 'rgba(11, 11, 15, 0.3)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{
                backgroundColor: 'rgba(11, 11, 15, 0.7)',
                scale: 1.05,
                borderColor: 'var(--color-accent)'
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>

            {/* Next button */}
            <motion.button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full transition-all z-20"
              style={{
                backgroundColor: 'rgba(11, 11, 15, 0.3)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{
                backgroundColor: 'rgba(11, 11, 15, 0.7)',
                scale: 1.05,
                borderColor: 'var(--color-accent)'
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="rounded-full transition-all"
                  style={{
                    width: idx === currentIndex ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: idx === currentIndex ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                  whileHover={{ 
                    backgroundColor: idx === currentIndex ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.5)'
                  }}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Modal component
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: ProjectData | null; 
  onClose: () => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!project) return;
    
    // Check if mobile for drag functionality
    setIsMobile(window.innerWidth < 768);
    setIsClosing(false);
    
    // Lock body scroll and prevent width shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';
    
    // ESC key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the transition duration
  };
  
  if (!project) return null;
  
  return (
    <AnimatePresence mode="wait">
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.0, 0.0, 1] }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden"
          style={{ 
            backgroundColor: 'rgba(11, 11, 15, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: [0.2, 0.0, 0.0, 1] }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (isMobile && (info.offset.y > 100 || info.velocity.y > 500)) {
                handleClose();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-3xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-t-3xl md:rounded-2xl"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderTop: '2px solid var(--color-border-subtle)',
              boxShadow: '0 -4px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
          <div className="sticky top-0 z-10 px-4 py-3 md:hidden flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <div className="w-12 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border-subtle)' }} />
          </div>
          <div className="p-5 md:p-10">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="mb-6 text-sm flex items-center gap-2 transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Close
            </button>
            
            {/* Project title */}
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
              {project.title}
            </h2>
            
            {/* Domain tag */}
            <p className="text-xs md:text-sm mb-6 md:mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {project.domain}
            </p>
            
            {/* Problem context */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Problem Space</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.problem}
              </p>
            </div>
            
            {/* Challenges */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Key Constraints</h3>
              <ul className="space-y-2 md:space-y-2.5">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-2 md:gap-3 text-sm md:text-base">
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Artifact - Image Carousel */}
            {project.images && project.images.length > 0 && (
              <ImageCarousel images={project.images} />
            )}

            {/* Engineering */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">System Design & Implementation</h3>
              <ul className="space-y-2 md:space-y-2.5">
                {project.engineering.map((item, idx) => (
                  <li key={idx} className="flex gap-2 md:gap-3 text-sm md:text-base">
                    <span style={{ color: 'var(--color-accent)' }}>·</span>
                    <span style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tech stack */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 md:px-3 py-1 text-xs md:text-sm rounded"
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
      )}
    </AnimatePresence>
  );
}

// Additional Project Modal Component
function AdditionalProjectModal({ 
  project, 
  onClose,
  originRect
}: { 
  project: typeof additionalProjectsData[0] | null; 
  onClose: () => void;
  originRect: DOMRect | null;
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!project) return;
    
    setIsClosing(false);
    
    // Lock body scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };
  
  if (!project) return null;

  // Calculate initial position for expand animation
  const initialStyle = originRect ? {
    top: originRect.top,
    left: originRect.left,
    width: originRect.width,
    height: originRect.height
  } : {};
  
  return (
    <AnimatePresence mode="wait">
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
          style={{ 
            backgroundColor: 'rgba(11, 11, 15, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={originRect ? {
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
              position: 'fixed',
              opacity: 1
            } : { opacity: 0, scale: 0.95 }}
            animate={{
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: 'min(900px, 90vw)',
              height: 'auto',
              position: 'fixed',
              opacity: 1,
              scale: 1
            }}
            exit={originRect ? {
              top: originRect.top,
              left: originRect.left,
              x: 0,
              y: 0,
              width: originRect.width,
              height: originRect.height,
              opacity: 0
            } : { opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: [0.2, 0.0, 0.0, 1]
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => e.stopPropagation()}
            className="max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="p-8">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="mb-6 text-sm flex items-center gap-2 transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Close
              </button>
              
              {/* Project title */}
              <h2 className="text-3xl font-bold mb-2 leading-tight">
                {project.title}
              </h2>
              
              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.subtitle}
                </p>
              )}
              
              {/* Images */}
              {project.images && project.images.length > 0 && (
                <ImageCarousel images={project.images} />
              )}
              
              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Overview</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.overview}
                </p>
              </div>

              {/* Use Case / Context */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Use Case / Context</h3>
                <ul className="space-y-2">
                  {project.useCase.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-base">
                      <span style={{ color: 'var(--color-accent)' }}>•</span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features Delivered */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Features Delivered</h3>
                <ul className="space-y-2">
                  {project.features.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-base">
                      <span style={{ color: 'var(--color-accent)' }}>•</span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Role & Ownership */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Role & Ownership</h3>
                <ul className="space-y-2">
                  {project.role.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-base">
                      <span style={{ color: 'var(--color-accent)' }}>•</span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-subtle)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Other Projects Section Component
function OtherProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<typeof additionalProjectsData[0] | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleInteraction = (project: typeof additionalProjectsData[0], index: number) => {
    if (cardRefs.current[index]) {
      setOriginRect(cardRefs.current[index]!.getBoundingClientRect());
      setHoveredProject(project);
    }
  };

  return (
    <>
      <motion.section 
        className="px-4 md:px-6 py-14 md:py-20 relative w-full"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <motion.div 
            className="mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Other Work</h2>
            <div className="h-px w-20 bg-gradient-to-r from-current to-transparent opacity-30 mb-6" style={{ color: 'var(--color-accent)' }} />
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="hidden md:inline">Additional real-world applications demonstrating practical solutions and hands-on implementation.</span>
              <span className="md:hidden">Additional real-world applications.</span>
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {additionalProjectsData.map((project, idx) => (
              <motion.div
                key={project.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="relative p-5 md:p-8 rounded-xl md:rounded-2xl border h-full cursor-pointer group overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-subtle)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.2, 0.0, 0.0, 1] }}
                whileHover={{ 
                  borderColor: 'rgba(94, 234, 212, 0.2)',
                  boxShadow: '0 8px 20px rgba(94, 234, 212, 0.08)',
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleInteraction(project, idx)}
              >
                {/* Gradient glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(94, 234, 212, 0.02), transparent 60%)',
                  }}
                />
                
                {/* Top accent line */}
                <motion.div 
                  className="absolute top-0 left-0 h-0.5 rounded-full"
                  style={{ 
                    width: '0%',
                    backgroundColor: 'var(--color-accent)'
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
                
                <div className="flex flex-col h-full min-h-[260px] md:min-h-[320px] relative z-10">
                  {/* Project number badge */}
                  <div 
                    className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg mb-3 md:mb-4"
                    style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.05)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}
                  >
                    <span className="text-sm font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ 
                        color: 'var(--color-accent)',
                        backgroundColor: 'rgba(94, 234, 212, 0.05)',
                        border: '1px solid rgba(94, 234, 212, 0.1)'
                      }}>
                        {project.subtitle}
                      </span>
                    </div>
                  )}
                  <p className="text-sm md:text-base mb-6 leading-relaxed flex-grow" style={{ color: 'var(--color-text-secondary)' }}>
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-4">
                    {project.techStack.slice(0, 4).map((tech, techIdx) => (
                      <motion.span 
                        key={techIdx}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                        style={{ 
                          backgroundColor: 'rgba(18, 18, 26, 0.6)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border-subtle)'
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: 'var(--color-accent)',
                          color: 'var(--color-accent)',
                          y: -2
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span 
                        className="text-xs px-3 py-1.5 rounded-lg font-medium"
                        style={{ 
                          color: 'var(--color-text-secondary)',
                          opacity: 0.6
                        }}
                      >
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* View details link */}
                  <motion.div
                    className="inline-flex items-center gap-2 text-sm font-medium pt-2"
                    style={{ color: 'var(--color-accent)' }}
                    whileHover={{ x: 4 }}
                  >
                    <span>View details</span>
                    <motion.svg 
                      className="w-4 h-4"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {hoveredProject && (
        <AdditionalProjectModal 
          project={hoveredProject}
          onClose={() => setHoveredProject(null)}
          originRect={originRect}
        />
      )}
    </>
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
      className="min-h-[40vh] md:min-h-[70vh] flex flex-col md:flex-row md:items-center py-8 md:py-12 cursor-pointer group relative mb-8 md:mb-12"
      style={{ 
        opacity,
        scale
      }}
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: {},
        hover: {}
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(94, 234, 212, 0.05), transparent 70%)',
          filter: 'blur(30px)'
        }}
      />
      
      <div className="md:w-32 mb-6 md:mb-0 relative z-10">
        <div className="relative inline-block">
          <div 
            className="text-lg md:text-xl font-bold font-mono inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-300 relative"
            style={{ 
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-primary)'
            }}
          >
            <span className="relative z-10">
              {index}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 md:pl-8 relative z-10">
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
    <div suppressHydrationWarning>
      {/* Hidden preload images for all projects */}
      <div style={{ display: 'none' }} aria-hidden="true" suppressHydrationWarning>
        {projectsData.map((project) => 
          project.images?.map((imageSrc, idx) => (
            <Image
              key={`${project.id}-${idx}`}
              src={imageSrc}
              alt=""
              width={800}
              height={450}
            />
          ))
        )}
      </div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section min-h-screen flex items-center justify-center px-4 md:px-6 py-16 md:py-24 relative overflow-hidden w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.2, 0.0, 0.0, 1] 
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center relative z-10">
          {/* Portrait - Above text on mobile, right side on desktop */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div 
              className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-[420px] lg:w-96 lg:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden relative"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 0 20px rgba(94, 234, 212, 0.04)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(94, 234, 212, 0.08)'
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/portfolioProfile.png"
                alt="Kaushal's portrait"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 320px, 384px"
              />
              {/* Accent border glow */}
              <div 
                className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(94, 234, 212, 0.02)',
                  border: '1px solid rgba(94, 234, 212, 0.08)'
                }}
              />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6 md:space-y-0">
            {/* Intro line */}
            <motion.p 
              className="text-base md:text-lg mb-3 md:mb-4 font-medium" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Hello — I'm Kaushal.
            </motion.p>

            {/* Accent line */}
            <motion.div 
              className="h-px mb-6 md:mb-8 bg-gradient-to-r from-transparent via-current to-transparent"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Designing full-stack systems with intelligence and intent.
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed max-w-2xl" 
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="hidden sm:inline">I build full-stack applications, automation tools, and AI-powered systems with a strong focus on logic, performance, and user experience.</span>
              <span className="sm:hidden">I build full-stack applications and AI-powered systems with focus on performance and user experience.</span>
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg mb-8 md:mb-10 italic font-light" 
              style={{ color: 'var(--color-accent)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Clarity before complexity.
            </motion.p>
            
            
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-2.5 md:gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.button 
                onClick={() => {
                  window.open('/KaushalAmbaliyaResume1.pdf', '_blank');
                }}
                className="px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-medium relative overflow-hidden group text-sm md:text-base shadow-lg" 
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(94, 234, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 font-semibold">Resume</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '100%', opacity: 0.2 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <motion.button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-medium text-sm md:text-base" 
                style={{ 
                  border: '1px solid var(--color-border-subtle)', 
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'transparent'
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'var(--color-accent)',
                  backgroundColor: 'rgba(94, 234, 212, 0.05)',
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
      <section className="projects-section relative w-full" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
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
        
        <div className="max-w-6xl w-full mx-auto px-4 md:px-6 py-16 md:py-28 relative">
          <motion.div
            className="mb-12 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="h-px w-20 bg-gradient-to-r from-current to-transparent opacity-30 mb-6" style={{ color: 'var(--color-accent)' }} />
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="hidden md:inline">A selection of systems and tools I've built, spanning healthcare platforms, AI infrastructure, and business automation.</span>
              <span className="md:hidden">Systems spanning healthcare, AI, and automation.</span>
            </p>
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
                className="space-y-4 md:space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm font-mono uppercase tracking-wider px-3 py-1 rounded-full" style={{ 
                    color: 'var(--color-accent)', 
                    backgroundColor: 'rgba(94, 234, 212, 0.05)',
                    border: '1px solid rgba(94, 234, 212, 0.2)'
                  }}>
                    {project.domain}
                  </span>
                </div>
                <div className="relative inline-block mb-3 md:mb-4">
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {project.title}
                  </h3>
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-accent)',
                      width: '0%'
                    }}
                    variants={{
                      initial: { width: '0%' },
                      hover: { width: '100%' }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
                  {project.problem.substring(0, 150)}...
                </p>
                
                {/* Tech stack with enhanced pills */}
                <div className="flex flex-wrap gap-2 md:gap-2.5 pt-2">
                  {project.techStack.slice(0, 5).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg font-medium"
                      style={{ 
                        backgroundColor: 'rgba(18, 18, 26, 0.8)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-subtle)',
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg" style={{ 
                      color: 'var(--color-text-secondary)',
                      opacity: 0.5
                    }}>
                      +{project.techStack.length - 5} more
                    </span>
                  )}
                </div>
                
                <motion.div
                  className="inline-flex items-center gap-2 pt-2 md:pt-4" 
                  whileHover={{ x: 4 }}
                >
                  <span className="text-sm md:text-base font-medium" style={{ color: 'var(--color-accent)' }}>
                    View details
                  </span>
                  <motion.svg 
                    className="w-5 h-5 md:w-6 md:h-6"
                    style={{ color: 'var(--color-accent)' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </Project>
          ))}
        </div>
      </section>

      {/* Other Selected Projects Section */}
      <OtherProjectsSection />

      {/* Core Competencies Section */}
      <motion.section 
        className="px-4 md:px-6 py-12 md:py-16 relative w-full min-h-0 md:min-h-screen flex items-center"
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
          <motion.div 
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Competencies</h2>
            <div className="h-px w-20 bg-gradient-to-r from-current to-transparent opacity-30 mb-6" style={{ color: 'var(--color-accent)' }} />
            <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="hidden md:inline">I focus on understanding systems deeply before building them, so the solutions are scalable, reliable, and easy to use.</span>
              <span className="md:hidden">Building scalable, reliable, and user-friendly solutions.</span>
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Pillar 1 */}
            <motion.div 
              className="group relative p-5 md:p-6 rounded-xl overflow-hidden" 
              style={{ 
                border: '1px solid var(--color-border-subtle)', 
                backgroundColor: 'rgba(18, 18, 26, 0.4)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ 
                borderColor: 'rgba(94, 234, 212, 0.15)',
                boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                transition: { duration: 0.2 }
              }}
            >
              {/* Top accent line */}
              <motion.div 
                className="absolute top-0 left-0 h-0.5 rounded-full"
                style={{ 
                  width: '0%',
                  backgroundColor: 'var(--color-accent)'
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(94, 234, 212, 0.015), transparent 60%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.05)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight flex-1">
                    System Design & Architecture
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Designing clear data and control flows instead of tightly coupled logic
                    </span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Making conscious trade-offs between scalability, simplicity, and performance
                    </span>
                  </li>
                  <li className="hidden md:flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Structuring backend services and APIs for long-term maintainability
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              className="group relative p-5 md:p-6 rounded-xl overflow-hidden" 
              style={{ 
                border: '1px solid var(--color-border-subtle)', 
                backgroundColor: 'rgba(18, 18, 26, 0.4)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                borderColor: 'rgba(94, 234, 212, 0.15)',
                boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-0.5 rounded-full"
                style={{ 
                  width: '0%',
                  backgroundColor: 'var(--color-accent)'
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(94, 234, 212, 0.015), transparent 60%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.05)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight flex-1">
                    AI / ML Systems (Applied)
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Treating ML models as system components, not black boxes
                    </span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Handling latency, accuracy trade-offs, and failure cases in real-world usage
                    </span>
                  </li>
                  <li className="hidden md:flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Evaluating models using meaningful metrics instead of raw accuracy alone
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              className="group relative p-5 md:p-6 rounded-xl overflow-hidden" 
              style={{ 
                border: '1px solid var(--color-border-subtle)', 
                backgroundColor: 'rgba(18, 18, 26, 0.4)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ 
                borderColor: 'rgba(94, 234, 212, 0.15)',
                boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-0.5 rounded-full"
                style={{ 
                  width: '0%',
                  backgroundColor: 'var(--color-accent)'
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(94, 234, 212, 0.015), transparent 60%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.05)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight flex-1">
                    Automation & Optimization
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Identifying repetitive or error-prone workflows and automating them
                    </span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Designing systems that fail gracefully and are easy to debug
                    </span>
                  </li>
                  <li className="hidden md:flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Optimizing for reliability and clarity before premature performance gains
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div 
              className="group relative p-5 md:p-6 rounded-xl overflow-hidden" 
              style={{ 
                border: '1px solid var(--color-border-subtle)', 
                backgroundColor: 'rgba(18, 18, 26, 0.4)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                borderColor: 'rgba(94, 234, 212, 0.15)',
                boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-0.5 rounded-full"
                style={{ 
                  width: '0%',
                  backgroundColor: 'var(--color-accent)'
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(94, 234, 212, 0.015), transparent 60%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.05)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight flex-1">
                    Frontend Engineering & UX
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Managing complex state without compromising user experience
                    </span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Designing interactions that feel intentional, not decorative
                    </span>
                  </li>
                  <li className="hidden md:flex gap-2.5 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Balancing performance, accessibility, and visual clarity
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Professional Background Section */}
      <motion.section 
        className="px-4 md:px-6 py-16 md:py-24 min-h-0 md:min-h-screen flex items-center relative w-full"
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
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Background</h2>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mb-6 mx-auto" style={{ color: 'var(--color-accent)' }} />
            <p className="text-base md:text-lg max-w-2xl mx-auto hidden md:block" style={{ color: 'var(--color-text-secondary)' }}>
              My journey in software engineering and research
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Professional Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-8" style={{ color: 'var(--color-text-primary)' }}>Experience</h3>
              
              <motion.div 
                className="relative p-6 rounded-xl" 
                style={{ 
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'rgba(18, 18, 26, 0.4)'
                }}
                whileHover={{ 
                  borderColor: 'rgba(94, 234, 212, 0.15)',
                  boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Timeline accent */}
                <div className="absolute left-0 top-6 w-1 h-12 rounded-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.3 }} />
                
                <div className="mb-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-lg font-semibold mb-1">Software Engineering Intern</p>
                      <p className="text-base mb-1" style={{ color: 'var(--color-accent)' }}>Tark Technologies</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ 
                      color: 'var(--color-accent)',
                      backgroundColor: 'rgba(94, 234, 212, 0.1)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}>2024</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Designed and implemented a billing engine using object-oriented principles and SOLID design patterns
                    </span>
                  </li>
                  <li className="hidden md:flex gap-3 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Focused on scalable architecture and maintainable code structure
                    </span>
                  </li>
                  <li className="hidden md:flex gap-3 items-start">
                    <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      Developed debugging and optimization skills through production system work
                    </span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Credentials Column */}
            <div className="space-y-10">
              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Certifications</h3>
                
                <motion.div 
                  className="p-6 rounded-xl group" 
                  style={{ 
                    border: '1px solid var(--color-border-subtle)', 
                    backgroundColor: 'rgba(18, 18, 26, 0.4)' 
                  }}
                  whileHover={{ 
                    borderColor: 'rgba(94, 234, 212, 0.15)',
                    boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.1)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}>
                      <svg className="w-6 h-6" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold mb-2">Microsoft Azure AI-900</p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Azure AI Fundamentals</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Patents & Research */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Research & IP</h3>
                
                <motion.div 
                  className="p-6 rounded-xl group" 
                  style={{ 
                    border: '1px solid var(--color-border-subtle)', 
                    backgroundColor: 'rgba(18, 18, 26, 0.4)' 
                  }}
                  whileHover={{ 
                    borderColor: 'rgba(94, 234, 212, 0.15)',
                    boxShadow: '0 4px 16px rgba(94, 234, 212, 0.05)',
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                      backgroundColor: 'rgba(94, 234, 212, 0.1)',
                      border: '1px solid rgba(94, 234, 212, 0.2)'
                    }}>
                      <svg className="w-6 h-6" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold mb-2">Patent Application</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Novel methodology for real-time log analysis using machine learning
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="px-4 md:px-6 py-16 md:py-20 min-h-0 md:min-h-screen flex items-center relative w-full"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
            <div className="h-px w-20 bg-gradient-to-r from-current to-transparent opacity-20 mb-8 md:mb-12" style={{ color: 'var(--color-accent)' }} />
          </motion.div>
          
          {/* Identity line */}
          <motion.div
            className="p-6 md:p-8 rounded-xl mb-8 md:mb-10"
            style={{ 
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'rgba(18, 18, 26, 0.3)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-center" style={{ color: 'var(--color-text-primary)' }}>
              I build systems by thinking deeply before building quickly.
            </p>
          </motion.div>
          
          {/* Explanatory paragraph */}
          <motion.p 
            className="text-base md:text-lg leading-relaxed mb-8 md:mb-12" 
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="hidden md:inline">I prioritize understanding the problem space and constraints before writing code. 
            Solutions should be clear, maintainable, and built to last—not clever for the sake of complexity. 
            I care deeply about usability and real-world impact, where software reduces friction and handles complexity gracefully.</span>
            <span className="md:hidden">I prioritize understanding problems before coding. Solutions should be clear, maintainable, and built to last—focused on usability and real-world impact.</span>
          </motion.p>
          
          {/* Working principles */}
          <motion.div
            className="p-6 md:p-8 rounded-xl"
            style={{ 
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'rgba(18, 18, 26, 0.3)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-5 md:mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
              <span className="w-1 h-6 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
              How I work
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Design systems with clear boundaries and maintainable architecture that teams can reason about
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Treat user experience as a first-class concern, not an afterthought
                </span>
              </li>
              <li className="hidden md:flex gap-3 items-start">
                <span className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>▸</span>
                <span className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  Engage in direct communication and constructive technical debate to reach better solutions
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="px-4 md:px-6 py-16 md:py-24 min-h-0 md:min-h-screen flex items-center relative overflow-hidden w-full"
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
          <div className="mb-10 md:mb-16 text-center">
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
              <span className="hidden md:inline">I'd love to hear from you! Whether you have a project in mind, want to collaborate on something interesting, or just want to say hello — drop me a message below.</span>
              <span className="md:hidden">Let's connect! Drop me a message below.</span>
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
      <footer className="relative py-8 md:py-12 px-4 md:px-6" style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
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
          <div className="pt-6 md:pt-8 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
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

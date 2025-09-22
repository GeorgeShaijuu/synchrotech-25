import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Calendar, MapPin, Users, Trophy, Code, Shield, Cloud, BarChart, Lightbulb, ExternalLink, Menu, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import PixelDino from './components/PixelDino';
import Mine from './components/Mine';
import Pacman from './components/Pacman';
import logo from '../src/logo.png';
import TextType from './components/Text-type';
import TargetCursor from './components/TargetCursor';
import InfiniteMenu from './components/InfiniteMenu';
import Carousel from './components/Carousel';

const MouseFollowingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0); 
  const animationFrameRef = useRef();
  const lastScrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    const animate = () => {
      // Smooth scroll animation
      lastScrollRef.current = lerp(
        lastScrollRef.current,
        targetScrollRef.current,
        0.1
      );

      setScrollPosition(lastScrollRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
              linear-gradient(
                ${scrollPosition * 0.05}deg,
                rgba(6, 182, 212, 0.05) 0%,
                rgba(59, 130, 246, 0.05) 50%,
                rgba(147, 51, 234, 0.05) 100%
              )
            `,
          transition: 'none' // Remove transition to prevent delay
        }}
      ></div>

      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px',
          backgroundPosition: `
              ${(mousePosition.x - 50) * 0.05}px ${scrollPosition * 0.5}px
            `,
          backgroundRepeat: 'repeat',
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
          transition: 'none' // Remove transition to prevent delay
        }}
      />

      {/* Floating orbs */}
      {/* Floating orbs */}
      {/* Tech pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-5">
          <pattern
            id="tech-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 20h60l-30 60z M80 20v60 M20 50h60"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-cyan-400"
              style={{
                transform: `rotate(${scrollPosition * 0.02}deg)`,
                transformOrigin: 'center',
                transition: 'none' // Remove transition to prevent delay
              }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tech-pattern)" />
        </svg>
      </div>
    </div>
  );
};

const items = [
  // AI & ML Domain
  {
    image: require('./event-logos/1.png'),
    link: '#',
    // title: 'Machine Learning Challenge',
    // description: 'Showcase your ML expertise through real-world problem solving'
  },
  {
    image: require('./event-logos/2.png'),
    link: '#',
    // title: 'AI Innovation Showcase',
    // description: 'Present your innovative AI solutions and applications'
  },
  {
    image: require('./event-logos/3.png'),
    link: '#',
    // title: 'Neural Network Workshop',
    // description: 'Learn to build and train neural networks from scratch'
  },

  // Cyber Security Domain
  {
    image: require('./event-logos/4.png'),
    link: '#',
    // title: 'Ethical Hacking Contest',
    // description: 'Test your security skills in a controlled environment'
  },
  {
    image: require('./event-logos/5.png'),
    link: '#',
    // title: 'Security Audit Challenge',
    // description: 'Identify and fix security vulnerabilities in systems'
  },
  {
    image: require('./event-logos/6.png'),
    link: '#',
    // title: 'Cryptography Quiz',
    // description: 'Challenge yourself with encryption and security puzzles'
  },

  // Cloud Computing Domain
  {
    image: require('./event-logos/7.png'),
    link: '#',
    // title: 'Cloud Architecture Design',
    // description: 'Design scalable and efficient cloud solutions'
  },
  {
    image: require('./event-logos/8.png'),
    link: '#',
    // title: 'DevOps Pipeline Challenge',
    // description: 'Build and optimize CI/CD pipelines'
  },
  {
    image: require('./event-logos/9.png'),
    link: '#',
    // title: 'Serverless Solutions',
    // description: 'Create modern serverless applications'
  },

  // Data Science & Analytics Domain
  {
    image: require('./event-logos/10.png'),
    link: '#',
    // title: 'Data Visualization Contest',
    // description: 'Transform complex data into meaningful visualizations'
  },
  {
    image: require('./event-logos/11.png'),
    link: '#',
    // description: 'Build models to forecast future trends'
  },
  {
    image: require('./event-logos/12.png'),
    link: '#',
    // title: 'Big Data Workshop',
    // description: 'Learn to handle and analyze large datasets'
  },

  // Non-Tech Domain
  {
    image: require('./event-logos/13.png'),
    link: '#',
    // title: 'Tech Quiz',
    // description: 'Test your knowledge of technology and trends'
  },
  {
    image: require('./event-logos/14.png'),
    link: '#',
    // title: 'Photography Contest',
    // description: 'Capture the essence of technology through your lens'
  },
  {
    image: require('./event-logos/15.png'),
    link: '#',
    // description: 'Learn innovative problem-solving approaches'
  }
];

const SynchroTechWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactModal,setShowContactModal] = useState(false);
  const lenisRef = useRef(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showContactModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showContactModal]);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      if (lenisRef.current) lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  // Sample data - you can replace with your actual data
  const domains = [
    {
      name: 'AI & ML',
      logo: require('./domain/aiml.png'),
      color: 'from-cyan-400/50 to-blue-500/50',
      events: ['SPIDER-GEN', 'CODE-SWING', 'NEUROWEB'],
      head: 'GEORGE SHAIJU'
    },
    {
      name: 'Cyber Security',
      logo: require('./domain/cyber.png'),
      
      color: 'from-green-400 to-blue-500/50',
      events: ['TECH MAFIA', 'HACK OR BE HACKED', 'XPLOIT'],
      head: 'DEV AGARWAL'
    },
    {
      name: 'Cloud Computing',
      logo: require('./domain/cloud.png'),
      color: 'from-yellow-400 to-teal-500/50',
      events: ['STORM BREAKER', 'CLOUD ODYSSEY', 'MASCOT MHYHEM'],
      head: 'ANCHAL VERMA'
    },
    {
      name: 'Data Science & Analytics',
      logo: require('./domain/datasci.png'),
      color: 'from-purple-400 to-pink-500/50',
      events: ['MATHLYTICS', 'INSIGHTX', 'SPIDER TRAIL'],
      head: 'JIYANA SHIBI'
    },
    {
      name: 'Non-Tech',
      logo: require('./domain/non-tech.png'),
      color: 'from-pink-400 to-purple-500',
      events: ['VENOMS VERDICT', 'OSCORP INNOVATIONS', 'MULTIVERSE OF MINDS'],
      head: 'NICHOLAS CHARLES CHARIAN'
    }
  ];

  const coordinators = [
    {
      name: 'Anandhu Krishna',
      role: 'Student Coordinator',
      image: require('./co-photos/anandhu.png')
    },
    {
      name: 'Tania T M',
      role: 'Student Coordinator',
      image: require('./co-photos/tania.png')
    }
  ];

  // Add contact details for coordinators
  coordinators[0].phone = '+91  7736570371';
  coordinators[0].email = '23BCNB10@kristujayanti.com';
  coordinators[1].phone = '+91 9449561596';
  coordinators[1].email = '23BCLB55@kristujayanti.com';

  // News & Updates
  const newsItems = [
    {
      date: '2025-08-10',
      title: 'Closing of Registrations',
      content: 'Registration for SynchroTech 2K25 is now open. Early bird slots available.'
    },
    {
      date: '2025-09-01',
      title: 'Schedule Released',
      content: 'Preliminary event schedule has been published. Check the Time-Table for details.'
    }
  ];

  // Simple timetable
  const timeTable = [
    { day: '23 Sep 2025', events: [
      { time: '10:00', name: 'Opening Ceremony' },
      { time: '11:30', name: 'AI & ML — Machine Learning Challenge' }
    ]},
    { day: '24 Sep 2025', events: [
      { time: '10:00', name: 'Cybersecurity — Ethical Hacking Contest' },
      { time: '13:00', name: 'Data Science — Data Visualization Contest' }
    ]}
  ];

  // Schedule images (from src/shedule)
  const scheduleImages = [
    require('./shedule/1.png'),
    require('./shedule/2.png'),
    require('./shedule/3.png'),
    require('./shedule/4.png'),
    require('./shedule/5.png'),
    require('./shedule/6.png')
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Use the single Lenis instance if available, otherwise fallback to native smooth scroll
      if (lenisRef.current && typeof lenisRef.current.scrollTo === 'function') {
        lenisRef.current.scrollTo(element, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <MouseFollowingBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">

              <img
                src={logo}
                alt="SynchroTech Logo"
                className="w-auto h-2 md:h-10"  // Adjust height as needed
              />
            </div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'domains', 'team', 'timetable', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`cursor-target capitalize transition-all duration-300 hover:text-cyan-400 ${activeSection === item ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-cyan-500/30 py-4">
              {['home', 'about', 'domains', 'team', 'news', 'timetable', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 capitalize hover:text-cyan-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <PixelDino className="absolute top-20 right-10 w-16 h-16 opacity-30 animate-float" />
        <Mine className="absolute bottom-40 left-20 w-12 h-12 opacity-20 animate-float-delayed" />
        <PixelDino className="absolute top-40 left-[15%] w-8 h-8 opacity-25 animate-bounce-slow" />
        <Mine className="absolute bottom-20 right-[25%] w-10 h-10 opacity-20 animate-float" />
        <Pacman className="absolute top-[30%] right-[30%] w-10 h-10 opacity-20 animate-float" />
        <Pacman className="absolute bottom-[15%] left-[35%] w-14 h-14 opacity-25 animate-bounce-slow" />

        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="transparent allign-center justify-center flex space-x-4 mb-4">
              <img
                src={logo}
                alt="SynchroTech Logo"
                className="w-auto h-24 md:h-32 animate-pulse"  // Adjust height as needed
              />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-cyan-300">
              <TextType
                text={["≪≪ Mission and Vision ≫≫"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </p>
            <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
              SynchroTech 2K25 is the flagship intra-university fest of the Department of Computer Science,
              bringing together first and second-year students to showcase their skills and creativity.
              With 15 engaging events across cybersecurity, AI & ML, data science & analytics,
              cloud computing, and non-technical domains.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Calendar className="w-5 h-5" />
              <span>23rd - 27th September 2025</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <MapPin className="w-5 h-5" />
              <span>Kristu Jayanti University</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400">
              <Users className="w-5 h-5" />
              <span>15 Events • 5 Domains</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-izgcwMqrXbZrxcmFtOiIsdECROk-WRxIYu9Q0tivBvA4pA/viewform" target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 items-center justify-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Register Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => scrollToSection('about')}
              className="cursor-target px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <PixelDino className="absolute bottom-10 left-10 w-12 h-12 opacity-20 animate-float" />
        <Mine className="absolute top-40 right-[10%] w-16 h-16 opacity-15 animate-float-delayed" />
        <PixelDino className="absolute top-[60%] left-[20%] w-10 h-10 opacity-20 animate-bounce-slow" />
        <Pacman className="absolute top-[30%] left-[5%] w-12 h-12 opacity-20 animate-float-delayed" />
        <Pacman className="absolute bottom-[20%] right-[15%] w-16 h-16 opacity-15 animate-bounce-slow" />

        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <TextType
              text={["About SynchroTech"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-400 pl-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  <TextType
                    text={["Innovation & Excellence"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                  />
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Organized and hosted by third-year students, SynchroTech blends innovation, teamwork,
                  and technical excellence, providing participants with opportunities for real-world exposure,
                  problem-solving, and leadership growth.
                </p>
              </div>

              <div className="border-l-4 border-purple-400 pl-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Beyond Competition</h3>
                <p className="text-gray-300 leading-relaxed">
                  It is more than a competition – it is a celebration of knowledge, talent,
                  and the spirit of discovery. Join us in this journey of technological exploration
                  and creative expression.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg p-8 backdrop-blur-sm border border-cyan-500/30">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-cyan-400">15</div>
                    <div className="text-gray-300">Events</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">5</div>
                    <div className="text-gray-300">Domains</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-cyan-400">5 + 1</div>
                    <div className="text-gray-300">Days</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">∞</div>
                    <div className="text-gray-300">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="relative z-10 py-20 px-4">
        <Mine className="absolute top-20 right-[15%] w-20 h-20 opacity-15 animate-float" />
        <PixelDino className="absolute bottom-40 left-[10%] w-14 h-14 opacity-20 animate-float-delayed" />
        <Mine className="absolute top-[40%] right-20 w-12 h-12 opacity-25 animate-bounce-slow" />
        <Pacman className="absolute top-[25%] left-[30%] w-10 h-10 opacity-20 animate-float" />
        <Pacman className="absolute bottom-[35%] right-[25%] w-12 h-12 opacity-15 animate-bounce-slow" />

        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <TextType
              text={["Domains & Events"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="cursor-target group relative bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${domain.color.split(' ')[1]}, ${domain.color.split(' ')[3]})` }}>
                </div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${domain.color} text-black mb-4`}>
                    <img src={domain.logo} alt={`${domain.name} logo`} className="w-8 h-8 object-contain" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    <TextType
                      text={[domain.name]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                    />
                  </h3>
                  <p className="text-gray-400 mb-4">Domain Head: {domain.head}</p>

                  <div className="space-y-2">
                    {domain.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="text-sm text-gray-300 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>{event}</span>
                      </div>
                    ))}
                  </div>

                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-izgcwMqrXbZrxcmFtOiIsdECROk-WRxIYu9Q0tivBvA4pA/viewform" target="_blank" rel="noopener noreferrer" className="cursor-target mt-4 inline-flex w-full py-2 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-colors duration-300 items-center justify-center space-x-2">
                    <span>Register for Events</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative z-10 py-20 px-4">
        <PixelDino className="absolute top-20 left-[5%] w-16 h-16 opacity-20 animate-float" />
        <Mine className="absolute bottom-[30%] right-[8%] w-10 h-10 opacity-15 animate-float-delayed" />
        <PixelDino className="absolute top-[50%] left-[25%] w-12 h-12 opacity-20 animate-bounce-slow" />
        <Pacman className="absolute top-[45%] right-[15%] w-14 h-14 opacity-20 animate-float-delayed" />
        <Pacman className="absolute bottom-[15%] left-[40%] w-8 h-8 opacity-25 animate-float" />

        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <TextType
              text={["Our Team"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h2>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-cyan-400 mb-8">
              <TextType
                text={["Student Coordinators"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {coordinators.map((coordinator, index) => (
                <div key={index} className="cursor-target text-center group">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-1">
                      <img
                        src={coordinator.image}
                        alt={coordinator.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <h4 className="text-xl font-bold text-white">{coordinator.name}</h4>
                  <p className="text-cyan-400">{coordinator.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-8">
              <TextType
                text={["Domain Heads"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {domains.map((domain, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${domain.color} rounded-full p-1 flex items-center justify-center`}>
                      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                        <img src={domain.logo} alt={`${domain.name} logo`} className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white">{domain.head}</h4>
                  <p className="text-gray-400 text-sm">{domain.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Infinite Menu */}
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          <TextType
            text={["Events"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </h2>

        <div style={{
          height: '500px', // Increased height for better visibility
          position: 'relative',
          background: 'transparent',
          width: '100%', // Full width
          margin: '0 auto'
        }}>
          <InfiniteMenu items={items} />
        </div>
      </div>

      {/* Time-Table Section */}
      <section id="timetable" className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Time-Table</h2>

            {/* Carousel for schedule images */}
            <div className="flex justify-center mb-8">
              <Carousel items={scheduleImages} height={420} />
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <Mine className="absolute top-10 right-[20%] w-14 h-14 opacity-20 animate-float" />
        <PixelDino className="absolute bottom-20 left-[15%] w-12 h-12 opacity-15 animate-float-delayed" />
        <Pacman className="absolute top-[40%] left-[10%] w-12 h-12 opacity-20 animate-bounce-slow" />
        <Pacman className="absolute bottom-[30%] right-[35%] w-10 h-10 opacity-15 animate-float-delayed" />

        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <TextType
              text={["Get In Touch"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h2>

          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
            <div className="text-center space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Kristu Jayanti University</h3>
                <p className="text-gray-300">School of Computational and Physical Sciences</p>
                <p className="text-gray-300">Department of Computer Science</p>
                <p className="text-gray-300">Bengaluru, India</p>
              </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-izgcwMqrXbZrxcmFtOiIsdECROk-WRxIYu9Q0tivBvA4pA/viewform" target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 items-center justify-center space-x-2">
                      <span>Register Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="cursor-target px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
                    >
                      Contact Coordinators
                    </button>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
          <div className="bg-black/95 border border-cyan-500/30 rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-cyan-400">Contact Coordinators</h3>
              <button onClick={() => setShowContactModal(false)} className="text-gray-300">Close</button>
            </div>

            <div className="mt-4 space-y-4">
              {coordinators.map((co, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-gray-900/20 border border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-500 p-1">
                      <img src={co.image} alt={co.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{co.name}</div>
                      <div className="text-sm text-gray-300">{co.role}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-cyan-300">Phone:</span>
                      <a href={`tel:${co.phone}`} className="text-gray-200 hover:text-cyan-300">{co.phone}</a>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-medium text-cyan-300">Email:</span>
                      <a href={`mailto:${co.email}`} className="text-gray-200 hover:text-cyan-300">{co.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
        <Mine className="absolute bottom-10 right-10 w-8 h-8 opacity-20 animate-float" />
        <PixelDino className="absolute bottom-8 left-10 w-6 h-6 opacity-15 animate-bounce-slow" />
        <Pacman className="absolute bottom-12 left-[40%] w-8 h-8 opacity-20 animate-float" />

        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              SYNCHROTECH 2025
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 Kristu Jayanti University - Department of Computer Science
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SynchroTechWebsite;
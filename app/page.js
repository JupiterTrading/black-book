'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Loading Screen with GIF → Fade → Logo sequence
function LoadingSequence({ onComplete }) {
  const [phase, setPhase] = useState('gif') // 'gif' | 'fadeOut' | 'logo'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // TODO: Replace these timers with actual data loading logic
    // Example: Promise.all([fetchDocuments(), fetchPeople()]).then(() => setPhase('fadeOut'))
    
    // Phase 1: Show spinning hourglass GIF for 8 seconds (more cycles)
    const gifTimer = setTimeout(() => {
      setPhase('fadeOut')
    }, 8000)

    // Phase 2: Fade to black, then show logo after 1 second
    const fadeTimer = setTimeout(() => {
      setPhase('logo')
    }, 9000)

    return () => {
      clearTimeout(gifTimer)
      clearTimeout(fadeTimer)
    }
  }, [])

  const handleEnter = () => {
    onComplete()
  }

  if (!mounted) return <div className="fixed inset-0 bg-[#0a1628]" />

  return (
    <div className="fixed inset-0 bg-[#0a1628] flex items-center justify-center z-50">
      {/* Phase 1: Spinning hourglass GIF */}
      {phase === 'gif' && (
        <div className="w-[200px] h-[200px] relative animate-fadeIn">
          <Image
            src="/hourglass.gif"
            alt="Loading"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      )}

      {/* Phase 2: Fade to black */}
      {phase === 'fadeOut' && (
        <div className="w-[200px] h-[200px] relative animate-fadeOut">
          <Image
            src="/hourglass.gif"
            alt="Loading"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}

      {/* Phase 3: Logo lights up */}
      {phase === 'logo' && (
        <div 
          className="relative cursor-pointer animate-logoReveal"
          onClick={handleEnter}
        >
          {/* Logo with glow animation */}
          <div className="relative">
            {/* Glow layer */}
            <div className="absolute inset-0 blur-xl opacity-0 animate-glowPulse">
              <Image
                src="/hourglass-static.png"
                alt=""
                width={200}
                height={200}
                className="object-contain opacity-50"
                unoptimized
              />
            </div>
            
            {/* Main logo */}
            <div className="relative animate-logoFadeIn">
              <Image
                src="/hourglass-static.png"
                alt="The Black Book"
                width={200}
                height={200}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Click to enter text - positioned absolutely so it doesn't affect logo centering */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-8 text-white/0 animate-textFadeIn font-mono text-sm tracking-widest whitespace-nowrap">
            [ CLICK TO ENTER ]
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes logoReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes glowPulse {
          0% { opacity: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        
        @keyframes textFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.5; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 1s ease-out forwards;
        }
        
        .animate-logoReveal {
          animation: logoReveal 0.3s ease-out forwards;
        }
        
        .animate-logoFadeIn {
          animation: logoFadeIn 1.5s ease-out forwards;
        }
        
        .animate-glowPulse {
          animation: glowPulse 2s ease-out forwards;
        }
        
        .animate-textFadeIn {
          animation: textFadeIn 1s ease-out 0.8s forwards;
        }
      `}</style>
    </div>
  )
}

// Main categories
const categories = [
  { name: 'Court Records', count: 847, icon: '⚖️', slug: 'court-records', description: 'Legal filings, depositions, and judicial documents' },
  { name: 'DOJ Disclosures', count: 1243, icon: '📋', slug: 'doj-disclosures', description: 'Documents released under the Epstein Files Transparency Act' },
  { name: 'Flight Logs', count: 156, icon: '✈️', slug: 'flight-logs', description: 'Aircraft travel records and passenger manifests' },
  { name: 'Financial Records', count: 432, icon: '💰', slug: 'financial', description: 'Banking, transactions, and asset documentation' },
  { name: 'FOIA Records', count: 621, icon: '📁', slug: 'foia', description: 'Freedom of Information Act request responses' },
]

const featuredPeople = [
  { name: 'Jeffrey Epstein', documents: 1847, status: 'Deceased' },
  { name: 'Ghislaine Maxwell', documents: 243, status: 'Convicted' },
  { name: 'Jean-Luc Brunel', documents: 87, status: 'Deceased' },
]

// Main Content
function MainContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-[#0a1628]" />

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-6 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mini hourglass logo */}
            <div className="w-8 h-10 relative">
              <Image
                src="/hourglass-static.png"
                alt="Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-lg font-mono tracking-wider">THE BLACK BOOK</h1>
              <p className="text-white/40 text-xs font-mono">EPSTEIN FILES</p>
            </div>
          </div>
          <nav className="flex gap-6 text-sm font-mono">
            <Link href="/people" className="text-white/50 hover:text-white transition-colors">PEOPLE</Link>
            <Link href="/search" className="text-white/50 hover:text-white transition-colors">SEARCH</Link>
            <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">SOURCE</a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Search */}
        <div className="p-12 text-center">
          <h2 className="text-3xl font-mono tracking-wide mb-4">EXPLORE THE FILES</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto font-mono text-sm">
            Public access to documents from the DOJ Epstein Library
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search documents, names, dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/20 px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-mono"
            />
            {searchQuery && (
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-2 font-mono text-sm hover:bg-white/90 transition-colors"
              >
                SEARCH
              </Link>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 pb-12">
          <h3 className="text-xs font-mono tracking-widest text-white/30 mb-6">DOCUMENT CATEGORIES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group block bg-white/5 border border-white/10 p-6 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h4 className="text-lg font-mono group-hover:text-white transition-colors">{cat.name}</h4>
                <p className="text-sm text-white/50 mt-2">{cat.description}</p>
                <p className="text-xs font-mono text-white/30 mt-4">{cat.count.toLocaleString()} DOCUMENTS</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Key Figures */}
        <div className="px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono tracking-widest text-white/30">KEY FIGURES</h3>
            <Link href="/people" className="text-xs font-mono text-white/30 hover:text-white transition-colors">
              VIEW ALL →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredPeople.map((person) => (
              <Link
                key={person.name}
                href={`/person/${person.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-mono text-lg group-hover:border-white/30 transition-colors">
                  {person.name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-mono group-hover:text-white transition-colors">{person.name}</h4>
                  <p className="text-xs font-mono text-white/30">{person.documents} DOCS • {person.status.toUpperCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-white/10 text-center">
          <p className="text-xs font-mono text-white/30">
            ALL DOCUMENTS SOURCED FROM{' '}
            <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              JUSTICE.GOV/EPSTEIN
            </a>
          </p>
          <p className="text-xs font-mono text-white/30 mt-2">
            FOR PUBLIC TRANSPARENCY AND ACCOUNTABILITY
          </p>
        </footer>
      </div>
    </main>
  )
}

// Main Page Component
export default function Home() {
  const [showMain, setShowMain] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasVisited = sessionStorage.getItem('blackbook-visited')
    if (hasVisited) {
      setShowMain(true)
    }
  }, [])

  const handleEnter = useCallback(() => {
    sessionStorage.setItem('blackbook-visited', 'true')
    setShowMain(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#0a1628]" />
  }

  if (!showMain) {
    return <LoadingSequence onComplete={handleEnter} />
  }

  return <MainContent />
}

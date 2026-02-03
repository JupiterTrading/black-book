'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Mock search database - will be replaced with real data
const searchDatabase = {
  documents: [
    { id: 'cr-001', name: 'Deposition of Juan Alessi', type: 'Court Record', date: '2009', keywords: ['alessi', 'deposition', 'palm beach', 'house manager', 'epstein', 'maxwell'] },
    { id: 'cr-002', name: 'Virginia Giuffre vs. Maxwell Filing', type: 'Court Record', date: '2015', keywords: ['giuffre', 'maxwell', 'lawsuit', 'civil', 'virginia'] },
    { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', date: '2001-2003', keywords: ['flight', 'log', 'plane', 'aircraft', 'clinton', 'epstein', 'maxwell', 'lolita express'] },
    { id: 'fl-002', name: 'Flight Log N908JE (2004-2005)', type: 'Flight Log', date: '2004-2005', keywords: ['flight', 'log', 'plane', 'aircraft', 'epstein', 'maxwell'] },
    { id: 'cr-003', name: 'Palm Beach Police Report', type: 'Court Record', date: '2005', keywords: ['police', 'palm beach', 'investigation', 'epstein'] },
    { id: 'fin-001', name: 'Bank Account Summary - Deutsche Bank', type: 'Financial', date: '2019', keywords: ['bank', 'deutsche', 'financial', 'money', 'epstein'] },
  ],
  people: [
    { slug: 'jeffrey-epstein', name: 'Jeffrey Epstein', detail: 'Appears in 1,847 documents', keywords: ['jeffrey', 'epstein', 'jeff'] },
    { slug: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', detail: 'Appears in 243 documents', keywords: ['ghislaine', 'maxwell'] },
    { slug: 'bill-clinton', name: 'Bill Clinton', detail: 'Appears in 23 documents', keywords: ['bill', 'clinton', 'president'] },
    { slug: 'alan-dershowitz', name: 'Alan Dershowitz', detail: 'Appears in 15 documents', keywords: ['alan', 'dershowitz', 'lawyer'] },
    { slug: 'prince-andrew', name: 'Prince Andrew', detail: 'Appears in 67 documents', keywords: ['prince', 'andrew', 'royal'] },
  ],
}

function search(query) {
  const q = query.toLowerCase().trim()
  if (!q) return { documents: [], people: [] }

  const matchScore = (keywords) => {
    return keywords.filter(k => k.includes(q) || q.includes(k)).length
  }

  return {
    documents: searchDatabase.documents.filter(d => matchScore(d.keywords) > 0 || d.name.toLowerCase().includes(q)),
    people: searchDatabase.people.filter(p => matchScore(p.keywords) > 0 || p.name.toLowerCase().includes(q)),
  }
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState('all')
  const [results, setResults] = useState({ documents: [], people: [] })

  useEffect(() => {
    setResults(search(query))
  }, [query])

  const totalResults = results.documents.length + results.people.length

  const filteredResults = {
    documents: filter === 'all' || filter === 'documents' ? results.documents : [],
    people: filter === 'all' || filter === 'people' ? results.people : [],
  }

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-6 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-8 relative">
              <Image src="/hourglass-static.png" alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="font-mono text-sm text-white/50">THE BLACK BOOK</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-mono tracking-wide mb-6">SEARCH</h1>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, names, dates..."
            className="w-full bg-white/5 border border-white/20 px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-mono"
            autoFocus
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'all', label: 'ALL' },
            { key: 'documents', label: 'DOCUMENTS' },
            { key: 'people', label: 'PEOPLE' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 font-mono text-xs tracking-wide transition-colors ${
                filter === f.key
                  ? 'bg-white text-[#0a1628]'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {query && (
          <p className="text-white/30 text-sm font-mono mb-6">
            {totalResults} RESULT{totalResults !== 1 ? 'S' : ''} FOR "{query.toUpperCase()}"
          </p>
        )}

        {/* People Results */}
        {filteredResults.people.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-mono tracking-widest text-white/30 mb-4">PEOPLE</h2>
            <div className="space-y-2">
              {filteredResults.people.map((person) => (
                <Link
                  key={person.slug}
                  href={`/person/${person.slug}`}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
                >
                  <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-mono">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono">{person.name}</h3>
                    <p className="text-sm text-white/40 font-mono">{person.detail}</p>
                  </div>
                  <span className="text-white/30">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Document Results */}
        {filteredResults.documents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-mono tracking-widest text-white/30 mb-4">DOCUMENTS</h2>
            <div className="space-y-2">
              {filteredResults.documents.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/document/${doc.id}`}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
                >
                  <div className="w-10 h-10 bg-white/5 border border-white/20 flex items-center justify-center text-lg">
                    📄
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono">{doc.name}</h3>
                    <p className="text-sm text-white/40 font-mono">{doc.type} • {doc.date}</p>
                  </div>
                  <span className="text-white/30">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {query && totalResults === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 font-mono">NO RESULTS FOUND FOR "{query.toUpperCase()}"</p>
            <p className="text-white/20 text-sm font-mono mt-2">Try a different search term</p>
          </div>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-12">
            <p className="text-white/40 font-mono">ENTER A SEARCH TERM</p>
            <p className="text-white/20 text-sm font-mono mt-2">Search documents, names, and dates</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-white/10 mt-8 text-center">
        <p className="text-xs font-mono text-white/30">
          ALL DOCUMENTS SOURCED FROM{' '}
          <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
            JUSTICE.GOV/EPSTEIN
          </a>
        </p>
      </footer>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a1628] text-white flex items-center justify-center">
        <p className="text-white/40 font-mono">LOADING...</p>
      </main>
    }>
      <SearchContent />
    </Suspense>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

const documentsData = {
  'cr-001': {
    name: 'Deposition of Juan Alessi',
    category: 'Court Records',
    categorySlug: 'court-records',
    date: '2009-12-14',
    pages: 89,
    type: 'Deposition',
    source: 'DOJ Release',
    summary: 'Sworn testimony from Juan Alessi, former house manager at Epstein\'s Palm Beach estate from 1990-2002. Alessi describes daily operations, frequent visitors, and activities at the residence. This deposition was part of civil litigation.',
    keyDetails: [
      { label: 'Witness', value: 'Juan Alessi' },
      { label: 'Role', value: 'House Manager (1990-2002)' },
      { label: 'Location discussed', value: 'Palm Beach, FL' },
    ],
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Primary subject' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Named 47 times' },
      { name: 'Sarah Kellen', slug: 'sarah-kellen', role: 'Named 12 times' },
    ],
    relatedDocs: [
      { id: 'cr-002', name: 'Virginia Giuffre vs. Maxwell Filing' },
      { id: 'cr-003', name: 'Palm Beach Police Report' },
    ]
  },
  'fl-001': {
    name: 'Flight Log N908JE (2001-2003)',
    category: 'Flight Logs',
    categorySlug: 'flight-logs',
    date: '2001-01-01',
    pages: 34,
    type: 'Manifest',
    source: 'Court Evidence',
    summary: 'Pilot logs from Epstein\'s Gulfstream II aircraft (tail number N908JE) documenting flights between 2001-2003. Records include departure/arrival locations, dates, and passenger names. Frequently traveled routes include Teterboro (NJ), Palm Beach (FL), and St. Thomas (USVI).',
    keyDetails: [
      { label: 'Aircraft', value: 'Gulfstream II (N908JE)' },
      { label: 'Total flights', value: '142' },
      { label: 'Named passengers', value: '87 individuals' },
    ],
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: '142 flights' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: '87 flights' },
      { name: 'Bill Clinton', slug: 'bill-clinton', role: '26 flights' },
      { name: 'Alan Dershowitz', slug: 'alan-dershowitz', role: '11 flights' },
    ],
    relatedDocs: [
      { id: 'fl-002', name: 'Flight Log N908JE (2004-2005)' },
      { id: 'fl-003', name: 'Helicopter Flight Records' },
    ]
  }
}

const defaultDoc = {
  name: 'Document',
  category: 'Unknown',
  categorySlug: '',
  date: 'Unknown',
  pages: 0,
  type: 'Document',
  source: 'DOJ',
  summary: 'Document details are being compiled. Check back soon for full context and analysis.',
  keyDetails: [],
  people: [],
  relatedDocs: []
}

export default function DocumentPage({ params }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('context')
  const doc = documentsData[id] || { ...defaultDoc, name: `Document ${id}` }

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-8 relative">
              <Image src="/hourglass-static.png" alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="font-mono text-sm text-white/50">THE BLACK BOOK</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Document Header */}
        <div className="p-6 border-b border-white/10">
          <Link href={`/category/${doc.categorySlug}`} className="text-white/40 text-sm font-mono hover:text-white">
            ← {doc.category.toUpperCase()}
          </Link>
          <h1 className="text-xl font-mono mt-3">{doc.name}</h1>
          <p className="text-sm text-white/40 font-mono mt-1">
            {doc.pages} PAGES • {doc.date} • {doc.type.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Document Preview */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="bg-white/5 border border-white/10 p-8 min-h-96 flex items-center justify-center">
              <div className="text-center text-white/50">
                <div className="text-6xl mb-4">📄</div>
                <p className="font-mono">PDF DOCUMENT PREVIEW</p>
                <p className="text-sm mt-2 font-mono">PAGE 1 OF {doc.pages}</p>
                <button className="mt-6 bg-white text-[#0a1628] px-6 py-3 font-mono text-sm hover:bg-white/90 transition-colors">
                  OPEN FULL DOCUMENT
                </button>
                <p className="text-xs text-white/30 mt-4 font-mono">SOURCE: {doc.source}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button className="bg-white/5 border border-white/10 px-4 py-2 font-mono text-sm hover:border-white/30">← PREV</button>
              <span className="px-4 py-2 text-white/40 font-mono text-sm">PAGE 1 OF {doc.pages}</span>
              <button className="bg-white/5 border border-white/10 px-4 py-2 font-mono text-sm hover:border-white/30">NEXT →</button>
            </div>
          </div>

          {/* Context Panel */}
          <div className="w-full lg:w-96 p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {['context', 'people'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-mono text-xs tracking-wide transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-[#0a1628]'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Context Tab */}
            {activeTab === 'context' && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4">
                  <h3 className="font-mono text-sm text-white/60 mb-2">SUMMARY</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{doc.summary}</p>
                </div>
                
                {doc.keyDetails.length > 0 && (
                  <div className="bg-white/5 border border-white/10 p-4">
                    <h3 className="font-mono text-sm text-white/60 mb-3">KEY DETAILS</h3>
                    <div className="space-y-2">
                      {doc.keyDetails.map((detail, i) => (
                        <div key={i} className="flex justify-between text-sm font-mono">
                          <span className="text-white/40">{detail.label}</span>
                          <span className="text-white/80">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {doc.relatedDocs.length > 0 && (
                  <div className="bg-white/5 border border-white/10 p-4">
                    <h3 className="font-mono text-sm text-white/60 mb-3">RELATED DOCUMENTS</h3>
                    <div className="space-y-2">
                      {doc.relatedDocs.map((related) => (
                        <Link
                          key={related.id}
                          href={`/document/${related.id}`}
                          className="block text-sm text-white/70 hover:text-white font-mono"
                        >
                          {related.name} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* People Tab */}
            {activeTab === 'people' && (
              <div className="space-y-2">
                {doc.people.length > 0 ? doc.people.map((person) => (
                  <Link
                    key={person.name}
                    href={`/person/${person.slug}`}
                    className="flex items-center justify-between bg-white/5 border border-white/10 p-3 hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-sm font-mono">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-sm font-mono">{person.name}</span>
                        <p className="text-xs text-white/40 font-mono">{person.role}</p>
                      </div>
                    </div>
                    <span className="text-white/30">→</span>
                  </Link>
                )) : (
                  <p className="text-white/40 text-sm font-mono">No people identified yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
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

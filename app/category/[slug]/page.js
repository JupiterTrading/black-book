'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

const categoryData = {
  'court-records': {
    title: 'Court Records',
    icon: '⚖️',
    description: 'Legal filings, depositions, and judicial documents from various Epstein-related cases',
    source: 'https://www.justice.gov/epstein/court-records',
    documents: [
      { id: 'cr-001', name: 'Deposition of Juan Alessi', date: '2009-12-14', pages: 89, mentions: ['Epstein', 'Maxwell'], type: 'Deposition' },
      { id: 'cr-002', name: 'Virginia Giuffre vs. Ghislaine Maxwell - Case Filing', date: '2015-09-21', pages: 23, mentions: ['Giuffre', 'Maxwell', 'Epstein'], type: 'Filing' },
      { id: 'cr-003', name: 'Palm Beach Police Report', date: '2005-03-15', pages: 12, mentions: ['Epstein'], type: 'Police Report' },
      { id: 'cr-004', name: 'Victim Interview Transcript #14', date: '2008-06-22', pages: 45, mentions: ['Epstein', 'Maxwell', 'Brunel'], type: 'Transcript' },
      { id: 'cr-005', name: 'Non-Prosecution Agreement', date: '2007-09-24', pages: 8, mentions: ['Epstein'], type: 'Agreement' },
    ]
  },
  'doj-disclosures': {
    title: 'DOJ Disclosures',
    icon: '📋',
    description: 'Documents released under the Epstein Files Transparency Act (H.R. 4405)',
    source: 'https://www.justice.gov/epstein/doj-disclosures',
    documents: [
      { id: 'doj-001', name: 'FBI Investigation Summary 2006-2007', date: '2006-08-15', pages: 156, mentions: ['Epstein', 'Maxwell'], type: 'Summary' },
      { id: 'doj-002', name: 'Witness Interview - Redacted', date: '2007-03-22', pages: 34, mentions: ['Epstein'], type: 'Interview' },
      { id: 'doj-003', name: 'Asset Seizure Documentation', date: '2019-07-08', pages: 67, mentions: ['Epstein'], type: 'Financial' },
    ]
  },
  'flight-logs': {
    title: 'Flight Logs',
    icon: '✈️',
    description: 'Aircraft travel records and passenger manifests',
    source: null,
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', date: '2001-01-01', pages: 34, mentions: ['Epstein', 'Maxwell', 'Clinton'], type: 'Manifest' },
      { id: 'fl-002', name: 'Flight Log N908JE (2004-2005)', date: '2004-01-01', pages: 28, mentions: ['Epstein', 'Maxwell'], type: 'Manifest' },
      { id: 'fl-003', name: 'Helicopter Flight Records', date: '2002-06-15', pages: 12, mentions: ['Epstein'], type: 'Manifest' },
    ]
  },
  'financial': {
    title: 'Financial Records',
    icon: '💰',
    description: 'Banking, transactions, and asset documentation',
    source: null,
    documents: [
      { id: 'fin-001', name: 'Bank Account Summary - Deutsche Bank', date: '2019-07-10', pages: 45, mentions: ['Epstein'], type: 'Banking' },
      { id: 'fin-002', name: 'Property Holdings Overview', date: '2019-08-01', pages: 23, mentions: ['Epstein'], type: 'Assets' },
    ]
  },
  'foia': {
    title: 'FOIA Records',
    icon: '🔍',
    description: 'Documents obtained through Freedom of Information Act requests',
    source: 'https://www.justice.gov/epstein/foia',
    documents: [
      { id: 'foia-001', name: 'FBI FOIA Release - Part 1', date: '2020-01-15', pages: 234, mentions: ['Epstein', 'Maxwell'], type: 'FOIA' },
      { id: 'foia-002', name: 'Bureau of Prisons Records', date: '2020-03-22', pages: 89, mentions: ['Epstein'], type: 'FOIA' },
    ]
  }
}

export default function CategoryPage({ params }) {
  const { slug } = use(params)
  const [activeFilter, setActiveFilter] = useState('All')
  const category = categoryData[slug]

  if (!category) {
    return (
      <main className="min-h-screen bg-[#0a1628] text-white p-8">
        <h1 className="text-2xl font-mono">CATEGORY NOT FOUND</h1>
        <Link href="/" className="text-white/50 hover:text-white mt-4 block font-mono text-sm">← BACK TO HOME</Link>
      </main>
    )
  }

  const filterOptions = ['All', '2001-2005', '2006-2010', '2011-2015', '2016-2020', '2021+']

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-6 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-8 relative">
              <Image src="/hourglass-static.png" alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="font-mono text-sm text-white/50">THE BLACK BOOK</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Category Header */}
        <div className="mb-8">
          <Link href="/" className="text-white/40 text-sm font-mono hover:text-white mb-4 inline-block">← ALL CATEGORIES</Link>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-mono tracking-wide">{category.title.toUpperCase()}</h1>
              <p className="text-white/40 font-mono text-sm">{category.documents.length} DOCUMENTS</p>
            </div>
          </div>
          <p className="text-white/50 mt-4 max-w-2xl font-mono text-sm">{category.description}</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-mono text-xs tracking-wide whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-[#0a1628]'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Source Link */}
        {category.source && (
          <div className="bg-white/5 border border-white/10 p-4 mb-6">
            <p className="text-sm font-mono text-white/40">
              OFFICIAL SOURCE:{' '}
              <a href={category.source} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline">
                {category.source}
              </a>
            </p>
          </div>
        )}

        {/* Document List */}
        <div className="space-y-2">
          {category.documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`}
              className="block bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-mono text-white">{doc.name}</h3>
                  <p className="text-sm text-white/40 font-mono mt-1">
                    {doc.pages} PAGES • {doc.date} • {doc.type.toUpperCase()}
                  </p>
                </div>
                <span className="text-white/30 text-xl">→</span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {doc.mentions.map((name) => (
                  <span key={name} className="bg-white/10 px-2 py-1 text-xs font-mono text-white/50">
                    {name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
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

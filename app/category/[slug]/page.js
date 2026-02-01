'use client'
import { useState } from 'react'
import Link from 'next/link'
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
    icon: '📁',
    description: 'Documents obtained through Freedom of Information Act requests',
    source: 'https://www.justice.gov/epstein/foia',
    documents: [
      { id: 'foia-001', name: 'FBI FOIA Release - Part 1', date: '2020-01-15', pages: 234, mentions: ['Epstein', 'Maxwell'], type: 'FOIA' },
      { id: 'foia-002', name: 'Bureau of Prisons Records', date: '2020-03-22', pages: 89, mentions: ['Epstein'], type: 'FOIA' },
    ]
  }
}

const filterOptions = ['All', '2001-2005', '2006-2010', '2011-2015', '2016-2020', '2021+']

export default function CategoryPage({ params }) {
  const { slug } = use(params)
  const [activeFilter, setActiveFilter] = useState('All')
  const category = categoryData[slug]

  if (!category) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link href="/" className="text-blue-400 hover:underline mt-4 block">Back to home</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">← Back to all categories</Link>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{category.title}</h1>
              <p className="text-gray-400">{category.documents.length} documents</p>
            </div>
          </div>
          <p className="text-gray-400 mt-3 max-w-2xl">{category.description}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Source Link */}
        {category.source && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400">
              Official source: {' '}
              <a href={category.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {category.source}
              </a>
            </p>
          </div>
        )}

        {/* Document List */}
        <div className="space-y-3">
          {category.documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`}
              className="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{doc.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {doc.pages} pages • {doc.date} • {doc.type}
                  </p>
                </div>
                <span className="text-gray-500 text-xl">→</span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {doc.mentions.map((name) => (
                  <span key={name} className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300">
                    {name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800 mt-8 text-center text-gray-500 text-sm max-w-6xl mx-auto">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

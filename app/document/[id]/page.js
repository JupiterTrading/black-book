'use client'
import { useState } from 'react'
import Link from 'next/link'
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
      { name: 'Jeffrey Epstein', role: 'Primary subject' },
      { name: 'Ghislaine Maxwell', role: 'Named 47 times' },
      { name: 'Sarah Kellen', role: 'Named 12 times' },
    ],
    relatedNews: [
      { title: 'Epstein house manager details life at Palm Beach mansion', source: 'Miami Herald', date: 'Jul 2019', url: '#' },
      { title: 'Deposition reveals new details about Maxwell\'s role', source: 'New York Times', date: 'Aug 2019', url: '#' },
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
      { name: 'Jeffrey Epstein', role: '142 flights' },
      { name: 'Ghislaine Maxwell', role: '87 flights' },
      { name: 'Bill Clinton', role: '26 flights' },
      { name: 'Alan Dershowitz', role: '11 flights' },
    ],
    relatedNews: [
      { title: 'Flight logs reveal scope of Epstein\'s travel network', source: 'Washington Post', date: 'Jan 2024', url: '#' },
      { title: 'Analysis of "Lolita Express" passenger records', source: 'Daily Beast', date: 'Dec 2023', url: '#' },
    ],
    relatedDocs: [
      { id: 'fl-002', name: 'Flight Log N908JE (2004-2005)' },
      { id: 'fl-003', name: 'Helicopter Flight Records' },
    ]
  }
}

// Default document for unknown IDs
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
  relatedNews: [],
  relatedDocs: []
}

export default function DocumentPage({ params }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('context')
  const doc = documentsData[id] || { ...defaultDoc, name: `Document ${id}` }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <Link href={`/category/${doc.categorySlug}`} className="text-gray-400 text-sm hover:text-white">
            ← {doc.category}
          </Link>
          <h1 className="text-xl font-bold mt-2">{doc.name}</h1>
          <p className="text-sm text-gray-400 mt-1">{doc.pages} pages • {doc.date} • {doc.type}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Document Preview */}
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-gray-800">
            <div className="bg-gray-900 rounded-lg p-8 min-h-96 flex items-center justify-center border border-gray-700">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-lg">PDF Document Preview</p>
                <p className="text-sm mt-2">Page 1 of {doc.pages}</p>
                <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Open Full Document
                </button>
                <p className="text-xs text-gray-600 mt-4">Source: {doc.source}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">← Previous</button>
              <span className="px-4 py-2 text-gray-400">Page 1 of {doc.pages}</span>
              <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">Next →</button>
            </div>
          </div>

          {/* Context Panel */}
          <div className="w-full lg:w-96 p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {['context', 'people', 'news'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Context Tab */}
            {activeTab === 'context' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{doc.summary}</p>
                </div>
                {doc.keyDetails.length > 0 && (
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <h3 className="font-semibold mb-3">Key Details</h3>
                    <div className="space-y-2">
                      {doc.keyDetails.map((detail, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-400">{detail.label}</span>
                          <span className="text-white">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {doc.relatedDocs.length > 0 && (
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <h3 className="font-semibold mb-3">Related Documents</h3>
                    <div className="space-y-2">
                      {doc.relatedDocs.map((related) => (
                        <Link
                          key={related.id}
                          href={`/document/${related.id}`}
                          className="block text-sm text-blue-400 hover:underline"
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
                    href={`/person/${person.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{person.name}</span>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                    </div>
                    <span className="text-gray-500">→</span>
                  </Link>
                )) : (
                  <p className="text-gray-500 text-sm">No people identified in this document yet.</p>
                )}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div className="space-y-3">
                {doc.relatedNews.length > 0 ? doc.relatedNews.map((news, i) => (
                  <a
                    key={i}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    <p className="text-sm font-medium">{news.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{news.source} • {news.date}</p>
                  </a>
                )) : (
                  <p className="text-gray-500 text-sm">No related news articles yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800 mt-8 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

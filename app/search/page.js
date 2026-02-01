'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Mock search database
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
  ],
  news: [
    { title: 'DOJ releases new Epstein documents', source: 'Reuters', date: 'Jan 2025', keywords: ['doj', 'release', 'documents', 'epstein'] },
    { title: 'Maxwell appeals conviction', source: 'New York Times', date: 'Jan 2025', keywords: ['maxwell', 'appeal', 'conviction'] },
    { title: 'Flight logs reveal travel patterns', source: 'Washington Post', date: 'Dec 2024', keywords: ['flight', 'logs', 'travel', 'patterns'] },
  ]
}

function search(query) {
  const q = query.toLowerCase().trim()
  if (!q) return { documents: [], people: [], news: [] }

  const matchScore = (keywords) => {
    return keywords.filter(k => k.includes(q) || q.includes(k)).length
  }

  return {
    documents: searchDatabase.documents.filter(d => matchScore(d.keywords) > 0 || d.name.toLowerCase().includes(q)),
    people: searchDatabase.people.filter(p => matchScore(p.keywords) > 0 || p.name.toLowerCase().includes(q)),
    news: searchDatabase.news.filter(n => matchScore(n.keywords) > 0 || n.title.toLowerCase().includes(q)),
  }
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState('all')
  const [results, setResults] = useState({ documents: [], people: [], news: [] })

  useEffect(() => {
    setResults(search(query))
  }, [query])

  const totalResults = results.documents.length + results.people.length + results.news.length

  const filteredResults = {
    documents: filter === 'all' || filter === 'documents' ? results.documents : [],
    people: filter === 'all' || filter === 'people' ? results.people : [],
    news: filter === 'all' || filter === 'news' ? results.news : [],
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">← Back to home</Link>
          <h1 className="text-2xl font-bold mt-4 mb-4">Search</h1>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, names, dates..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
            autoFocus
          />

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { key: 'all', label: 'All' },
              { key: 'documents', label: 'Documents' },
              { key: 'people', label: 'People' },
              { key: 'news', label: 'News' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === f.key
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {query && (
          <p className="text-gray-400 text-sm mb-6">
            {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
          </p>
        )}

        {/* People Results */}
        {filteredResults.people.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">People</h2>
            <div className="space-y-2">
              {filteredResults.people.map((person) => (
                <Link
                  key={person.slug}
                  href={`/person/${person.slug}`}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.detail}</p>
                  </div>
                  <span className="text-gray-500">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Document Results */}
        {filteredResults.documents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Documents</h2>
            <div className="space-y-2">
              {filteredResults.documents.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/document/${doc.id}`}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    📄
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-400">{doc.type} • {doc.date}</p>
                  </div>
                  <span className="text-gray-500">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* News Results */}
        {filteredResults.news.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">News</h2>
            <div className="space-y-2">
              {filteredResults.news.map((article, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4"
                >
                  <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center">
                    📰
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-sm text-gray-400">{article.source} • {article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {query && totalResults === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found for "{query}"</p>
            <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
          </div>
        )}

        {/* Empty State */}
        {!query && (
          <div className="text-center py-12">
            <p className="text-gray-400">Enter a search term to find documents, people, and news</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800 mt-8 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading search...</p>
      </main>
    }>
      <SearchContent />
    </Suspense>
  )
}

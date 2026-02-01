'use client'
import { useState } from 'react'
import Link from 'next/link'

const categories = [
  { name: 'Court Records', count: 847, icon: '⚖️', slug: 'court-records', description: 'Legal filings, depositions, and judicial documents' },
  { name: 'DOJ Disclosures', count: 1243, icon: '📋', slug: 'doj-disclosures', description: 'Documents released under the Epstein Files Transparency Act' },
  { name: 'Flight Logs', count: 156, icon: '✈️', slug: 'flight-logs', description: 'Aircraft travel records and passenger manifests' },
  { name: 'Financial Records', count: 432, icon: '💰', slug: 'financial', description: 'Banking, transactions, and asset documentation' },
  { name: 'FOIA Records', count: 621, icon: '📁', slug: 'foia', description: 'Freedom of Information Act request responses' },
]

const recentUpdates = [
  { text: 'New DOJ disclosure batch released', time: '2 hours ago' },
  { text: 'Flight log annotations updated', time: '1 day ago' },
  { text: '23 new court documents added', time: '3 days ago' },
]

const featuredPeople = [
  { name: 'Jeffrey Epstein', documents: 1847, status: 'Deceased' },
  { name: 'Ghislaine Maxwell', documents: 243, status: 'Convicted' },
  { name: 'Jean-Luc Brunel', documents: 87, status: 'Deceased' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Epstein Files</h1>
          <p className="text-gray-400 mt-1">Public access to the DOJ Epstein Library</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents, names, dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
            {searchQuery && (
              <Link 
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-1 rounded text-sm font-medium hover:bg-gray-200"
              >
                Search
              </Link>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Categories Grid */}
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Document Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-colors"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{cat.description}</p>
                <p className="text-sm text-gray-500 mt-2">{cat.count.toLocaleString()} documents</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Updates */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-500">●</span> Recent Updates
              </h3>
              <div className="space-y-3">
                {recentUpdates.map((update, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300">{update.text}</span>
                    <span className="text-gray-500">{update.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured People */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
              <h3 className="font-semibold mb-4">Key Figures</h3>
              <div className="space-y-3">
                {featuredPeople.map((person) => (
                  <Link
                    key={person.name}
                    href={`/person/${person.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                        {person.name[0]}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{person.name}</span>
                        <p className="text-xs text-gray-500">{person.documents} documents</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      person.status === 'Convicted' ? 'bg-red-900/50 text-red-300' :
                      person.status === 'Deceased' ? 'bg-gray-700 text-gray-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {person.status}
                    </span>
                  </Link>
                ))}
                <Link href="/people" className="block text-center text-sm text-gray-400 hover:text-white mt-2">
                  View all people →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-800 mt-8 text-center text-gray-500 text-sm">
          <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
          <p className="mt-2">This site is for public transparency and accountability.</p>
        </footer>
      </div>
    </main>
  )
}

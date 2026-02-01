'use client'
import Link from 'next/link'
import { use } from 'react'

const peopleData = {
  'jeffrey-epstein': {
    name: 'Jeffrey Epstein',
    status: 'Deceased',
    statusColor: 'bg-gray-700 text-gray-300',
    documentCount: 1847,
    summary: 'American financier and convicted sex offender. Died in federal custody on August 10, 2019. Was awaiting trial on sex trafficking charges at the time of death. Previously convicted in 2008 of procuring a minor for prostitution.',
    tags: ['Flight Logs', 'Court Records', 'Financial', 'Primary Subject'],
    legalStatus: 'Convicted in 2008 of procuring a minor for prostitution (Florida). Indicted in 2019 on federal charges of sex trafficking of minors. Died August 10, 2019 in federal custody while awaiting trial.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '142 flights' },
      { id: 'cr-001', name: 'Deposition of Juan Alessi', type: 'Court Record', relevance: 'Primary subject' },
      { id: 'cr-003', name: 'Palm Beach Police Report', type: 'Court Record', relevance: 'Primary subject' },
      { id: 'fin-001', name: 'Bank Account Summary - Deutsche Bank', type: 'Financial', relevance: 'Account holder' },
    ],
    news: [
      { title: 'DOJ releases new batch of Epstein documents', source: 'Reuters', date: 'Jan 2025' },
      { title: 'Epstein Files Transparency Act documents now public', source: 'AP News', date: 'Dec 2024' },
    ]
  },
  'ghislaine-maxwell': {
    name: 'Ghislaine Maxwell',
    status: 'Convicted',
    statusColor: 'bg-red-900/50 text-red-300',
    documentCount: 243,
    summary: 'British socialite convicted of sex trafficking and other charges related to Jeffrey Epstein. Daughter of media proprietor Robert Maxwell. Was a close associate of Epstein from the early 1990s until his death.',
    tags: ['Flight Logs', 'Depositions', 'Court Records', 'Co-conspirator'],
    legalStatus: 'Convicted on December 29, 2021 on five federal charges including sex trafficking of a minor. Sentenced to 20 years in federal prison on June 28, 2022. Appeals ongoing.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '87 flights' },
      { id: 'cr-002', name: 'Virginia Giuffre vs. Maxwell Filing', type: 'Court Record', relevance: 'Defendant' },
      { id: 'cr-001', name: 'Deposition of Juan Alessi', type: 'Court Record', relevance: 'Named 47 times' },
    ],
    news: [
      { title: 'Maxwell appeals conviction citing jury misconduct', source: 'Reuters', date: 'Jan 2025' },
      { title: 'Maxwell sentencing documents reveal new details', source: 'New York Times', date: 'Jun 2022' },
    ]
  },
  'bill-clinton': {
    name: 'Bill Clinton',
    status: 'Named in Documents',
    statusColor: 'bg-yellow-900/50 text-yellow-300',
    documentCount: 23,
    summary: '42nd President of the United States. Appears in flight logs as a passenger on Epstein\'s aircraft. Clinton\'s office has stated he knew nothing of Epstein\'s crimes.',
    tags: ['Flight Logs'],
    legalStatus: 'Not charged with any crimes related to Epstein. Has denied knowledge of any criminal activity.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '26 flights' },
    ],
    news: [
      { title: 'Clinton releases statement on Epstein document release', source: 'CNN', date: 'Jan 2024' },
    ]
  }
}

const defaultPerson = {
  name: 'Unknown Person',
  status: 'Unknown',
  statusColor: 'bg-gray-700 text-gray-300',
  documentCount: 0,
  summary: 'Information about this individual is being compiled.',
  tags: [],
  legalStatus: 'No legal status information available.',
  documents: [],
  news: []
}

export default function PersonPage({ params }) {
  const { slug } = use(params)
  const person = peopleData[slug] || { ...defaultPerson, name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">← Back to home</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-medium">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{person.name}</h1>
            <p className="text-gray-400 mt-1">Appears in {person.documentCount} documents</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-sm ${person.statusColor}`}>
                {person.status}
              </span>
              {person.tags.map((tag) => (
                <span key={tag} className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-800 mb-6">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-gray-400 leading-relaxed">{person.summary}</p>
        </div>

        {/* Legal Status */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-800 mb-6">
          <h3 className="font-semibold mb-2">Legal Status</h3>
          <p className="text-gray-400 leading-relaxed">{person.legalStatus}</p>
        </div>

        {/* Documents */}
        <h3 className="font-semibold mb-4">Documents Mentioning This Person</h3>
        <div className="space-y-3 mb-8">
          {person.documents.length > 0 ? person.documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`}
              className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div>
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{doc.type} • {doc.relevance}</p>
              </div>
              <span className="text-gray-500">→</span>
            </Link>
          )) : (
            <p className="text-gray-500">No documents linked yet.</p>
          )}
        </div>

        {/* Related News */}
        <h3 className="font-semibold mb-4">Related News</h3>
        <div className="space-y-3">
          {person.news.length > 0 ? person.news.map((article, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <p className="font-medium">{article.title}</p>
              <p className="text-sm text-gray-500 mt-1">{article.source} • {article.date}</p>
            </div>
          )) : (
            <p className="text-gray-500">No related news articles.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800 mt-12 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

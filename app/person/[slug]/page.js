'use client'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

const peopleData = {
  'jeffrey-epstein': {
    name: 'Jeffrey Epstein',
    status: 'Deceased',
    statusStyle: 'bg-white/10 text-white/50',
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
  },
  'ghislaine-maxwell': {
    name: 'Ghislaine Maxwell',
    status: 'Convicted',
    statusStyle: 'bg-red-500/20 text-red-300',
    documentCount: 243,
    summary: 'British socialite convicted of sex trafficking and other charges related to Jeffrey Epstein. Daughter of media proprietor Robert Maxwell. Was a close associate of Epstein from the early 1990s until his death.',
    tags: ['Flight Logs', 'Depositions', 'Court Records', 'Co-conspirator'],
    legalStatus: 'Convicted on December 29, 2021 on five federal charges including sex trafficking of a minor. Sentenced to 20 years in federal prison on June 28, 2022. Appeals ongoing.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '87 flights' },
      { id: 'cr-002', name: 'Virginia Giuffre vs. Maxwell Filing', type: 'Court Record', relevance: 'Defendant' },
      { id: 'cr-001', name: 'Deposition of Juan Alessi', type: 'Court Record', relevance: 'Named 47 times' },
    ],
  },
  'bill-clinton': {
    name: 'Bill Clinton',
    status: 'Named',
    statusStyle: 'bg-yellow-500/20 text-yellow-300',
    documentCount: 23,
    summary: '42nd President of the United States. Appears in flight logs as a passenger on Epstein\'s aircraft. Clinton\'s office has stated he knew nothing of Epstein\'s crimes.',
    tags: ['Flight Logs'],
    legalStatus: 'Not charged with any crimes related to Epstein. Has denied knowledge of any criminal activity.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '26 flights' },
    ],
  },
  'prince-andrew': {
    name: 'Prince Andrew',
    status: 'Named',
    statusStyle: 'bg-yellow-500/20 text-yellow-300',
    documentCount: 67,
    summary: 'Duke of York, member of the British Royal Family. Named in various documents and settled a civil lawsuit with Virginia Giuffre in 2022.',
    tags: ['Court Records', 'Depositions'],
    legalStatus: 'Not criminally charged. Settled civil lawsuit with Virginia Giuffre in February 2022 for undisclosed sum.',
    documents: [
      { id: 'cr-002', name: 'Virginia Giuffre vs. Maxwell Filing', type: 'Court Record', relevance: 'Named' },
    ],
  },
  'alan-dershowitz': {
    name: 'Alan Dershowitz',
    status: 'Named',
    statusStyle: 'bg-yellow-500/20 text-yellow-300',
    documentCount: 15,
    summary: 'American lawyer and Harvard Law professor emeritus. Appears in flight logs and has been named in accusations which he denies.',
    tags: ['Flight Logs', 'Legal Filings'],
    legalStatus: 'Not charged with any crimes. Has denied all accusations and filed counter-suits.',
    documents: [
      { id: 'fl-001', name: 'Flight Log N908JE (2001-2003)', type: 'Flight Log', relevance: '11 flights' },
    ],
  }
}

const defaultPerson = {
  name: 'Unknown Person',
  status: 'Unknown',
  statusStyle: 'bg-white/10 text-white/50',
  documentCount: 0,
  summary: 'Information about this individual is being compiled.',
  tags: [],
  legalStatus: 'No legal status information available.',
  documents: [],
}

export default function PersonPage({ params }) {
  const { slug } = use(params)
  const person = peopleData[slug] || { 
    ...defaultPerson, 
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
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
        {/* Back Link */}
        <Link href="/people" className="text-white/40 text-sm font-mono hover:text-white">← PEOPLE INDEX</Link>

        {/* Profile Header */}
        <div className="flex items-start gap-4 mt-6 mb-8">
          <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-2xl font-mono">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-mono">{person.name.toUpperCase()}</h1>
            <p className="text-white/40 font-mono text-sm mt-1">{person.documentCount} DOCUMENTS</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 text-xs font-mono ${person.statusStyle}`}>
                {person.status.toUpperCase()}
              </span>
              {person.tags.map((tag) => (
                <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-mono text-sm text-white/60 mb-2">OVERVIEW</h3>
          <p className="text-white/80 leading-relaxed">{person.summary}</p>
        </div>

        {/* Legal Status */}
        <div className="bg-white/5 border border-white/10 p-5 mb-8">
          <h3 className="font-mono text-sm text-white/60 mb-2">LEGAL STATUS</h3>
          <p className="text-white/80 leading-relaxed">{person.legalStatus}</p>
        </div>

        {/* Documents */}
        <h3 className="font-mono text-sm text-white/60 mb-4">DOCUMENTS MENTIONING THIS PERSON</h3>
        <div className="space-y-2 mb-8">
          {person.documents.length > 0 ? person.documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/document/${doc.id}`}
              className="flex items-center justify-between bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <div>
                <h4 className="font-mono">{doc.name}</h4>
                <p className="text-sm text-white/40 font-mono mt-1">{doc.type} • {doc.relevance}</p>
              </div>
              <span className="text-white/30">→</span>
            </Link>
          )) : (
            <p className="text-white/40 font-mono">No documents linked yet.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-white/10 mt-12 text-center">
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

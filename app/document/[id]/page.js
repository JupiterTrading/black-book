'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

// Document metadata - PDFs served via /api/pdf/[id]
const documentsData = {
  // === FIRST PHASE DECLASSIFIED FILES ===
  'flight-log': {
    name: 'Flight Log from U.S. v. Maxwell',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'First Phase of Declassified Epstein Files',
    date: '2025-02-27',
    type: 'Evidence',
    summary: 'Official flight logs from Epstein\'s aircraft released as part of the First Phase of Declassified Epstein Files by Attorney General Pamela Bondi. Documents flights on N908JE and N212JE.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Aircraft owner' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Frequent passenger' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },
  'contact-book': {
    name: 'Contact Book (Redacted)',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'First Phase of Declassified Epstein Files',
    date: '2025-02-27',
    type: 'Evidence',
    summary: 'Epstein\'s personal contact book containing names and contact information. Redactions applied for victim names and other identifying information as marked "DOJ Redaction."',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Owner' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },
  'evidence-list': {
    name: 'Evidence List from U.S. v. Maxwell',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'U.S. v. Maxwell, 1:20-cr-00330 (S.D.N.Y. 2020)',
    date: '2025-02-27',
    type: 'Evidence List',
    summary: 'Complete evidence list from the federal criminal prosecution of Ghislaine Maxwell, cataloging all exhibits presented at trial.',
    people: [
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },
  'masseuse-list': {
    name: 'Masseuse List (Redacted)',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'First Phase of Declassified Epstein Files',
    date: '2025-02-27',
    type: 'Evidence',
    summary: 'List of individuals recruited as "masseuses" for Epstein. Redactions applied for victim protection.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Subject' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Referenced' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },

  // === DOJ REPORTS ===
  'opr-report': {
    name: 'DOJ Office of Professional Responsibility Report',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'DOJ Internal Review',
    date: '2020-11',
    type: 'Report',
    summary: 'Internal DOJ investigation into the handling of the Epstein case, specifically examining the controversial 2008 Non-Prosecution Agreement negotiated by then-U.S. Attorney Alexander Acosta.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Subject' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },
  'opr-summary': {
    name: 'OPR Report Executive Summary',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'DOJ Internal Review',
    date: '2020-11',
    type: 'Report Summary',
    summary: 'Executive summary of the DOJ Office of Professional Responsibility investigation into the Epstein Non-Prosecution Agreement.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Subject' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },
  'bondi-letter': {
    name: 'Letter from AG Bondi to FBI Director Patel',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'DOJ Correspondence',
    date: '2025-02-27',
    type: 'Correspondence',
    summary: 'Official correspondence from Attorney General Pamela Bondi to FBI Director Kash Patel regarding the release of Epstein files.',
    people: [],
    sourceUrl: 'https://www.justice.gov/epstein/doj-disclosures',
  },

  // === GIUFFRE v. MAXWELL ===
  'giuffre-maxwell-001': {
    name: 'Giuffre v. Maxwell - Complaint',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Giuffre v. Maxwell, No. 1:15-cv-07433 (S.D.N.Y. 2015)',
    date: '2015-09-21',
    type: 'Complaint',
    summary: 'Initial defamation complaint filed by Virginia Giuffre against Ghislaine Maxwell. This landmark civil case led to the unsealing of thousands of documents revealing details about Epstein\'s operations and associates.',
    people: [
      { name: 'Virginia Giuffre', slug: 'virginia-giuffre', role: 'Plaintiff' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Referenced' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/court-records',
  },
  'giuffre-maxwell-034': {
    name: 'Giuffre v. Maxwell - Maxwell Deposition',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Giuffre v. Maxwell, No. 1:15-cv-07433 (S.D.N.Y. 2015)',
    date: '2016-04-22',
    type: 'Deposition',
    summary: 'Sworn deposition testimony of Ghislaine Maxwell taken as part of the civil defamation case. Contains Maxwell\'s answers under oath regarding her relationship with Epstein and knowledge of his activities.',
    people: [
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Deponent' },
      { name: 'Virginia Giuffre', slug: 'virginia-giuffre', role: 'Plaintiff' },
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Referenced' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/court-records',
  },

  // === USA v. MAXWELL (Criminal) ===
  'usa-maxwell-001': {
    name: 'USA v. Maxwell - Indictment',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'United States v. Maxwell, No. 1:20-cr-00330 (S.D.N.Y. 2020)',
    date: '2020-07-02',
    type: 'Indictment',
    summary: 'Federal grand jury indictment charging Ghislaine Maxwell with conspiracy to entice minors to travel to engage in illegal sex acts, enticement of a minor to travel to engage in illegal sex acts, transportation of a minor with intent to engage in criminal sexual activity, and perjury.',
    people: [
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Co-conspirator (deceased)' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/court-records',
  },

  // === DOE CASES ===
  'doe-3-001': {
    name: 'Doe No. 3 v. Epstein - Complaint',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Doe No. 3 v. Epstein, No. 9:08-cv-80232 (S.D. Fla. 2008)',
    date: '2008-04-16',
    type: 'Complaint',
    summary: 'Civil complaint filed by victim identified as Jane Doe No. 3 against Jeffrey Epstein in the Southern District of Florida.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Defendant' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/court-records',
  },

  // === BRYANT v. INDYKE ===
  'bryant-001': {
    name: 'Bryant v. Indyke - Filing',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Bryant v. Indyke, No. 1:19-cv-10479 (S.D.N.Y. 2019)',
    date: '2019',
    type: 'Court Filing',
    summary: 'Lawsuit filed against Richard Indyke and Darren Indyke, co-executors of the Epstein estate, by alleged victims seeking compensation.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Deceased (Estate)' },
    ],
    sourceUrl: 'https://www.justice.gov/epstein/court-records',
  },
}

const defaultDoc = {
  name: 'Document',
  category: 'DOJ Epstein Library',
  categorySlug: 'court-records',
  case: 'See DOJ Epstein Library',
  date: 'See document',
  type: 'PDF',
  summary: 'This document is part of the DOJ Epstein Library. View the full document for details.',
  people: [],
  sourceUrl: 'https://www.justice.gov/epstein',
}

export default function DocumentPage({ params }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('document')
  const [pdfError, setPdfError] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const doc = documentsData[id] || { ...defaultDoc, name: `Document ${id}` }
  
  // PDF is served via our proxy API
  const pdfUrl = `/api/pdf/${id}`

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-8 relative">
              <Image src="/hourglass-static.png" alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="font-mono text-sm text-white/50">THE BLACK BOOK</span>
          </Link>
          <a
            href={doc.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors"
          >
            DOJ SOURCE →
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Document Header */}
        <div className="p-4 md:p-6 border-b border-white/10">
          <Link href={`/category/${doc.categorySlug}`} className="text-white/40 text-sm font-mono hover:text-white">
            ← {doc.category.toUpperCase()}
          </Link>
          <h1 className="text-lg md:text-xl font-mono mt-3 leading-tight">{doc.name}</h1>
          <p className="text-sm text-white/40 font-mono mt-1">{doc.case}</p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs font-mono text-white/30">
            <span>{doc.date}</span>
            <span>•</span>
            <span>{doc.type.toUpperCase()}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10 overflow-x-auto">
          {['document', 'context', 'people'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-mono text-xs tracking-wide transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-[#0a1628]'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/30'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
          <a
            href={pdfUrl}
            download={`${id}.pdf`}
            className="ml-auto px-4 py-2 font-mono text-xs tracking-wide bg-white/5 text-white/50 border border-white/10 hover:border-white/30 hover:text-white transition-colors whitespace-nowrap"
          >
            DOWNLOAD PDF
          </a>
        </div>

        {/* Document Tab - PDF Viewer */}
        {activeTab === 'document' && (
          <div className="p-2 md:p-4">
            <div className="bg-white/5 border border-white/10 overflow-hidden relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a1628] z-10">
                  <div className="text-center">
                    <div className="animate-pulse text-4xl mb-4">📄</div>
                    <p className="text-white/50 font-mono text-sm">LOADING DOCUMENT...</p>
                  </div>
                </div>
              )}
              {!pdfError ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-[80vh]"
                  title={doc.name}
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false)
                    setPdfError(true)
                  }}
                />
              ) : (
                <div className="h-[60vh] flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-white/50 font-mono mb-2">DOCUMENT LOADING ERROR</p>
                    <p className="text-white/30 font-mono text-sm mb-6">The document may be temporarily unavailable</p>
                    <div className="flex flex-col gap-3">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#0a1628] px-6 py-3 font-mono text-sm hover:bg-white/90 transition-colors inline-block"
                      >
                        OPEN IN NEW TAB
                      </a>
                      <a
                        href={doc.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-white font-mono text-sm"
                      >
                        View on DOJ.gov →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Context Tab */}
        {activeTab === 'context' && (
          <div className="p-4 md:p-6 max-w-3xl">
            <div className="bg-white/5 border border-white/10 p-5 mb-6">
              <h3 className="font-mono text-sm text-white/60 mb-2">SUMMARY</h3>
              <p className="text-white/80 leading-relaxed">{doc.summary}</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-5 mb-6">
              <h3 className="font-mono text-sm text-white/60 mb-3">DOCUMENT INFO</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between items-start">
                  <span className="text-white/40">Case</span>
                  <span className="text-white/80 text-right max-w-[65%]">{doc.case}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Type</span>
                  <span className="text-white/80">{doc.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Date</span>
                  <span className="text-white/80">{doc.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Category</span>
                  <span className="text-white/80">{doc.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5">
              <h3 className="font-mono text-sm text-white/60 mb-3">SOURCE</h3>
              <a 
                href={doc.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white font-mono"
              >
                {doc.sourceUrl} →
              </a>
            </div>
          </div>
        )}

        {/* People Tab */}
        {activeTab === 'people' && (
          <div className="p-4 md:p-6 max-w-3xl">
            {doc.people.length > 0 ? (
              <div className="space-y-2">
                {doc.people.map((person) => (
                  <Link
                    key={person.name}
                    href={`/person/${person.slug}`}
                    className="flex items-center justify-between bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-sm font-mono">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-mono">{person.name}</span>
                        <p className="text-xs text-white/40 font-mono">{person.role}</p>
                      </div>
                    </div>
                    <span className="text-white/30">→</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/40 font-mono">No people indexed for this document yet.</p>
                <p className="text-white/20 font-mono text-sm mt-2">People mentioned will be added as documents are processed.</p>
              </div>
            )}
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

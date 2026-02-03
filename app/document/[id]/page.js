'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

// Document database - will be populated by scraper
// Includes real DOJ document URLs
const documentsData = {
  // Giuffre v. Maxwell documents
  'giuffre-maxwell-001': {
    name: 'Giuffre v. Maxwell - Complaint',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Giuffre v. Maxwell, No. 1:15-cv-07433 (S.D.N.Y. 2015)',
    date: '2015-09-21',
    type: 'Complaint',
    pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)/001.pdf',
    summary: 'Initial complaint filed by Virginia Giuffre against Ghislaine Maxwell for defamation. This landmark case led to the release of many documents revealing details about Epstein\'s operations.',
    people: [
      { name: 'Virginia Giuffre', slug: 'virginia-giuffre', role: 'Plaintiff' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Referenced' },
    ],
  },
  // USA v. Maxwell (criminal case)
  'usa-maxwell-001': {
    name: 'USA v. Maxwell - Indictment',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'United States v. Maxwell, No. 1:20-cr-00330 (S.D.N.Y. 2020)',
    date: '2020-07-02',
    type: 'Indictment',
    pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/United%20States%20v.%20Maxwell,%20No.%20120-cr-00330%20(S.D.N.Y.%202020)/001.pdf',
    summary: 'Federal indictment charging Ghislaine Maxwell with conspiracy to entice minors to travel to engage in illegal sex acts, enticement of a minor, and other charges.',
    people: [
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Co-conspirator (deceased)' },
    ],
  },
  // Declassified files
  'flight-log': {
    name: 'Flight Log from U.S. v. Maxwell',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'U.S. v. Maxwell, 1:20-cr-00330 (S.D.N.Y. 2020)',
    date: '2025-02-27',
    type: 'Evidence',
    pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/B.%20Flight%20Log%20Released%20in%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf',
    summary: 'Flight logs from Epstein\'s aircraft released as part of the First Phase of Declassified Epstein Files by Attorney General Pamela Bondi.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Aircraft owner' },
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Passenger' },
    ],
  },
  'contact-book': {
    name: 'Contact Book (Redacted)',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'First Phase of Declassified Epstein Files',
    date: '2025-02-27',
    type: 'Evidence',
    pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/C.%20Contact%20Book%20(Redacted).pdf',
    summary: 'Epstein\'s contact book with redactions applied for victim names and other identifying information.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Owner' },
    ],
  },
  'evidence-list': {
    name: 'Evidence List from U.S. v. Maxwell',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'U.S. v. Maxwell, 1:20-cr-00330 (S.D.N.Y. 2020)',
    date: '2025-02-27',
    type: 'Evidence List',
    pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/A.%20Evidence%20List%20from%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf',
    summary: 'Complete evidence list from the criminal prosecution of Ghislaine Maxwell.',
    people: [
      { name: 'Ghislaine Maxwell', slug: 'ghislaine-maxwell', role: 'Defendant' },
    ],
  },
  'masseuse-list': {
    name: 'Masseuse List (Redacted)',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'First Phase of Declassified Epstein Files',
    date: '2025-02-27',
    type: 'Evidence',
    pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/D.%20Masseuse%20List%20(Redacted).pdf',
    summary: 'List of individuals recruited as "masseuses" with redactions for victim protection.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Subject' },
    ],
  },
  // OPR Report
  'opr-report': {
    name: 'DOJ Office of Professional Responsibility Report',
    category: 'DOJ Disclosures',
    categorySlug: 'doj-disclosures',
    case: 'DOJ Internal Review',
    date: '2020-11',
    type: 'Report',
    pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2020.11%20DOJ%20Office%20of%20Professional%20Responsibility%20Report.pdf',
    summary: 'Internal DOJ review of the handling of the Epstein case, examining the 2008 Non-Prosecution Agreement.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Subject' },
    ],
  },
  // Doe cases
  'doe-3-001': {
    name: 'Doe No. 3 v. Epstein - Complaint',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Doe No. 3 v. Epstein, No. 9:08-cv-80232 (S.D. Fla. 2008)',
    date: '2008-04-16',
    type: 'Complaint',
    pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Doe%20No.%203%20v.%20Epstein,%20No.%20908-cv-80232%20(S.D.%20Fla.%202008)/001.pdf',
    summary: 'Civil complaint filed by victim identified as Jane Doe No. 3 against Jeffrey Epstein.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Defendant' },
    ],
  },
  // Bryant v. Indyke
  'bryant-001': {
    name: 'Bryant v. Indyke - Filing 001',
    category: 'Court Records',
    categorySlug: 'court-records',
    case: 'Bryant v. Indyke, No. 1:19-cv-10479 (S.D.N.Y. 2019)',
    date: '2019',
    type: 'Court Filing',
    pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Bryant%20v.%20Indyke,%20No.%20119-cv-10479%20(S.D.N.Y.%202019)/001.pdf',
    summary: 'Lawsuit against executors of Epstein\'s estate.',
    people: [
      { name: 'Jeffrey Epstein', slug: 'jeffrey-epstein', role: 'Deceased (Estate)' },
    ],
  },
}

const defaultDoc = {
  name: 'Document Not Found',
  category: 'Unknown',
  categorySlug: 'court-records',
  case: 'Unknown',
  date: 'Unknown',
  type: 'Document',
  pdfUrl: null,
  summary: 'This document has not been indexed yet. Check the DOJ Epstein Library for the full collection.',
  people: [],
}

export default function DocumentPage({ params }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('document')
  const [pdfError, setPdfError] = useState(false)
  const doc = documentsData[id] || { ...defaultDoc, name: `Document ${id}` }

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 bg-[#0a1628]/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-8 relative">
              <Image src="/hourglass-static.png" alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="font-mono text-sm text-white/50">THE BLACK BOOK</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Document Header */}
        <div className="p-6 border-b border-white/10">
          <Link href={`/category/${doc.categorySlug}`} className="text-white/40 text-sm font-mono hover:text-white">
            ← {doc.category.toUpperCase()}
          </Link>
          <h1 className="text-xl font-mono mt-3">{doc.name}</h1>
          <p className="text-sm text-white/40 font-mono mt-1">{doc.case}</p>
          <p className="text-sm text-white/40 font-mono mt-1">
            {doc.date} • {doc.type.toUpperCase()}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10 flex-wrap">
          {['document', 'context', 'people'].map((tab) => (
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
          {doc.pdfUrl && (
            <a
              href={doc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto px-4 py-2 font-mono text-xs tracking-wide bg-white/5 text-white/50 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
            >
              OPEN ON DOJ.GOV →
            </a>
          )}
        </div>

        {/* Document Tab - PDF Viewer */}
        {activeTab === 'document' && (
          <div className="p-4 md:p-6">
            {doc.pdfUrl ? (
              <div className="bg-white/5 border border-white/10 overflow-hidden">
                {!pdfError ? (
                  <iframe
                    src={`${doc.pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
                    className="w-full h-[75vh] md:h-[80vh]"
                    title={doc.name}
                    onError={() => setPdfError(true)}
                  />
                ) : (
                  <div className="h-[60vh] flex items-center justify-center">
                    <div className="text-center p-6">
                      <p className="text-white/50 font-mono mb-4">PDF could not be embedded directly</p>
                      <p className="text-white/30 font-mono text-sm mb-6">Some browsers block cross-origin PDFs</p>
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#0a1628] px-6 py-3 font-mono text-sm hover:bg-white/90 transition-colors inline-block"
                      >
                        OPEN PDF ON DOJ.GOV
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[60vh] flex items-center justify-center bg-white/5 border border-white/10">
                <div className="text-center text-white/50 p-6">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="font-mono">DOCUMENT NOT AVAILABLE FOR DIRECT VIEWING</p>
                  <p className="text-sm mt-2 font-mono text-white/30">This document may be spread across multiple files</p>
                  <a
                    href="https://www.justice.gov/epstein"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 bg-white text-[#0a1628] px-6 py-3 font-mono text-sm hover:bg-white/90 transition-colors inline-block"
                  >
                    BROWSE DOJ LIBRARY
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Context Tab */}
        {activeTab === 'context' && (
          <div className="p-6 max-w-3xl">
            <div className="bg-white/5 border border-white/10 p-5 mb-6">
              <h3 className="font-mono text-sm text-white/60 mb-2">SUMMARY</h3>
              <p className="text-white/80 leading-relaxed">{doc.summary}</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-5 mb-6">
              <h3 className="font-mono text-sm text-white/60 mb-3">DOCUMENT INFO</h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">Case</span>
                  <span className="text-white/80 text-right max-w-[60%]">{doc.case}</span>
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

            {doc.pdfUrl && (
              <div className="bg-white/5 border border-white/10 p-5">
                <h3 className="font-mono text-sm text-white/60 mb-3">SOURCE URL</h3>
                <a 
                  href={doc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white font-mono break-all"
                >
                  {doc.pdfUrl}
                </a>
              </div>
            )}
          </div>
        )}

        {/* People Tab */}
        {activeTab === 'people' && (
          <div className="p-6 max-w-3xl">
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
              <p className="text-white/40 font-mono">No people indexed for this document yet.</p>
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

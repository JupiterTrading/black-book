'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

// Real DOJ document data organized by category
const categoryData = {
  'court-records': {
    title: 'Court Records',
    icon: '⚖️',
    description: 'Legal filings, depositions, and judicial documents from Epstein-related cases. Many documents contain pre-existing redactions with additional DOJ redactions for victim protection.',
    source: 'https://www.justice.gov/epstein/court-records',
    cases: [
      {
        name: 'Giuffre v. Maxwell, No. 1:15-cv-07433 (S.D.N.Y. 2015)',
        description: 'Defamation lawsuit by Virginia Giuffre against Ghislaine Maxwell',
        documents: [
          { id: 'giuffre-maxwell-001', name: 'Complaint', num: '001', pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)/001.pdf' },
          { id: 'giuffre-maxwell-034', name: 'Maxwell Deposition', num: '034', pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)/034.pdf' },
        ],
        totalDocs: 200,
        dojLink: 'https://www.justice.gov/epstein/court-records/giuffre-v-maxwell-no-115-cv-07433-sdny-2015',
      },
      {
        name: 'United States v. Maxwell, No. 1:20-cr-00330 (S.D.N.Y. 2020)',
        description: 'Federal criminal prosecution of Ghislaine Maxwell',
        documents: [
          { id: 'usa-maxwell-001', name: 'Indictment', num: '001', pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/United%20States%20v.%20Maxwell,%20No.%20120-cr-00330%20(S.D.N.Y.%202020)/001.pdf' },
        ],
        totalDocs: 150,
        dojLink: 'https://www.justice.gov/epstein/court-records',
      },
      {
        name: 'Doe No. 3 v. Epstein, No. 9:08-cv-80232 (S.D. Fla. 2008)',
        description: 'Early civil case against Epstein',
        documents: [
          { id: 'doe-3-001', name: 'Complaint', num: '001', pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Doe%20No.%203%20v.%20Epstein,%20No.%20908-cv-80232%20(S.D.%20Fla.%202008)/001.pdf' },
        ],
        totalDocs: 100,
        dojLink: 'https://www.justice.gov/epstein/court-records/doe-no-3-v-epstein-no-908-cv-80232-sd-fla-2008',
      },
      {
        name: 'Bryant v. Indyke, No. 1:19-cv-10479 (S.D.N.Y. 2019)',
        description: 'Lawsuit against Epstein estate executors',
        documents: [
          { id: 'bryant-001', name: 'Filing 001', num: '001', pdfUrl: 'https://www.justice.gov/multimedia/Court%20Records/Bryant%20v.%20Indyke,%20No.%20119-cv-10479%20(S.D.N.Y.%202019)/001.pdf' },
        ],
        totalDocs: 54,
        dojLink: 'https://www.justice.gov/epstein/court-records',
      },
    ],
  },
  'doj-disclosures': {
    title: 'DOJ Disclosures',
    icon: '📋',
    description: 'Documents released under the Epstein Files Transparency Act (H.R. 4405) and other DOJ releases including declassified files, memoranda, and the Maxwell Proffer.',
    source: 'https://www.justice.gov/epstein/doj-disclosures',
    cases: [
      {
        name: 'First Phase of Declassified Epstein Files',
        description: 'Released by Attorney General Pamela Bondi on February 27, 2025',
        documents: [
          { id: 'evidence-list', name: 'Evidence List from U.S. v. Maxwell', num: 'A', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/A.%20Evidence%20List%20from%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf' },
          { id: 'flight-log', name: 'Flight Log from U.S. v. Maxwell', num: 'B', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/B.%20Flight%20Log%20Released%20in%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf' },
          { id: 'contact-book', name: 'Contact Book (Redacted)', num: 'C', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/C.%20Contact%20Book%20(Redacted).pdf' },
          { id: 'masseuse-list', name: 'Masseuse List (Redacted)', num: 'D', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/D.%20Masseuse%20List%20(Redacted).pdf' },
        ],
        totalDocs: 4,
      },
      {
        name: 'Maxwell Proffer',
        description: 'Interview transcripts and audio from Ghislaine Maxwell proffer sessions',
        documents: [],
        totalDocs: 25,
        dojLink: 'https://www.justice.gov/epstein/doj-disclosures',
        note: 'Includes interview transcripts and audio recordings',
      },
      {
        name: 'Memoranda and Correspondence',
        description: 'DOJ internal reviews and official correspondence',
        documents: [
          { id: 'opr-report', name: 'DOJ Office of Professional Responsibility Report', num: '2020.11', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2020.11%20DOJ%20Office%20of%20Professional%20Responsibility%20Report.pdf' },
        ],
        totalDocs: 6,
      },
      {
        name: 'Epstein Files Transparency Act Data Sets',
        description: 'Bulk document releases under H.R. 4405',
        documents: [],
        totalDocs: 1000,
        dojLink: 'https://www.justice.gov/epstein/doj-disclosures',
        note: 'Available as ZIP downloads on DOJ site',
      },
    ],
  },
  'foia': {
    title: 'FOIA Records',
    icon: '🔍',
    description: 'Documents obtained through Freedom of Information Act requests. Contains pre-existing redactions made pursuant to FOIA, 5 U.S.C. § 552, and Florida public records laws.',
    source: 'https://www.justice.gov/epstein/foia',
    cases: [
      {
        name: 'FBI FOIA Releases',
        description: 'FBI records released under FOIA',
        documents: [],
        totalDocs: 200,
        dojLink: 'https://www.justice.gov/epstein/foia',
      },
    ],
  },
  'flight-logs': {
    title: 'Flight Logs',
    icon: '✈️',
    description: 'Aircraft travel records and passenger manifests from Epstein\'s planes (N908JE and N212JE). Now available as part of DOJ Disclosures.',
    source: 'https://www.justice.gov/epstein/doj-disclosures',
    cases: [
      {
        name: 'Flight Log from U.S. v. Maxwell',
        description: 'Official flight log released as evidence in Maxwell criminal trial',
        documents: [
          { id: 'flight-log', name: 'Flight Log (Declassified)', num: 'B', pdfUrl: 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/B.%20Flight%20Log%20Released%20in%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf' },
        ],
        totalDocs: 1,
      },
    ],
  },
  'financial': {
    title: 'Financial Records',
    icon: '💰',
    description: 'Banking, transactions, and asset documentation related to Epstein\'s finances.',
    source: 'https://www.justice.gov/epstein',
    cases: [
      {
        name: 'Financial Documents',
        description: 'Financial records are distributed across various court filings',
        documents: [],
        totalDocs: 0,
        note: 'Financial records appear within court case documents',
      },
    ],
  },
}

export default function CategoryPage({ params }) {
  const { slug } = use(params)
  const [expandedCase, setExpandedCase] = useState(null)
  const category = categoryData[slug]

  if (!category) {
    return (
      <main className="min-h-screen bg-[#0a1628] text-white p-8">
        <h1 className="text-2xl font-mono">CATEGORY NOT FOUND</h1>
        <Link href="/" className="text-white/50 hover:text-white mt-4 block font-mono text-sm">← BACK TO HOME</Link>
      </main>
    )
  }

  const totalDocs = category.cases.reduce((sum, c) => sum + c.totalDocs, 0)

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
              <p className="text-white/40 font-mono text-sm">{totalDocs.toLocaleString()}+ DOCUMENTS</p>
            </div>
          </div>
          <p className="text-white/50 mt-4 max-w-3xl font-mono text-sm leading-relaxed">{category.description}</p>
        </div>

        {/* Source Link */}
        {category.source && (
          <div className="bg-white/5 border border-white/10 p-4 mb-6">
            <p className="text-sm font-mono text-white/40">
              OFFICIAL DOJ SOURCE:{' '}
              <a href={category.source} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline">
                {category.source}
              </a>
            </p>
          </div>
        )}

        {/* Cases */}
        <div className="space-y-4">
          {category.cases.map((caseItem, index) => (
            <div key={index} className="bg-white/5 border border-white/10">
              {/* Case Header */}
              <button
                onClick={() => setExpandedCase(expandedCase === index ? null : index)}
                className="w-full p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-mono text-white">{caseItem.name}</h3>
                    <p className="text-sm text-white/40 font-mono mt-1">{caseItem.description}</p>
                    {caseItem.note && (
                      <p className="text-xs text-white/30 font-mono mt-2 italic">{caseItem.note}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-white/40 font-mono text-sm">{caseItem.totalDocs} DOCS</span>
                    <span className="text-white/30 ml-2">{expandedCase === index ? '▼' : '▶'}</span>
                  </div>
                </div>
              </button>

              {/* Expanded Documents */}
              {expandedCase === index && (
                <div className="border-t border-white/10 p-4">
                  {caseItem.documents.length > 0 ? (
                    <div className="space-y-2">
                      {caseItem.documents.map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/document/${doc.id}`}
                          className="flex items-center justify-between bg-white/5 border border-white/10 p-3 hover:border-white/30 hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-white/30 font-mono text-xs w-8">{doc.num}</span>
                            <span className="font-mono text-sm">{doc.name}</span>
                          </div>
                          <span className="text-white/30">→</span>
                        </Link>
                      ))}
                      {caseItem.totalDocs > caseItem.documents.length && caseItem.dojLink && (
                        <a
                          href={caseItem.dojLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center py-3 text-white/40 hover:text-white font-mono text-sm"
                        >
                          VIEW ALL {caseItem.totalDocs} DOCUMENTS ON DOJ.GOV →
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      {caseItem.dojLink ? (
                        <a
                          href={caseItem.dojLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-white font-mono text-sm"
                        >
                          VIEW ON DOJ.GOV →
                        </a>
                      ) : (
                        <p className="text-white/30 font-mono text-sm">Documents available on DOJ Epstein Library</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Browse All Link */}
        <div className="mt-8 text-center">
          <a
            href={category.source || 'https://www.justice.gov/epstein'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0a1628] px-6 py-3 font-mono text-sm hover:bg-white/90 transition-colors"
          >
            BROWSE FULL COLLECTION ON DOJ.GOV
          </a>
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

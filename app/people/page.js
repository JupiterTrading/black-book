import Link from 'next/link'
import Image from 'next/image'

const people = [
  { slug: 'jeffrey-epstein', name: 'Jeffrey Epstein', documents: 1847, status: 'Deceased', statusStyle: 'bg-white/10 text-white/50' },
  { slug: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', documents: 243, status: 'Convicted', statusStyle: 'bg-red-500/20 text-red-300' },
  { slug: 'jean-luc-brunel', name: 'Jean-Luc Brunel', documents: 87, status: 'Deceased', statusStyle: 'bg-white/10 text-white/50' },
  { slug: 'bill-clinton', name: 'Bill Clinton', documents: 23, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
  { slug: 'alan-dershowitz', name: 'Alan Dershowitz', documents: 15, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
  { slug: 'prince-andrew', name: 'Prince Andrew', documents: 67, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
  { slug: 'sarah-kellen', name: 'Sarah Kellen', documents: 34, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
  { slug: 'nadia-marcinkova', name: 'Nadia Marcinkova', documents: 28, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
  { slug: 'lesley-groff', name: 'Lesley Groff', documents: 22, status: 'Named', statusStyle: 'bg-yellow-500/20 text-yellow-300' },
]

export default function PeoplePage() {
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
        <h1 className="text-2xl font-mono tracking-wide mb-2">PEOPLE INDEX</h1>
        <p className="text-white/40 font-mono text-sm mb-8">Individuals mentioned in the Epstein documents</p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-red-500/20 text-red-300 px-2 py-1">CONVICTED</span>
            <span className="text-white/30">Convicted of related crimes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1">NAMED</span>
            <span className="text-white/30">Appears in documents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 text-white/50 px-2 py-1">DECEASED</span>
            <span className="text-white/30">No longer living</span>
          </div>
        </div>

        {/* People List */}
        <div className="space-y-2">
          {people.map((person) => (
            <Link
              key={person.slug}
              href={`/person/${person.slug}`}
              className="flex items-center justify-between bg-white/5 border border-white/10 p-4 hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-mono">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-mono">{person.name}</h3>
                  <p className="text-sm text-white/40 font-mono">{person.documents} DOCUMENTS</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-mono ${person.statusStyle}`}>
                  {person.status.toUpperCase()}
                </span>
                <span className="text-white/30">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-white/5 border border-white/10">
          <p className="text-xs font-mono text-white/40 leading-relaxed">
            <strong className="text-white/60">NOTE:</strong> Appearance in these documents does not imply guilt or wrongdoing. 
            Many individuals appear as witnesses, victims, or in other non-criminal capacities. 
            Only those with "CONVICTED" status have been found guilty of related crimes.
          </p>
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

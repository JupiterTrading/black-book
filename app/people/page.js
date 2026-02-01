import Link from 'next/link'

const people = [
  { slug: 'jeffrey-epstein', name: 'Jeffrey Epstein', documents: 1847, status: 'Deceased', statusColor: 'bg-gray-700 text-gray-300' },
  { slug: 'ghislaine-maxwell', name: 'Ghislaine Maxwell', documents: 243, status: 'Convicted', statusColor: 'bg-red-900/50 text-red-300' },
  { slug: 'jean-luc-brunel', name: 'Jean-Luc Brunel', documents: 87, status: 'Deceased', statusColor: 'bg-gray-700 text-gray-300' },
  { slug: 'bill-clinton', name: 'Bill Clinton', documents: 23, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
  { slug: 'alan-dershowitz', name: 'Alan Dershowitz', documents: 15, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
  { slug: 'prince-andrew', name: 'Prince Andrew', documents: 67, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
  { slug: 'sarah-kellen', name: 'Sarah Kellen', documents: 34, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
  { slug: 'nadia-marcinkova', name: 'Nadia Marcinkova', documents: 28, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
  { slug: 'lesley-groff', name: 'Lesley Groff', documents: 22, status: 'Named', statusColor: 'bg-yellow-900/50 text-yellow-300' },
]

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">← Back to home</Link>
          <h1 className="text-3xl font-bold mt-4">People Index</h1>
          <p className="text-gray-400 mt-2">Individuals mentioned in the Epstein documents</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-red-900/50 text-red-300 px-2 py-1 rounded text-xs">Convicted</span>
            <span className="text-gray-500">Convicted of related crimes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded text-xs">Named</span>
            <span className="text-gray-500">Appears in documents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Deceased</span>
            <span className="text-gray-500">No longer living</span>
          </div>
        </div>

        {/* People List */}
        <div className="space-y-3">
          {people.map((person) => (
            <Link
              key={person.slug}
              href={`/person/${person.slug}`}
              className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-medium">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-400">{person.documents} documents</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs ${person.statusColor}`}>
                  {person.status}
                </span>
                <span className="text-gray-500">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <p className="text-sm text-gray-400">
            <strong className="text-white">Note:</strong> Appearance in these documents does not imply guilt or wrongdoing. 
            Many individuals appear in documents as witnesses, victims, or in other non-criminal capacities. 
            Only those with "Convicted" status have been found guilty of related crimes.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800 mt-12 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

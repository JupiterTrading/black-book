const categories = [
  {
    title: "Court Records",
    description: "Legal filings, depositions, and judicial documents",
    count: null,
    slug: "court-records"
  },
  {
    title: "DOJ Disclosures",
    description: "Documents released under the Epstein Files Transparency Act",
    count: null,
    slug: "doj-disclosures"
  },
  {
    title: "FOIA Records",
    description: "Documents obtained through Freedom of Information Act requests",
    count: null,
    slug: "foia"
  },
  {
    title: "Flight Logs",
    description: "Aircraft travel records and manifests",
    count: null,
    slug: "flight-logs"
  },
  {
    title: "Financial Records",
    description: "Banking, transactions, and asset documentation",
    count: null,
    slug: "financial"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-6">
        <h1 className="text-3xl font-bold tracking-tight">Epstein Files</h1>
        <p className="text-gray-400 mt-1">Public access to the DOJ Epstein Library</p>
      </header>

      <div className="p-6 border-b border-gray-800">
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="p-6">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Document Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <a key={category.slug} href={"/category/" + category.slug} className="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-colors">
              <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
              <p className="text-sm text-gray-400">{category.description}</p>
            </a>
          ))}
        </div>
      </div>

      <footer className="p-6 border-t border-gray-800 mt-12 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

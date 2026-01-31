const categoryData = {
  "court-records": {
    title: "Court Records",
    description: "Legal filings, depositions, and judicial documents from various Epstein-related cases",
    source: "https://www.justice.gov/epstein/court-records"
  },
  "doj-disclosures": {
    title: "DOJ Disclosures",
    description: "Documents released under the Epstein Files Transparency Act (H.R. 4405)",
    source: "https://www.justice.gov/epstein/doj-disclosures"
  },
  "foia": {
    title: "FOIA Records",
    description: "Documents obtained through Freedom of Information Act requests",
    source: "https://www.justice.gov/epstein/foia"
  },
  "flight-logs": {
    title: "Flight Logs",
    description: "Aircraft travel records and passenger manifests",
    source: null
  },
  "financial": {
    title: "Financial Records",
    description: "Banking, transactions, and asset documentation",
    source: null
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const category = categoryData[slug]

  if (!category) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <a href="/" className="text-blue-400 hover:underline mt-4 block">Back to home</a>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-6">
        <a href="/" className="text-gray-400 hover:text-white text-sm">← Back to all categories</a>
        <h1 className="text-3xl font-bold tracking-tight mt-2">{category.title}</h1>
        <p className="text-gray-400 mt-1">{category.description}</p>
      </header>

      <div className="p-6">
        {category.source ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400 mb-4">Documents in this category are sourced from the official DOJ library.</p>
            <a 
              href={category.source}
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
            >
              View on justice.gov →
            </a>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400">Documents coming soon. This category is being populated.</p>
          </div>
        )}
      </div>

      <footer className="p-6 border-t border-gray-800 mt-12 text-center text-gray-500 text-sm">
        <p>All documents sourced from <a href="https://www.justice.gov/epstein" className="underline hover:text-white">justice.gov/epstein</a></p>
      </footer>
    </main>
  )
}

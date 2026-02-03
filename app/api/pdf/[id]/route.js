/**
 * PDF Proxy API Route
 * 
 * Fetches PDFs from DOJ and serves them directly, bypassing the age gate.
 * Includes caching headers so Vercel's edge caches the response.
 * 
 * Usage: /api/pdf/[id] where id matches a key in PDF_SOURCES
 */

import { NextResponse } from 'next/server'

// Map of document IDs to their DOJ URLs
// Add more documents here as needed
const PDF_SOURCES = {
  // First Phase Declassified Files
  'flight-log': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/B.%20Flight%20Log%20Released%20in%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf',
  'contact-book': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/C.%20Contact%20Book%20(Redacted).pdf',
  'evidence-list': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/A.%20Evidence%20List%20from%20US%20v.%20Maxwell,%201.20-cr-00330%20(SDNY%202020).pdf',
  'masseuse-list': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/First%20Phase%20of%20Declassified%20Epstein%20Files/D.%20Masseuse%20List%20(Redacted).pdf',
  
  // DOJ Reports
  'opr-report': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2020.11%20DOJ%20Office%20of%20Professional%20Responsibility%20Report.pdf',
  'opr-summary': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2020.11%20DOJ%20Office%20of%20Professional%20Responsibility%20Report%20Executive%20Summary.pdf',
  'oig-memo': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2023.06%20OIG%20Memorandum%2023-085.pdf',
  'bondi-letter': 'https://www.justice.gov/multimedia/DOJ%20Disclosures/Memos.%20&%20Correspondence/2025.02.27%20Letter%20from%20Attorney%20General%20Bondi%20to%20FBI%20Director%20Patel.pdf',
  
  // Giuffre v. Maxwell
  'giuffre-maxwell-001': 'https://www.justice.gov/multimedia/Court%20Records/Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)/001.pdf',
  'giuffre-maxwell-034': 'https://www.justice.gov/multimedia/Court%20Records/Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)/034.pdf',
  
  // USA v. Maxwell (Criminal)
  'usa-maxwell-001': 'https://www.justice.gov/multimedia/Court%20Records/United%20States%20v.%20Maxwell,%20No.%20120-cr-00330%20(S.D.N.Y.%202020)/001.pdf',
  
  // Doe Cases
  'doe-3-001': 'https://www.justice.gov/multimedia/Court%20Records/Doe%20No.%203%20v.%20Epstein,%20No.%20908-cv-80232%20(S.D.%20Fla.%202008)/001.pdf',
  'doe-4-001': 'https://www.justice.gov/multimedia/Court%20Records/Doe%20No.%204%20v.%20Epstein,%20No.%20908-cv-80380%20(S.D.%20Fla.%202008)/001.pdf',
  
  // Bryant v. Indyke
  'bryant-001': 'https://www.justice.gov/multimedia/Court%20Records/Bryant%20v.%20Indyke,%20No.%20119-cv-10479%20(S.D.N.Y.%202019)/001.pdf',
  
  // Palm Beach
  'palm-beach-001': 'https://www.justice.gov/multimedia/Court%20Records/CA%20Florida%20Holdings,%20LLC,%20Publisher%20of%20the%20Palm%20Beach%20Post%20v.%20Aronberg,%20No.%2050-2019-CA-014681-XXXX-MB%20(Fla.%2015th%20Cir.%20Ct.%202019)/001.pdf',
}

// Dynamic route mapping for court records with numbered documents
// Format: case-slug-XXX where XXX is the document number
function getDynamicUrl(id) {
  // Check if it's a numbered document request (e.g., "giuffre-maxwell-045")
  const match = id.match(/^(.+)-(\d{3})$/)
  if (match) {
    const [, caseSlug, docNum] = match
    
    const caseMappings = {
      'giuffre-maxwell': 'Giuffre%20v.%20Maxwell,%20No.%20115-cv-07433%20(S.D.N.Y.%202015)',
      'usa-maxwell': 'United%20States%20v.%20Maxwell,%20No.%20120-cr-00330%20(S.D.N.Y.%202020)',
      'doe-3': 'Doe%20No.%203%20v.%20Epstein,%20No.%20908-cv-80232%20(S.D.%20Fla.%202008)',
      'doe-4': 'Doe%20No.%204%20v.%20Epstein,%20No.%20908-cv-80380%20(S.D.%20Fla.%202008)',
      'doe-5': 'Doe%20No.%205%20v.%20Epstein,%20No.%20908-cv-80381%20(S.D.%20Fla.%202008)',
      'doe-6': 'Doe%20No.%206%20v.%20Epstein,%20No.%20908-cv-80994%20(S.D.%20Fla.%202008)',
      'doe-17': 'Doe%2017%20v.%20Indyke,%20No.%20119-cv-09610%20(S.D.N.Y.%202019)',
      'doe-1000': 'Doe%201000%20v.%20Indyke,%20No.%20119-cv-10577%20(S.D.N.Y.%202019)',
      'bryant': 'Bryant%20v.%20Indyke,%20No.%20119-cv-10479%20(S.D.N.Y.%202019)',
      'davies': 'Davies%20v.%20Indyke,%20No.%20119-cv-10788%20(S.D.N.Y.%202019)',
    }
    
    const casePath = caseMappings[caseSlug]
    if (casePath) {
      return `https://www.justice.gov/multimedia/Court%20Records/${casePath}/${docNum}.pdf`
    }
  }
  
  return null
}

export async function GET(request, { params }) {
  const { id } = await params
  
  // Get URL from static map or dynamic generation
  let pdfUrl = PDF_SOURCES[id] || getDynamicUrl(id)
  
  if (!pdfUrl) {
    return NextResponse.json(
      { error: 'Document not found', id },
      { status: 404 }
    )
  }
  
  try {
    // Fetch PDF from DOJ
    const response = await fetch(pdfUrl, {
      headers: {
        // Mimic browser request to avoid blocks
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/pdf,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.justice.gov/epstein',
      },
    })
    
    if (!response.ok) {
      console.error(`Failed to fetch PDF: ${response.status} ${response.statusText}`)
      return NextResponse.json(
        { error: 'Failed to fetch document from DOJ', status: response.status },
        { status: response.status }
      )
    }
    
    // Get the PDF data
    const pdfBuffer = await response.arrayBuffer()
    
    // Return PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${id}.pdf"`,
        // Cache for 7 days on Vercel's edge and browser
        'Cache-Control': 'public, s-maxage=604800, max-age=604800, stale-while-revalidate=86400',
        // Allow embedding
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self'",
      },
    })
    
  } catch (error) {
    console.error('PDF proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to proxy PDF', message: error.message },
      { status: 500 }
    )
  }
}

// Edge runtime for better performance and caching
export const runtime = 'edge'

// Revalidate cache every 7 days
export const revalidate = 604800

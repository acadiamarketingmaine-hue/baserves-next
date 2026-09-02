import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business Connection",
  description: "A network of trusted local service businesses across Maine and New England.",
  robots: { index: true, follow: true },
};

export default function SmallBusinessConnectionPage() {
  return (
    <section style={ { padding: "80px 20px", maxWidth: 800, margin: "0 auto" } }>
      <h1 style={ { fontSize: "2rem", fontWeight: 700, marginBottom: 12 } }>Small Business Connection</h1>
      <p style={ { fontSize: "1.05rem", color: "#555", marginBottom: 32, lineHeight: 1.7 } }>
        We are proud to be part of a network of trusted local service businesses across Maine and New England.
        These companies share our commitment to quality work, honest pricing, and exceptional customer service.
      </p>
      <ul style={ { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 } }>
            <li key="https://www.newenglandepoxyllc.com">
              <a href="https://www.newenglandepoxyllc.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                New England Epoxy & Concrete Polishing | Epoxy & Concrete Coating Pros Serving All of Maine
              </a>
            </li>
            <li key="https://www.somaineheatpumps.com">
              <a href="https://www.somaineheatpumps.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Heat Pumps Portland Maine | Expert Installation & Service
              </a>
            </li>
            <li key="https://www.seethroughwindowcleaning.com">
              <a href="https://www.seethroughwindowcleaning.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                See Through Window Cleaning | Belfast, Maine
              </a>
            </li>
            <li key="https://www.acadiamarketingmaine.com">
              <a href="https://www.acadiamarketingmaine.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Acadia Marketing | Full-Funnel Growth Systems for Service Businesses
              </a>
            </li>
            <li key="https://www.bigboytruckingme.com">
              <a href="https://www.bigboytruckingme.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Big Boy Trucking LLC | Heavy-Duty Hauling & Cleanup | Dayton, Maine
              </a>
            </li>
            <li key="https://www.rjcplumbing.com">
              <a href="https://www.rjcplumbing.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Augusta&apos;s Trusted Plumber | Expert Plumbing in Central Maine
              </a>
            </li>
            <li key="https://www.septicadvisor.com">
              <a href="https://www.septicadvisor.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Trusted Septic System Service South Portland, ME | Septic Advisor
              </a>
            </li>
            <li key="https://www.apexroofnh.com">
              <a href="https://www.apexroofnh.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Apex Exteriors | Roofing and Siding in Rochester NH
              </a>
            </li>
            <li key="https://www.nasonshomesolutions.com">
              <a href="https://www.nasonshomesolutions.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Nason&apos;s Home Solutions | Insulation, Mold Removal & Waterproofing in Maine
              </a>
            </li>
            <li key="https://www.themadtinter.com">
              <a href="https://www.themadtinter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                The Mad Tinter | Professional Window Tinting & Ceramic Coatings in Maine
              </a>
            </li>
            <li key="https://www.allagashplumbing.com">
              <a href="https://www.allagashplumbing.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Allagash Plumbing & Heating | Brunswick & Freeport Maine Plumber
              </a>
            </li>
            <li key="https://www.cardenkennels.com">
              <a href="https://www.cardenkennels.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Carden Kennels | Premier Pet Boarding & Daycare in Bangor & Holden, Maine
              </a>
            </li>
            <li key="https://www.winmechanical.com">
              <a href="https://www.winmechanical.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Win Mechanical | HVAC & Plumbing Services in Maine
              </a>
            </li>
            <li key="https://www.mainewindowwashing.com">
              <a href="https://www.mainewindowwashing.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Streak Free Solutions | Window Washing & Gutter Cleaning in Bangor, Maine
              </a>
            </li>
            <li key="https://www.cardinalext.com">
              <a href="https://www.cardinalext.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Cardinal Exteriors | Premium Siding, Roofing & Windows | Portland, Maine
              </a>
            </li>
            <li key="https://www.samstrumphbuilders.com">
              <a href="https://www.samstrumphbuilders.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Sam Strumph Builders | Custom Home Builder in Southern Maine
              </a>
            </li>
            <li key="https://www.maineheatpumpcleaning.com">
              <a href="https://www.maineheatpumpcleaning.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Maine Heat Pump Cleaning | Heat Pump Service
              </a>
            </li>
            <li key="https://www.goodnowelectric.com">
              <a href="https://www.goodnowelectric.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Goodnow Electric | Licensed Electrician in Southern Maine
              </a>
            </li>
            <li key="https://aceshighlandshvacplumb.com">
              <a href="https://aceshighlandshvacplumb.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Aces Highlands | HVAC Portland Maine | Plumbing &amp; Electrical
              </a>
            </li>
            <li key="https://www.campbellspests.com">
              <a href="https://www.campbellspests.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Campbell&apos;s Pest Control | Pest Control Services in Maine
              </a>
            </li>
            <li key="https://www.gardenguyslandscaping.com">
              <a href="https://www.gardenguyslandscaping.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Garden Guys Landscaping | Professional Landscaping in Southern Maine
              </a>
            </li>
            <li key="https://www.blackmajicsealcoating.com">
              <a href="https://www.blackmajicsealcoating.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Black Majic Sealcoating | Driveway Sealcoating in Southern Maine
              </a>
            </li>
      </ul>
    </section>
  );
}

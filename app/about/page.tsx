import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Strata Manager</h1>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium font-bold">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Login
              </Link>
            </nav>
            <Button asChild className="md:hidden">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">About Strata Manager</h2>

              <div className="prose prose-lg max-w-none">
                <p>
                  Strata Manager is a comprehensive online portal designed specifically for strata-titled properties in
                  New South Wales, operating under the Strata Schemes Management Act (2015).
                </p>

                <h3>Our Mission</h3>
                <p>
                  Our mission is to simplify the complex process of strata management by providing a user-friendly
                  platform that connects owners, committee members, and building managers in one secure environment.
                </p>

                <h3>Strata Schemes Management Act Compliance</h3>
                <p>
                  Our platform is built with full compliance to the NSW Strata Schemes Management Act (2015), ensuring
                  that all operations, from record-keeping to financial management, meet the legal requirements set
                  forth by the legislation.
                </p>

                <h3>Key Features</h3>
                <ul>
                  <li>Secure owner portal with role-based access control</li>
                  <li>Comprehensive strata roll management</li>
                  <li>Automated levy notice generation and tracking</li>
                  <li>Document storage and management system</li>
                  <li>Maintenance request submission and tracking</li>
                  <li>Financial management and reporting tools</li>
                  <li>Meeting scheduling and minutes distribution</li>
                </ul>

                <h3>Our Technology</h3>
                <p>
                  Strata Manager is built using modern web technologies to ensure security, reliability, and ease of
                  use. Our platform is hosted on secure servers with regular backups and employs industry-standard
                  encryption to protect your data.
                </p>

                <h3>Get Started</h3>
                <p>
                  If you're an owner or committee member of a strata-titled property in NSW, contact us today to learn
                  how Strata Manager can help streamline your property management processes.
                </p>
              </div>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Strata Manager</h3>
              <p className="text-gray-300">
                Comprehensive strata management solution for NSW properties under the Strata Schemes Management Act
                (2015).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="text-gray-300 not-italic">
                123 Strata Street
                <br />
                Sydney, NSW 2000
                <br />
                Australia
                <br />
                <Link href="mailto:info@stratamanager.com" className="hover:text-white">
                  info@stratamanager.com
                </Link>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Strata Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


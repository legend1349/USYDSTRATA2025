import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Users, FileText, PenToolIcon as Tool, DollarSign } from "lucide-react"

export default function Home() {
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
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
        {/* Hero Section */}
        <section
          className="bg-cover bg-center bg-no-repeat py-20 text-center text-white"
          style={{ backgroundImage: "url('/modernBuldingBackground.png')" }}
          >
          <div className="bg-black/50 py-16 px-4">
            <h1 className="text-4xl font-bold mb-4">Strata Management Made Simple</h1>
            <p className="max-w-2xl mx-auto text-lg mb-6">
              A comprehensive portal for owners and committee members to manage your strata-titled property under the NSW Strata Schemes Management Act (2015).
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Owner Portal</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Strata Roll</h3>
                <p className="text-gray-600">
                  Access owner details, contact information, and unit entitlements in one secure location.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Levy Management</h3>
                <p className="text-gray-600">
                  Generate and distribute levy notices with automatic calculations based on unit entitlements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Document Storage</h3>
                <p className="text-gray-600">
                  Securely store and access important documents like meeting minutes and insurance certificates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Tool className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Maintenance Tracking</h3>
                <p className="text-gray-600">Submit and track maintenance requests with real-time status updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Management Structure */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Management Structure</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Chairperson</h3>
                  <p className="text-gray-600">John Smith</p>
                  <p className="text-gray-500 text-sm mt-2">Oversees committee meetings and general operations</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Treasurer</h3>
                  <p className="text-gray-600">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm mt-2">Manages financial matters and budget planning</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secretary</h3>
                  <p className="text-gray-600">Michael Wong</p>
                  <p className="text-gray-500 text-sm mt-2">Handles correspondence and record-keeping</p>
                </div>
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


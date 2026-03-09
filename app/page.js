import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* NAVBAR */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex items-center justify-start gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-bold text-sm w-8 h-8 rounded-md flex items-center justify-center">
              K
            </div>
            <span className="text-gray-900 font-semibold text-base tracking-tight">
              Konimbo
            </span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-strip bg-linear-to-br from-blue-700 to-blue-900 text-white px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-blue-500 bg-opacity-40 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
            Contact Us
          </span>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Get in Touch with<br />Our Team
          </h1>
          <p className="text-blue-200 text-base">
            Fill in the form below and we will get back to you shortly.
          </p>
        </div>
      </section>

      {/* FORM CARD */}
      <section className="flex justify-center px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full max-w-lg">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-gray-100 py-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Konimbo. All rights reserved.
        </p>
      </footer>

    </main>
  )
}
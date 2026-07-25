/**
 * App.tsx — Root component.
 * Assembles the full single-page site in section order.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Academy from "@/components/Academy";
import Innovation from "@/components/Innovation";
import About from "@/components/About";
import Awards from "@/components/Awards";
import Publications from "@/components/Publications";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Careers from "@/components/Careers";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="root" style={{ paddingTop: 68 }}>
        <Hero />
        <Services />
        <Industries />
        <Academy />
        <Innovation />
        <About />
        <Publications />
        <Awards />
        <Clients />
        <Contact />
        <Careers />
      </main>
      <Footer />
    </div>
  );
}
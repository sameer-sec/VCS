import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { ClientsAndTeam } from "@/components/sections/ClientsAndTeam";
import { Booking } from "@/components/sections/Booking";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <Results />
        <Process />
        <Pricing />
        <ClientsAndTeam />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

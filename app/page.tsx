import Header from "./components/Header";
import Hero from "./components/Hero";
import SyncSection from "./components/SyncSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SyncSection />
        <CTASection />
      </main>
    </>
  );
}

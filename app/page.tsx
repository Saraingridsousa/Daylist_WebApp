import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroFeatures from "./components/HeroFeatures";
import SyncSection from "./components/SyncSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HeroFeatures />
        {/* <SyncSection /> */}
        <CTASection />
      </main>
    </>
  );
}

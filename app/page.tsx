import Chrome from "@/components/Chrome";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GenScroller from "@/components/GenScroller";
import Stopover from "@/components/Stopover";
import Testimonials from "@/components/Testimonials";
import Passion from "@/components/Passion";
import Trilogy from "@/components/Trilogy";
import Compare from "@/components/Compare";
import TrialCta from "@/components/TrialCta";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Chrome />
      <main>
        <Hero />
        <Features />
        <GenScroller />
        <Stopover />
        <Testimonials />
        <Passion />
        <Trilogy />
        <Compare />
        <div className="bloom-field">
          <TrialCta />
          <Footer />
        </div>
      </main>
    </>
  );
}

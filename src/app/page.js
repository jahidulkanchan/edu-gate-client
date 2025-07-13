import CtaSection from "@/components/home-page/CtaSection";
import FeaturedColleges from "@/components/home-page/FeaturedColleges";
import GallerySection from "@/components/home-page/GallerySection";
import HeroSection from "@/components/home-page/HeroSection";
import ResearchSection from "@/components/home-page/ResearchSection";
import ReviewSection from "@/components/home-page/ReviewSection";
import SearchBar from "@/components/home-page/SearchBar";

// src/app/page.js
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* <!-- Hero Section --> */}
     <HeroSection/>
      {/* <!-- Features Section --> */}
      <FeaturedColleges />
      <ResearchSection />
      <GallerySection />
      {/* Review Section */}
      <ReviewSection />
      {/* <!-- CTA Section --> */}
     <CtaSection/>
    </main>
  );
}

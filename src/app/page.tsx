import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import TrendingProducts from '@/components/home/TrendingProducts';
import LuxuryCollections from '@/components/home/LuxuryCollections';
import SeasonalOffers from '@/components/home/SeasonalOffers';
import Testimonials from '@/components/home/Testimonials';
import BrandStory from '@/components/home/BrandStory';
import InspirationGallery from '@/components/home/InspirationGallery';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CategoryShowcase />
      <BestSellers />
      <NewArrivals />
      <TrendingProducts />
      <LuxuryCollections />
      <SeasonalOffers />
      <Testimonials />
      <BrandStory />
      <InspirationGallery />
      <Newsletter />
    </>
  );
}

import { Suspense } from 'react'
import CategoryGrid from '../components/home/CategoryGrid'
import CommunityPreview from '../components/home/CommunityPreview'
import CtaBanner from '../components/home/CtaBanner'
import FAQSection from '../components/home/FAQSection'
import FeaturedListings, {
  FeaturedListingsSkeleton,
} from '../components/home/FeaturedListings'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import MessPreview, { MessPreviewSkeleton } from '../components/home/MessPreview'
import PopularCategories from '../components/home/PopularCategories'
import StudentBenefits from '../components/home/StudentBenefits'
import Testimonials from '../components/home/Testimonials'
import TrustSection from '../components/home/TrustSection'
import Reveal from '../components/ui/Reveal'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <CategoryGrid />
      </Reveal>
      <Reveal>
        <Suspense fallback={<FeaturedListingsSkeleton />}>
          <FeaturedListings />
        </Suspense>
      </Reveal>
      <Reveal>
        <Suspense fallback={<MessPreviewSkeleton />}>
          <MessPreview />
        </Suspense>
      </Reveal>
      <Reveal>
        <CommunityPreview />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <StudentBenefits />
      </Reveal>
      <Reveal>
        <PopularCategories />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <TrustSection />
      </Reveal>
      <Reveal>
        <FAQSection />
      </Reveal>
      <CtaBanner />
    </>
  )
}

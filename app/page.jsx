import { Suspense } from 'react'
import CategoryGrid from '../components/home/CategoryGrid'
import CtaBanner from '../components/home/CtaBanner'
import FeaturedListings, {
  FeaturedListingsSkeleton,
} from '../components/home/FeaturedListings'
import Hero from '../components/home/Hero'
import Testimonials from '../components/home/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Suspense fallback={<FeaturedListingsSkeleton />}>
        <FeaturedListings />
      </Suspense>
      <Testimonials />
      <CtaBanner />
    </>
  )
}

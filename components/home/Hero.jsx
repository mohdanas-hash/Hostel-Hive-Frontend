'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { placeholderCategories } from '../../data/placeholderListings'
import { buildExploreQueryString, CATEGORY_TYPE_MAP } from '../../lib/listings'
import SearchAutocomplete from '../search/SearchAutocomplete'
import HeroIllustration from './HeroIllustration'

const easeOutCubic = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, y: -22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
}

const headlineVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeOutCubic,
    },
  },
}

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
}

const reducedContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState(
    placeholderCategories[0].id,
  )
  const [query, setQuery] = useState('')

  const activeContainerVariants = shouldReduceMotion
    ? reducedContainerVariants
    : containerVariants
  const activeBadgeVariants = shouldReduceMotion
    ? reducedItemVariants
    : badgeVariants
  const activeHeadlineVariants = shouldReduceMotion
    ? reducedItemVariants
    : headlineVariants
  const activeDescriptionVariants = shouldReduceMotion
    ? reducedItemVariants
    : descriptionVariants
  const activeFadeUpVariants = shouldReduceMotion
    ? reducedItemVariants
    : fadeUpVariants

  function handleSearchSubmit(event) {
    event.preventDefault()

    // The mock data has no "College" listings, so a college search has
    // nothing to filter on /explore — send it to the dedicated Colleges page
    // instead, carrying the typed query through as its own `q` filter there.
    if (activeCategory === 'colleges') {
      const trimmed = query.trim()
      router.push(trimmed ? `/colleges?q=${encodeURIComponent(trimmed)}` : '/colleges')
      return
    }

    const qs = buildExploreQueryString({
      q: query,
      type: CATEGORY_TYPE_MAP[activeCategory] ?? '',
      amenities: [],
      maxPrice: '',
      sort: 'relevance',
    })
    router.push(qs ? `/explore?${qs}` : '/explore')
  }

  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 0%, rgba(124,58,237,0.55), transparent), radial-gradient(45% 45% at 12% 105%, rgba(245,158,11,0.3), transparent), radial-gradient(35% 35% at 50% 0%, rgba(157,92,245,0.25), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={activeContainerVariants}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="text-center lg:text-left">
            <motion.div
              variants={activeBadgeVariants}
              className="inline-flex justify-center lg:justify-start"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.028, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(251, 191, 36, 0)',
                          '0 0 16px 2px rgba(251, 191, 36, 0.22)',
                          '0 0 0 0 rgba(251, 191, 36, 0)',
                        ],
                      }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
                Trusted by 12,000+ students across 40+ campuses
              </motion.span>
            </motion.div>

            <motion.h1
              variants={activeHeadlineVariants}
              className="font-display mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Find your home away from home,{' '}
              <span className="italic text-brand-400">sorted.</span>
            </motion.h1>

            <motion.p
              variants={activeDescriptionVariants}
              className="mx-auto mt-5 max-w-xl text-base text-ink-300 sm:text-lg lg:mx-0"
            >
              Discover and compare hostels, messes, cafeterias and colleges —
              backed by real reviews from real students.
            </motion.p>
          </div>

          <motion.div
            variants={activeFadeUpVariants}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <HeroIllustration className="aspect-[4/3] w-full" />
          </motion.div>
        </div>

        <motion.div
          variants={activeFadeUpVariants}
          className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-2 shadow-glow sm:p-3"
        >
          <div className="flex gap-1 overflow-x-auto px-2 pt-1 pb-3 sm:px-1">
            {placeholderCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  activeCategory === category.id
                    ? 'bg-brand-600 text-white'
                    : 'text-ink-500 hover:bg-ink-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <form
            className="flex flex-col gap-2 p-1 sm:flex-row"
            onSubmit={handleSearchSubmit}
          >
            <label htmlFor="hero-search" className="sr-only">
              Search by college, city or locality
            </label>
            <SearchAutocomplete
              id="hero-search"
              value={query}
              onChange={setQuery}
              placeholder="Search by college, city or locality"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Search
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={activeFadeUpVariants}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center text-white sm:gap-8"
        >
          {[
            ['2,400+', 'Verified listings'],
            ['12,000+', 'Student reviews'],
            ['40+', 'Campuses covered'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-extrabold sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs text-ink-300 sm:text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

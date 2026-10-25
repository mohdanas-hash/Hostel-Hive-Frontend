// SAMPLE / DEMO DATA ONLY.
// These are not real student accounts or real posts — they exist purely to
// demonstrate the Community page's UI. Nothing here is persisted to a
// backend: likes and any post created through the "Create Post" form only
// live in this browser tab's memory for the current session and are lost on
// refresh. Replace with real data-fetching once a community API exists.

export const COMMUNITY_CATEGORIES = [
  { id: 'all', label: 'All Discussions' },
  { id: 'hostel-life', label: 'Hostel Life' },
  { id: 'mess-food', label: 'Mess & Food' },
  { id: 'colleges', label: 'Colleges' },
  { id: 'roommates', label: 'Roommates' },
  { id: 'questions-advice', label: 'Questions & Advice' },
]

export const communityPosts = [
  {
    id: 'cp-1',
    authorName: 'Ananya R.',
    category: 'hostel-life',
    title: 'What do you wish you knew before moving into a hostel?',
    body: 'First week in my hostel and already learning a lot — bring your own bucket, and a power strip is non-negotiable. What’s the one thing you wish someone had told you?',
    sampleLabel: 'Sample post',
    likeCount: 24,
    commentCount: 9,
  },
  {
    id: 'cp-2',
    authorName: 'Rohit K.',
    category: 'mess-food',
    title: 'Mess food survival guide — what actually helped?',
    body: 'Rotating between two nearby messes has been a game changer for variety. Anyone found a good veg thali place near North Campus?',
    sampleLabel: 'Sample post',
    likeCount: 41,
    commentCount: 17,
  },
  {
    id: 'cp-3',
    authorName: 'Fatima S.',
    category: 'roommates',
    title: 'How do you split cleaning duties fairly with roommates?',
    body: 'We tried a rotating chart taped to the fridge and it actually stuck (pun intended). Curious what systems have worked for other shared rooms.',
    sampleLabel: 'Sample post',
    likeCount: 15,
    commentCount: 6,
  },
  {
    id: 'cp-4',
    authorName: 'Dev P.',
    category: 'questions-advice',
    title: 'Is it worth paying extra for an AC room?',
    body: 'Summers get brutal where I am. For those who upgraded, did it feel worth the extra monthly cost?',
    sampleLabel: 'Sample post',
    likeCount: 8,
    commentCount: 12,
  },
  {
    id: 'cp-5',
    authorName: 'Meera T.',
    category: 'colleges',
    title: 'Comparing hostel options near two campuses',
    body: 'Trying to decide between a PG closer to campus A versus a slightly cheaper one near campus B with a longer commute. How much did commute time end up mattering for you?',
    sampleLabel: 'Sample post',
    likeCount: 19,
    commentCount: 5,
  },
]

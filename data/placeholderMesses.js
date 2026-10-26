// PLACEHOLDER DATA — fallback only, used when the live /messes backend call
// fails (see app/messes/page.jsx). Shaped to match lib/api.js's mapMess()
// output so MessCard never needs to know whether data is real or sample.
// Always rendered behind an explicit "Demo data" banner — never silently
// substituted for a real listing.

export const placeholderMesses = [
  {
    id: 'ph-mess-1',
    name: 'Green Leaf Mess',
    type: 'Mess',
    locality: 'University Road',
    rating: null,
    reviews: null,
    priceFrom: 2800,
    priceUnit: 'month',
    amenities: ['Home Style', 'Monthly Plans'],
    imageUrl: null,
    foodType: 'veg',
    mealsPerDay: 2,
    hygieneRating: null,
  },
  {
    id: 'ph-mess-2',
    name: 'Spice Route Tiffin',
    type: 'Mess',
    locality: 'Near North Gate',
    rating: null,
    reviews: null,
    priceFrom: 3200,
    priceUnit: 'month',
    amenities: ['Home Delivery'],
    imageUrl: null,
    foodType: 'both',
    mealsPerDay: 3,
    hygieneRating: null,
  },
  {
    id: 'ph-mess-3',
    name: 'Campus Corner Kitchen',
    type: 'Mess',
    locality: 'Market Street',
    rating: null,
    reviews: null,
    priceFrom: 2500,
    priceUnit: 'month',
    amenities: ['Budget Friendly'],
    imageUrl: null,
    foodType: 'non_veg',
    mealsPerDay: 2,
    hygieneRating: null,
  },
]

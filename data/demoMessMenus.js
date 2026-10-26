// ILLUSTRATIVE SAMPLE MENUS ONLY.
// These are generic example meal plans, not real menus from any actual mess
// or tiffin provider. The backend's Mess record has no menu field at all —
// only food_type (veg/non_veg/both), monthly_price and meals_per_day — so a
// real per-provider menu cannot be shown. Every place this is used must
// carry a visible "Sample menu — illustrative, not verified with this
// provider" label; never imply this is a specific mess's actual, current
// menu. Picked deterministically per mess (by food type) so the same mess
// doesn't show a different sample menu on every render.

export const demoMessMenus = {
  veg: {
    breakfast: 'Poha or idli-sambar, tea/coffee',
    lunch: 'Dal, seasonal sabzi, rice, roti, salad',
    dinner: 'Paneer or mixed veg curry, rice, roti, curd',
  },
  non_veg: {
    breakfast: 'Bread omelette or paratha, tea/coffee',
    lunch: 'Chicken or egg curry, rice, roti, salad',
    dinner: 'Fish or mutton curry (rotational), rice, roti',
  },
  both: {
    breakfast: 'Poha/idli or egg bhurji, tea/coffee',
    lunch: 'Veg thali or chicken curry (alternating), rice, roti',
    dinner: 'Dal/paneer or non-veg curry (alternating), rice, roti',
  },
}

export function getSampleMenu(foodType) {
  return demoMessMenus[foodType] ?? demoMessMenus.both
}

# Hostel Hive — Frontend

Hostel Hive is a student-focused platform for discovering hostels, messes, cafeterias, colleges, and student community content. This repository contains the public-facing frontend built with Next.js.

> **Project status:** In development. The frontend integrates with the live, read-only Hostel Hive backend for listings and colleges. Some community content and prototype elements may still use sample data.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React
- **Styling:** Tailwind CSS
- **Linting:** Oxlint
- **Data:** REST API integration using native `fetch`

## Features

- **Explore listings:** Browse hostels, messes, and cafeterias.
- **Search and filters:** Search listings and filter or sort results.
- **Listing details:** View type-specific listing information and pricing.
- **College directory:** Browse colleges and filter by city.
- **Community:** Explore the community interface and its demo content.
- **Responsive UI:** Layouts designed for desktop and mobile screens.
- **Error handling:** Loading and error states, unavailable listings, and not-found pages.

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version
- npm

### Installation

Clone the repository and enter the project directory:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Hostel-Hive-Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Oxlint |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/explore` | Explore hostels, messes, and cafeterias |
| `/messes` | Mess discovery page |
| `/colleges` | College directory |
| `/community` | Student community interface |
| `/listings/[id]` | Listing detail pages |

## Backend Integration

The frontend currently uses the public, read-only API hosted at:

`https://hostel-hive-backend.onrender.com`

Integrated endpoints include:

- `GET /hostels`
- `GET /messes`
- `GET /cafeterias`
- `GET /colleges`
- Individual listing endpoints for hostel, mess, and cafeteria details

The frontend normalizes API responses for reusable listing components. Listing IDs are prefixed by type where necessary to avoid collisions between different listing categories.

### Data and filtering notes

- Explore fetches up to 100 records per listing category in a single request.
- Search, filtering, and sorting in Explore are performed client-side against the fetched dataset.
- The backend does not provide a total listing count in these list responses, so displayed results represent the fetched dataset rather than a guaranteed total.
- Ratings, review counts, images, and other optional fields are handled defensively when the API does not provide them.
- Placeholder data may remain for prototype or demo features.

## Project Structure

```text
Hostel-Hive-Frontend/
├── app/                  # App Router pages, layouts and route states
├── components/           # Reusable UI and feature components
├── data/                 # Placeholder or demo data
├── lib/                  # API integration and listing utilities
├── public/                # Static assets
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

## Development Notes

- This repository is for the **public-facing frontend only**.
- Backend source code and the admin dashboard are maintained separately.
- Only the verified read-only listing endpoints are integrated in the current implementation.
- Authentication, bookings, subscriptions, and payment processing are not represented as completed features.
- Production deployment, domain-specific SEO configuration, and production CORS verification remain subject to further review.

## License

No license has been specified yet. All rights are reserved by default unless a license is added to this repository.

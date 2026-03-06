# Iraq Compass Unified Platform

A production-ready frontend architecture for Iraq's premier event discovery system.

## Architecture Overview

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4.0
- **State Management:** Pinia
- **Routing:** Vue Router
- **Icons:** Lucide Vue Next
- **Multilingual:** Custom i18n implementation (EN, AR, KU)

## Folder Structure

- `src/components`: Reusable UI components (Navbar, EventCard, etc.)
- `src/views`: Page-level components (Home, Events, Dashboard, etc.)
- `src/store`: Global state management for events and user preferences
- `src/router`: Navigation configuration
- `src/locales`: Translation files for English, Arabic, and Kurdish
- `src/mock-data`: JSON-based backend simulation

## Backend Integration Plan (Phase 12)

The current architecture is designed for seamless migration to a real backend:

1. **Service Layer:** Create a `src/services` directory to handle API calls using `axios` or `fetch`.
2. **Authentication:** Integrate Firebase Auth or Supabase Auth. The `Navbar` and `Dashboard` are already prepared for user roles.
3. **Database:** 
   - **Firestore/Supabase:** Map the JSON structures in `mock-data` directly to collections/tables.
   - **Real-time:** Use `onSnapshot` (Firebase) or `realtime` (Supabase) to update the Pinia store.
4. **Media:** Replace `picsum.photos` with Cloud Storage (Firebase Storage or AWS S3).

## Deployment (Vercel)

1. Go to `vercel.com` and click **New Project**.
2. Import repository: `awatattor-alt/combine-event-managment`.
3. Confirm framework preset is **Vite** (auto-detected).
4. Set build command to `npm run build`.
5. Set output directory to `dist`.
6. Add environment variables:
   - `VITE_SUPABASE_URL=https://placeholder.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=placeholder_key_replace_later`
7. Click **Deploy**.
8. Test the live URL on both desktop and mobile.

`vercel.json` is already configured with an SPA rewrite to `index.html` so deep links work correctly.

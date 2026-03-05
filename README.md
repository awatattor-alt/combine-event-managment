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

## Deployment

This application is a static frontend and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

# Period Tracker Frontend

React + Vite frontend for the period tracker. It provides Google sign-in, period tracking, cycle history, trend visualization, prediction, and entry deletion.

## Features
- Google Sign-In via Firebase Auth
- Track period start date and duration
- Auto-refresh after successful track/delete actions
- View recent cycle history in a table
- Cycle chart with recent trend data
- Next period prediction panel
- Delete tracked entry with confirmation popup
- Mobile-first responsive interface

## Tech Stack
- React 18
- Vite 4
- Material UI
- Firebase JS SDK
- Axios
- Chart.js + react-chartjs-2
- Day.js

## Project files
- `src/App.jsx` — app shell and main dashboard layout
- `src/components/AuthProvider.jsx` — Firebase auth provider
- `src/components/LoginButton.jsx` — Google sign-in UI
- `src/components/PeriodForm.jsx` — tracking form
- `src/components/HistoryList.jsx` — history table and delete dialog
- `src/components/CycleChart.jsx` — chart widget
- `src/components/PredictionBox.jsx` — next prediction panel
- `src/api/axios.js` — API client with Firebase bearer token injection
- `src/firebase.js` — Firebase browser config and auth initialization

## Local development
1. Install dependencies:
   - `npm install`
2. Start the app:
   - `npm run dev`
3. Open the local app in the browser:
   - `http://localhost:5173`

## Environment variables
The frontend uses the browser-exposed environment variable:
- `VITE_API_URL`

Example:
- `VITE_API_URL=http://localhost:8081/api`

For deployed app:
- `VITE_API_URL=https://your-backend-render-url/api`

Important:
- `VITE_*` variables are public and visible to the browser
- Only public URLs should be stored there
- Never place secrets in frontend environment variables

## Firebase configuration
The frontend uses a Firebase browser config stored in:
- `src/firebase.js`

This config is public by design and is required for Google sign-in. The configured `authDomain` must be allowed in Firebase Authentication > Settings > Authorized domains.

For deployment, the domain must be added there, for example:
- `your-app.vercel.app`
- `localhost` for local development

## API integration
The frontend sends the Firebase token with every request through the Axios interceptor in:
- `src/api/axios.js`

The app calls these backend endpoints:
- `POST /api/cycles/track`
- `GET /api/cycles/recent`
- `GET /api/cycles/predict`
- `DELETE /api/cycles/{id}`

## Latest app behavior
The current frontend includes:
- success banner after a cycle is tracked
- automatic reset of the date picker to today after success
- chart Y-axis restricted to `24-32` days
- chart labels formatted as `DD/MM`
- delete icon in each cycle row with confirmation modal
- post-delete and post-track automatic refresh of history, chart, and prediction components

## Deployment guidance
For free-tier deployment:
- Frontend: Vercel
- Backend: Render
- Database: Neon or Supabase

Recommended configuration:
- Set `VITE_API_URL` in Vercel to your deployed backend URL
- Ensure the deployed frontend domain is whitelisted in Firebase Authentication
- Keep backend secrets and database credentials only on the backend side

## Credits
- Made with ❤️ by Ridam with Cursor & GitHub Copilot
- Use the App here - https://period-tracker-ashen.vercel.app/
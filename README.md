# LunaFlow Frontend

React + Vite frontend for LunaFlow, a cycle-care app for tracking periods, understanding cycle patterns, and planning ahead with clear, non-diagnostic estimates.

## Features
- Informative LunaFlow landing/login page with feature highlights, first-use guidance, prediction expectations, and menstrual-health awareness notes
- Google Sign-In via Firebase Auth
- Track period start date and duration
- Success and error feedback for tracking actions
- Automatic reset of the date picker after a successful entry
- Auto-refresh after successful track/delete actions
- View recent cycle history in a responsive table
- Delete tracked entries with a confirmation dialog and ownership-protected backend request
- Cycle chart with recent trend data, activated after at least 3 period records
- Next expected period prediction
- Estimated ovulation date prediction
- Fertile window prediction range
- Future month/year cycle phase forecast
- Monthly menstruation, follicular, ovulation, and luteal phase ranges
- Minimum-data guidance when fewer than 3 period dates are available
- No-data dashboard state that keeps only the Track Your Period section visible
- Responsive mobile-first layout for dashboard, tables, charts, forms, and forecast cards
- Vibrant LunaFlow visual identity with glass-style surfaces, gradients, hover states, and expressive typography
- Light and dark themes with dark mode as the first-visit default
- Theme toggle available on both the landing page and authenticated dashboard
- Theme preference persisted in `localStorage` across login and dashboard views

## Tech Stack
- React 18
- Vite 4
- Material UI
- Firebase JS SDK
- Axios
- Chart.js + react-chartjs-2
- Day.js

## Project files
- `src/App.jsx` — app shell, theme system, branding, dashboard layout, and section visibility rules
- `src/components/AuthProvider.jsx` — Firebase auth provider
- `src/components/LoginButton.jsx` — informative landing page, Google sign-in UI, and login theme toggle
- `src/components/PeriodForm.jsx` — tracking form
- `src/components/HistoryList.jsx` — responsive history table and delete dialog
- `src/components/CycleChart.jsx` — cycle trend chart and three-record lock state
- `src/components/PredictionBox.jsx` — prediction panel showing next period, ovulation, and fertile window
- `src/components/FutureCyclePrediction.jsx` — month/year picker and future phase forecast
- `index.html` — browser metadata, theme color, and LunaFlow font loading
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
- `GET /api/cycles/predict/month?month=YYYY-MM`
- `DELETE /api/cycles/{id}`

The monthly forecast request uses the selected month in `YYYY-MM` format. Prediction and chart requests use the authenticated Firebase bearer token automatically added by the Axios interceptor.

## Latest app behavior
The current frontend includes:
- success banner after a cycle is tracked
- automatic reset of the date picker to today after success
- chart Y-axis restricted to `24-32` days
- chart labels formatted as `DD/MM`
- delete icon in each cycle row with confirmation modal
- post-delete and post-track automatic refresh of history, chart, and prediction components
- when there are no period records, only the Track Your Period section is shown
- cycle history, chart, and prediction sections appear after the first tracked record
- cycle chart and prediction features show an unlock message until at least 3 period dates are recorded
- prediction panel showing next expected period, estimated ovulation date, and fertile window range
- premium glass-style visual polish across cards, tables, and dashboard sections
- future monthly forecast showing menstruation, follicular, ovulation, and luteal phases
- forecast disclaimer: `Subject to normal physical and mental health.`
- landing page presents LunaFlow features, setup guidance, estimate limitations, and menstrual-health safety information before sign-in
- dark mode is selected by default when no theme preference exists
- switching themes on either landing or dashboard persists the choice for future visits

## Prediction behavior
- Current predictions use the average cycle length from recent recorded period dates.
- The future monthly forecast uses the latest 4 cycle records and their average cycle length and period duration.
- The month/year picker requests a forecast in `YYYY-MM` format and displays only phase ranges overlapping the selected month.
- Predictions and the cycle chart require at least 3 recorded period dates.
- The interface displays `Record at least the last 3 period dates to unlock predictions.` when prediction data is unavailable because the minimum has not been reached.

## User flow
1. Open LunaFlow and review the feature and health-awareness information on the landing page.
2. Sign in with Google.
3. Record the first day of the latest period and its duration.
4. Continue recording period dates to unlock history insights, the cycle chart, and predictions.
5. After at least 3 period records, view current estimates and select a future month to explore expected cycle phases.

## Health and privacy notes
- Predictions are estimates based on recorded cycle history and are not medical advice.
- Cycle timing can vary with stress, illness, medication, and other physical or mental health changes.
- Users are advised to seek qualified medical support for severe pain, unusually heavy bleeding, sudden major changes, or persistent concerns.
- Firebase authentication protects access to the user experience, while the frontend never stores backend secrets.

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
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTripPage from './create-trip/index.tsx'
import Header from './components/Header.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import TripPage from './view-trip/[tripid]/index.tsx'
import MyTripsPage from './my-trips/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTripPage />
  },
  {
    path: '/my-trips',
    element: <MyTripsPage />
  },
  {
    path: '/view-trip/:tripid',
    element: <TripPage />
  },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGE_OAUTH_CLIENT_ID}>
      <Header />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)

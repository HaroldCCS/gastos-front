import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import LandingStaff from './landing/staff/LandingStaff'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<LandingStaff><NotFoundPage /></LandingStaff>} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<LandingStaff><HomePage /></LandingStaff>} />
            </Routes>
        </Router>
    )
}

export default RootComponent

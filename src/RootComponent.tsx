import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//PAGES
import HomePage from './pages/home/home.page'
import NotFoundPage from './pages/not_found/not_found.page'
import PersonalPage from './pages/personal/personal.page'

import { ROUTES } from './resources/routes-constants'

//Layouts
import StaffLayout from './layouts/staff/staff.layout'

import Home from './modules/home/view/home.view.component'

import './styles/variables.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<StaffLayout><NotFoundPage /></StaffLayout>} />

                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StaffLayout><HomePage /></StaffLayout>} />
                <Route path={ROUTES.HOMEPAGE_HOME_ROUTE} element={<StaffLayout><Home /></StaffLayout>} />

                <Route path={ROUTES.PERSONALPAGE_ROUTE} element={<StaffLayout><PersonalPage /></StaffLayout>} />
            </Routes>
        </Router>
    )
}

export default RootComponent

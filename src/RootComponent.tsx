import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//PAGES

import { ROUTES } from './resources/routes-constants'

//Layouts
import AnonymousLayout from 'layouts/anonymous/staff.layout'
import StaffLayout from './layouts/staff/staff.layout'

import Home from './modules/home/view/home.view.component'
import { HomePage, NotFoundPage, PersonalFinancePage, LoginPage } from './pages'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<StaffLayout><NotFoundPage /></StaffLayout>} />
                <Route path="/" element={<Navigate to={ROUTES.HOMEPAGE_ROUTE} replace />} />

                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StaffLayout><HomePage /></StaffLayout>} />
                <Route path={ROUTES.HOMEPAGE_HOME_ROUTE} element={<StaffLayout><Home /></StaffLayout>} />

                <Route path={ROUTES.PERSONALPAGE_ROUTE} element={<StaffLayout><PersonalFinancePage /></StaffLayout>} />

                <Route path={ROUTES.LOGIN} element={<AnonymousLayout><LoginPage /></AnonymousLayout>} />
            </Routes>
        </Router>
    )
}

export default RootComponent

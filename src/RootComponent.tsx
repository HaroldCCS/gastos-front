import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

//PAGES

import { ROUTES } from './resources/routes-constants'

//Layouts
import AnonymousLayout from 'layouts/anonymous/staff.layout'
import StaffLayout from './layouts/staff/staff.layout'

import Home from './modules/home/view/home.view.component'
import { HomePage, NotFoundPage, PersonalFinancePage, LoginPage, CreditPage } from './pages'
import PrivateRoute from './components/auth/auth';
import PrivateLoginRoute from './components/auth/login';
import ManageNotificationsPage from 'modules/personal/manageNotifications/manageNotifications.page'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTES.PRINCIPAL_PAGE_ROUTE} replace />} />

                {/* Rutas protegidas */}
                <Route element={<PrivateRoute />}>
                    <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StaffLayout><HomePage /></StaffLayout>} />
                    <Route path={ROUTES.HOMEPAGE_HOME_ROUTE} element={<StaffLayout><Home /></StaffLayout>} />
                    <Route path={ROUTES.PERSONALPAGE_ROUTE} element={<StaffLayout><PersonalFinancePage /></StaffLayout>} />
                    <Route path={ROUTES.CREDITS_PAGE_ROUTE} element={<StaffLayout><CreditPage /></StaffLayout>} />
                    <Route path={ROUTES.NOTIFICATIONS_PAGE_ROUTE} element={<StaffLayout><ManageNotificationsPage /></StaffLayout>} />
                </Route>
                <Route path="*" element={<StaffLayout><NotFoundPage /></StaffLayout>} />

                {/* Ruta de inicio de sesión */}
                <Route element={<PrivateLoginRoute />}>
                    <Route path={ROUTES.LOGIN} element={<AnonymousLayout><LoginPage /></AnonymousLayout>} />
                </Route>

            </Routes>
        </Router>
    );
};

export default RootComponent

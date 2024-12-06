import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import LandingPage from "@/app/landing/page.tsx";
import LoginPage from "./app/login/page";
import HomePage from './app/home/page';
import ConfirmUserPage from './app/confirm/page';
import './App.css'
import DashboardPage from "@/app/dashboard/page.tsx";
import CasesPage from "@/app/cases/page.tsx";
import PrivacyPage from "@/app/privacy/page.tsx";
import SupportPage from "@/app/support/page.tsx";
import CaseDetails from "@/app/cases/CaseDetails.tsx";
import CaseNew from "@/app/cases/CaseNew.tsx";
import RootLayout from "@/layouts/RootLayout";
import CaseEdit from "@/app/cases/CaseEdit.tsx";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = () => {
        const accessToken = sessionStorage.getItem('accessToken');
        console.log('isAuthenticated', !!accessToken);
        return !!accessToken;
    };
    const location = useLocation();
    const isLoginPath = location.pathname.includes('login');

    return isAuthenticated() ? children : (isLoginPath ? <LoginPage/> : <Navigate to="/login" replace />);
};

const App = () => {
    return (
        <RootLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<PrivateRoute><Navigate replace to="/home" /></PrivateRoute>} />
                    <Route path="/confirm" element={<ConfirmUserPage />} />
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/cases" element={<PrivateRoute><CasesPage /></PrivateRoute>} />
                    <Route path="/cases/:id" element={<PrivateRoute><CaseDetails /></PrivateRoute>} />
                    <Route path="/cases/new" element={<PrivateRoute><CaseNew /></PrivateRoute>} />
                    <Route path="/cases/edit/:id" element={<PrivateRoute><CaseEdit /></PrivateRoute>} />
                    <Route path="/privacy" element={<PrivateRoute><PrivacyPage /></PrivateRoute>} />
                    <Route path="/support" element={<PrivateRoute><SupportPage /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </RootLayout>
    );
};

export default App;
import { Route } from 'react-router';
import { RegisterPage } from '../../pages/RegisterPage';
import { Routes } from 'react-router';
import { LoginPage } from '../../pages/LoginPage';
import { ForgotPasswordPage } from '../../pages/ForgotPassword';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ConfigPage } from '../../pages/ConfigPage';

export function AuthRouter() {
    return (
        <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="ForgotPassword" element={<ForgotPasswordPage />} />
            <Route path="config" element={<ConfigPage />} />

            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}

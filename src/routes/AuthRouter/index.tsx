import { Route } from 'react-router';
import { RegisterPage } from '../../pages/RegisterPage';
import { Routes } from 'react-router';
import { LoginPage } from '../../pages/LoginPage';
import { ForgotPasswordPage } from '../../pages/ForgotPassword';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { HomePage } from '../../pages/HomePage';
import { AreaClientePage } from '../../pages/AreaCliente';

export function AuthRouter() {
    return (
        <Routes>
            <Route path="register" element={<RegisterPage />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="HomePage" element={<HomePage />}></Route>
            <Route
                path="ForgotPassword"
                element={<ForgotPasswordPage />}
            ></Route>
            <Route path="AreaCliente" element={<AreaClientePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
}

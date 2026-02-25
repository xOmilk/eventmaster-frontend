import { BrowserRouter, Route, Routes } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { HomePage } from '../../pages/HomePage';
import { AuthRouter } from '../AuthRouter';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ManageOrganizers } from '../../pages/ManageOrganizers';
import EventDetailsPage from '../../pages/EventDetails/EventDetailsPage';
import { Checkout } from '../../pages/Checkout';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={PageRoutesName.home}
                    element={<HomePage />}
                ></Route>

                <Route path="/auth/*" element={<AuthRouter />}></Route>

                <Route path="*" element={<NotFoundPage />}></Route>

                <Route path="/gerOrganizadores" element={<ManageOrganizers onBack={() => window.history.back()} />}></Route>

                <Route path="/event-details" element={<EventDetailsPage />}></Route>

                <Route path="/checkout" element={<Checkout />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

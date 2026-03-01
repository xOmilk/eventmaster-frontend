import { Route, Routes } from 'react-router';
import { SejaOrganizadorPage } from '../../pages/SejaOrganizador';
import { AreaClientePage } from '../../pages/AreaCliente';
import EventDetailsPage from '../../pages/EventDetails/EventDetailsPage';
import { Checkout } from '../../pages/Checkout';

export function ClientRouter() {
    return (
        <Routes>
            {/* AREA COMUM DO CLIENTE */}
            <Route path="areaCliente" element={<AreaClientePage />}></Route>

            <Route
                path="eventDetail/:id"
                element={<EventDetailsPage />}
            ></Route>
            <Route path="checkout/:id" element={<Checkout />}></Route>

            {/* ROTA PARA SE TORNAR UM ORGANIZADOR */}
            <Route
                path="sejaOrganizador"
                element={<SejaOrganizadorPage />}
            ></Route>
        </Routes>
    );
}

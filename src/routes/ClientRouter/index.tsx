import { Route, Routes } from 'react-router';
import { SejaOrganizadorPage } from '../../pages/SejaOrganizador';
import { AreaClientePage } from '../../pages/AreaCliente';
import { InfoEventoPage } from '../../pages/InfoEvento';
import { Checkout } from '../../pages/Checkout';

export function ClientRouter() {
    return (
        <Routes>
            {/* AREA COMUM DO CLIENTE */}
            <Route path="areaCliente" element={<AreaClientePage />}></Route>

            {/* 👇 Adicionamos o /:id para a página saber qual evento carregar */}
            <Route path="infoEvento/:id" element={<InfoEventoPage />}></Route>
            <Route path="checkout/:id" element={<Checkout />}></Route>

            {/* ROTA PARA SE TORNAR UM ORGANIZADOR */}
            <Route
                path="sejaOrganizador"
                element={<SejaOrganizadorPage />}
            ></Route>
        </Routes>
    );
}

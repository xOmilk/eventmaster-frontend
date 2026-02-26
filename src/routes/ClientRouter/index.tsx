import { Route, Routes } from 'react-router';
import { SejaOrganizadorPage } from '../../pages/SejaOrganizador';
import { AreaClientePage } from '../../pages/AreaCliente';

export function ClientRouter() {
    return (
        <Routes>
            {/* AREA COMUM DO CLIENTE */}
            <Route path="areaCliente" element={<AreaClientePage />}></Route>

            {/* ROTA PARA SE TORNAR UM ORGANIZADOR */}
            <Route
                path="sejaOrganizador"
                element={<SejaOrganizadorPage />}
            ></Route>
        </Routes>
    );
}

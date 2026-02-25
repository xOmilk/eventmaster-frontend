import { Route, Routes } from 'react-router';
import { ManageOrganizers } from '../../pages/ManageOrganizers';
import { SejaOrganizadorPage } from '../../pages/SejaOrganizador';

export function OrganizerRouter() {
    return (
        <Routes>
            <Route
                path="getOrganizers"
                element={
                    <ManageOrganizers onBack={() => window.history.back()} />
                }
            ></Route>

            {/* ROTA PARA SE TORNAR UM ORGANIZADOR */}
            <Route
                path="SejaOrganizador"
                element={<SejaOrganizadorPage />}
            ></Route>
        </Routes>
    );
}

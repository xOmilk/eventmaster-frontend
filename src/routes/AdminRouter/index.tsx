import { Route, Routes } from 'react-router';
import { ManageOrganizers } from '../../pages/ManageOrganizers';

export function AdminRouter() {
    return (
        <Routes>
            {/* ROTA PARA MANIPULAR OS ORGANIZADORES */}
            <Route
                path="getOrganizers"
                element={
                    <ManageOrganizers onBack={() => window.history.back()} />
                }
            ></Route>
        </Routes>
    );
}

import { Route, Routes, useNavigate } from 'react-router';
import { OrganizerDashboard } from '../../pages/OrganizerDashboard';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { useEffect } from 'react';
import { notify } from '../../adapters/toastHotAdapter';
import PageRoutesName from '../../constants/PageRoutesName';
import { useGetMe } from '../../hooks/useGetMe';

export function OrganizerRouter() {
    const navigate = useNavigate();
    const { data: user } = useGetMe();

    useEffect(() => {
        if (user?.role !== 'organizer') {
            notify.warning('Você não possui acesso a essa página!');
            navigate(PageRoutesName.home);
        }
    }, [user]);

    return (
        <Routes>
            {/* Rota principal: Apenas o Dashboard */}
            <Route index element={<OrganizerDashboard />} />

            {/* ROTA PARA PAGINAS QUE NAO EXISTEM DENTRO DA AREA DE CLIENTE */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

import { Route, Routes, useNavigate } from 'react-router';
import { StaffCheckIn } from '../../pages/StaffCheckIn';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { useEffect } from 'react';
import { notify } from '../../adapters/toastHotAdapter';
import PageRoutesName from '../../constants/PageRoutesName';
import { useGetMe } from '../../hooks/useGetMe';

export function StaffRouter() {
    const navigate = useNavigate();

    const { data: user } = useGetMe();

    useEffect(() => {
        if (user?.role !== 'staff') {
            notify.warning('Você não possui acesso a essa página!');
            navigate(PageRoutesName.home);
        }
    }, [user]);
    return (
        <Routes>
            {/* A página principal do staff é o check-in */}
            <Route
                index
                element={<StaffCheckIn onBack={() => navigate('/')} />}
            />

            {/* ROTA PARA PAGINAS QUE NAO EXISTEM DENTRO DA AREA DE STAFF */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

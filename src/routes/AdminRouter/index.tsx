import { Route, Routes, useNavigate } from 'react-router';
import { AdminDashboardPage } from '../../pages/AdminDashboard';
import { ApproveEventsPage } from '../../pages/ApproveEvents';
import { AdminComissoesPage } from '../../pages/AdminComissoes';
import { ManageOrganizersPage } from '../../pages/ManageOrganizersPage';
import { GlobalReports } from '../../pages/GlobalReports';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { useEffect } from 'react';
import { notify } from '../../adapters/toastHotAdapter';
import PageRoutesName from '../../constants/PageRoutesName';
import { useGetMe } from '../../hooks/useGetMe';

export function AdminRouter() {
    const navigate = useNavigate();
    const { data: user } = useGetMe();

    useEffect(() => {
        if (user?.role !== 'admin') {
            notify.warning('Você não possui acesso a essa página!');
            navigate(PageRoutesName.home);
        }
    }, [user]);

    return (
        <Routes>
            <Route
                path="getorganizers"
                element={
                    <ManageOrganizersPage
                        onBack={() => window.history.back()}
                    />
                }
            />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="approveEvents" element={<ApproveEventsPage />} />
            <Route
                path="comissoes"
                element={
                    <AdminComissoesPage onBack={() => window.history.back()} />
                }
            />
            <Route
                path="relatorio"
                element={<GlobalReports onBack={() => window.history.back()} />}
            />

            <Route index element={<AdminDashboardPage />} />
            <Route path="panel" element={<AdminDashboardPage />} />
            <Route path="approve-events" element={<ApproveEventsPage />} />
            {/* ROTA PARA MANIPULAR OS ORGANIZADORES */}
            <Route
                path="get-organizers"
                element={
                    <ManageOrganizersPage
                        onBack={() => window.history.back()}
                    />
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

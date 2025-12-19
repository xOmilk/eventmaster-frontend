import {
    Building2Icon,
    HouseIcon,
    LayoutDashboardIcon,
    LogInIcon,
    LucideQrCode,
    LucideShoppingBag,
    TicketIcon,
} from 'lucide-react';

import styles from './styles.module.css';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { getLocalStorageRole } from '../../utils/localStorageRole';

export function Header() {
    const navigate = useNavigate();

    const isUsuario = getLocalStorageRole() === 'USUARIO';
    const isOrganizador = getLocalStorageRole() === 'ORGANIZADOR';
    const isStaff = getLocalStorageRole() === 'STAFF';
    const isAdmin = getLocalStorageRole() === 'ADMIN';

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarContainerWrapper}>
                <div className={styles.navbarSections}>
                    <div className={styles.navbarFirstSection}>
                        <button
                            className={styles.applicationArea}
                            onClick={() => {
                                navigate(PageRoutesName.home);
                            }}
                        >
                            <TicketIcon
                                strokeWidth={2}
                                color="var(--color-indigo-600)"
                            />
                            <span>EventMaster</span>
                        </button>
                        <div
                            style={{
                                display: 'flex',
                                justifyItems: 'center',
                                gap: '2rem',
                            }}
                            className="hidden md:flex items-center gap-4"
                        >
                            <button
                                className={styles.itemNavbar}
                                onClick={() => {
                                    navigate(PageRoutesName.home);
                                }}
                            >
                                <HouseIcon
                                    width={24}
                                    height={24}
                                    strokeWidth={2}
                                    color="var(--color-black)"
                                />
                                Eventos
                            </button>
                            {/* CASO A PESSOA SEJA USUARIO */}
                            {isUsuario && (
                                <>
                                    <button
                                        className={`${styles.itemNavbar}  ${styles.clientArea}`}
                                    >
                                        <LucideShoppingBag
                                            width={24}
                                            height={24}
                                            strokeWidth={2}
                                            color="var(--color-black)"
                                        />
                                        Área do Cliente
                                        <span className={styles.badge}>3</span>
                                    </button>
                                </>
                            )}
                            {/* CASO NAO SEJA NENHUM CARGO DE IMPORTANCIA */}
                            {!isOrganizador && !(isStaff || isAdmin) && (
                                <button
                                    className={`${styles.itemNavbar} ${styles.beAnOrganizer}`}
                                >
                                    <Building2Icon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Seja Organizador
                                </button>
                            )}
                            {/* CASO O INDIVIDUO SEJA ORGANIZADOR */}
                            {isOrganizador && (
                                <button className={`${styles.itemNavbar} `}>
                                    <Building2Icon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Meus Eventos
                                </button>
                            )}
                            {/* CASO O INDIVIDUO SEJA ADMIN */}
                            {isAdmin && (
                                <button className={`${styles.itemNavbar} `}>
                                    <LayoutDashboardIcon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Painel Admin
                                </button>
                            )}
                            {/* CASO O INDIVIDUO SEJA STAFF */}
                            {isStaff && (
                                <button className={`${styles.itemNavbar} `}>
                                    <LucideQrCode
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Check-in
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            styles.applicationArea || 'flex items-center gap-3'
                        }
                    >
                        <button
                            className={styles.authButton}
                            onClick={() => {
                                navigate(PageRoutesName.auth.register);
                            }}
                        >
                            <LogInIcon
                                width={24}
                                height={24}
                                strokeWidth={2}
                                color="var(--color-white)"
                            />
                            Entrar / Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

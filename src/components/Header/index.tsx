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
import { useLocation, useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import { removeUserDataLocalStorage } from '../../utils/removeUserData';
import { getUserRoleTextInformation } from '../../utils/getUserRoleTextInformation';

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const isLoggedOut = getLocalStorageRole() === null;
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
                            <span className={styles.title}>EventMaster</span>
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
                                className={`${styles.itemNavbar} ${isActive(PageRoutesName.home) ? styles.active : ''}`}
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
                                        className={`${styles.itemNavbar} ${styles.clientArea} ${isActive(PageRoutesName.auth.areaCliente) ? styles.active : ''}`}
                                        onClick={() => {
                                            navigate(
                                                PageRoutesName.auth.areaCliente
                                            );
                                        }}
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
                                    className={`${styles.itemNavbar} ${styles.beAnOrganizer} `}
                                    onClick={() => {
                                        navigate(
                                            PageRoutesName.organizador
                                                .sejaOrganizador
                                        );
                                    }}
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
                        {getLocalStorageRole() && (
                            <div className={styles.roleUserContainer}>
                                <span className={styles.roleUserText}>
                                    Visualizando como
                                </span>{' '}
                                <span className={styles.roleUser}>
                                    {getUserRoleTextInformation()}
                                </span>
                            </div>
                        )}
                        <button
                            className={styles.authButton}
                            onClick={() => {
                                if (isLoggedOut) {
                                    navigate(PageRoutesName.auth.register);
                                } else {
                                    removeUserDataLocalStorage();
                                    if (
                                        location.pathname ===
                                        PageRoutesName.home
                                    ) {
                                        window.location.reload();
                                    } else {
                                        navigate(PageRoutesName.home);
                                    }
                                }
                            }}
                        >
                            <LogInIcon
                                width={24}
                                height={24}
                                strokeWidth={2}
                                color="var(--color-white)"
                            />
                            {isLoggedOut ? (
                                <p>Entrar / Cadastrar</p>
                            ) : (
                                <p>Sair</p>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

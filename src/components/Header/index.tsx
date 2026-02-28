import { useState } from 'react';
import {
    Building2Icon,
    HouseIcon,
    LayoutDashboardIcon,
    LogInIcon,
    LucideQrCode,
    LucideShoppingBag,
    SettingsIcon,
    TicketIcon,
    Menu,
    X,
} from 'lucide-react';

import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { getLocalStorageRole } from '../../utils/localStorageRole';
import { removeUserDataLocalStorage } from '../../utils/removeUserData';
import { getUserRoleTextInformation } from '../../utils/getUserRoleTextInformation';
import { notify } from '../../adapters/toastHotAdapter';

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const isLoggedOut = getLocalStorageRole() === null;
    const isUsuario = getLocalStorageRole() === 'USUARIO';
    const isOrganizador = getLocalStorageRole() === 'ORGANIZADOR';
    const isStaff = getLocalStorageRole() === 'STAFF';
    const isAdmin = getLocalStorageRole() === 'ADMIN';

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarContainerWrapper}>
                <div className={styles.navbarSections}>
                    <div className={styles.navbarHeader}>
                        <button
                            className={styles.applicationArea}
                            onClick={() =>
                                handleNavigation(PageRoutesName.home)
                            }
                        >
                            <TicketIcon
                                strokeWidth={2}
                                color="var(--color-indigo-600)"
                            />
                            <span className={styles.title}>EventMaster</span>
                        </button>

                        <button
                            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.openIcon : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X
                                    width={28}
                                    height={28}
                                    color="var(--color-black)"
                                />
                            ) : (
                                <Menu
                                    width={28}
                                    height={28}
                                    color="var(--color-black)"
                                />
                            )}
                        </button>
                    </div>

                    <div
                        className={`${styles.menuContainer} ${isMenuOpen ? styles.menuOpen : ''}`}
                    >
                        <div className={styles.menuItems}>
                            <button
                                className={`${styles.itemNavbar} ${isActive(PageRoutesName.home) ? styles.active : ''}`}
                                onClick={() =>
                                    handleNavigation(PageRoutesName.home)
                                }
                            >
                                <HouseIcon
                                    width={24}
                                    height={24}
                                    strokeWidth={2}
                                    color="var(--color-black)"
                                />
                                Eventos
                            </button>

                            {isUsuario && (
                                <button
                                    className={`${styles.itemNavbar} ${styles.clientArea} ${isActive(PageRoutesName.cliente.areaCliente) ? styles.active : ''}`}
                                    onClick={() =>
                                        handleNavigation(
                                            PageRoutesName.cliente.areaCliente
                                        )
                                    }
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
                            )}

                            {!isOrganizador && !(isStaff || isAdmin) && (
                                <button
                                    className={`${styles.itemNavbar} ${styles.beAnOrganizer}`}
                                    onClick={() =>
                                        handleNavigation(
                                            PageRoutesName.cliente
                                                .sejaOrganizador
                                        )
                                    }
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

                            {isOrganizador && (
                                <button className={`${styles.itemNavbar}`}>
                                    <Building2Icon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Meus Eventos
                                </button>
                            )}

                            {isAdmin && (
                                <button className={`${styles.itemNavbar}`}>
                                    <LayoutDashboardIcon
                                        width={24}
                                        height={24}
                                        strokeWidth={2}
                                        color="var(--color-black)"
                                    />
                                    Painel Admin
                                </button>
                            )}

                            {isStaff && (
                                <button className={`${styles.itemNavbar}`}>
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

                        <div className={styles.navbarSecondSection}>
                            {getLocalStorageRole() && (
                                <>
                                    <button
                                        className={`${styles.itemNavbar}`}
                                        onClick={() =>
                                            handleNavigation(
                                                PageRoutesName.auth.userConfig
                                            )
                                        }
                                    >
                                        <SettingsIcon
                                            className={styles.configIcon}
                                            strokeWidth={2}
                                        />
                                        <span>Configurações</span>
                                    </button>

                                    <div className={styles.roleUserContainer}>
                                        <span className={styles.roleUserText}>
                                            Visualizando como
                                        </span>
                                        <span className={styles.roleUser}>
                                            {getUserRoleTextInformation()}
                                        </span>
                                    </div>
                                </>
                            )}
                            <button
                                className={styles.authButton}
                                onClick={() => {
                                    if (isLoggedOut) {
                                        handleNavigation(
                                            PageRoutesName.auth.login
                                        );
                                    } else {
                                        removeUserDataLocalStorage();
                                        handleNavigation(PageRoutesName.home);
                                        notify.success(
                                            'Você deslogou da sua conta.'
                                        );
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
            </div>
        </nav>
    );
}

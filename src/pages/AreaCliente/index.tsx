import {
    ArrowLeft,
    Ticket,
    History,
    Filter,
    Download,
    Calendar,
    CreditCard,
    Clock,
} from 'lucide-react';
import { useState } from 'react';
import styles from './style.module.css';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';

export function AreaClientePage() {
    const [activeTab, setActiveTab] = useState<'tickets' | 'history'>(
        'history'
    );
    const navigate = useNavigate();
    return (
        <DefaultLayout>
            <div className={styles.container}>
                {/* Botão Voltar */}
                <button
                    onClick={() => navigate('/')}
                    className={styles.backButton}
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>

                {/* Título */}
                <h1 className={styles.pageTitle}>Área do Cliente</h1>

                {/* Abas (Tabs) */}
                <div className={styles.tabsContainer}>
                    <button
                        onClick={() => setActiveTab('tickets')}
                        className={`${styles.tab} ${activeTab === 'tickets' ? styles.activeTab : ''}`}
                    >
                        <Ticket size={18} />
                        Meus Ingressos
                        <span className={styles.badgeCount}>1</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('history')}
                        className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
                    >
                        <History size={18} />
                        Histórico de Compras
                    </button>
                </div>

                {/* Subtítulo */}
                <p className={styles.subtitle}>
                    Acompanhe todas as suas compras e reembolsos
                </p>

                {/* Seção de Filtros */}
                <div className={styles.filtersCard}>
                    <div className={styles.filtersHeader}>
                        <Filter size={18} />
                        <strong>Filtros</strong>
                    </div>

                    <div className={styles.filtersRow}>
                        <div className={styles.inputGroup}>
                            <label>Status</label>
                            <select className={styles.selectInput}>
                                <option>Todos</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Forma de Pagamento</label>
                            <select className={styles.selectInput}>
                                <option>Todos</option>
                            </select>
                        </div>

                        <button className={styles.exportButton}>
                            <Download size={16} />
                            Exportar
                        </button>
                    </div>
                </div>

                {/* Card de Histórico (Exemplo da Foto) */}
                <div className={styles.historyCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.eventTitle}>
                            Festival de Música Eletrônica 2025
                        </h2>
                        <span className={styles.statusBadgeGreen}>
                            Confirmado
                        </span>
                    </div>

                    <div className={styles.eventInfo}>
                        <Calendar size={16} />
                        <span>14/12/2025</span>
                        <span className={styles.location}>
                            Estádio Nacional, São Paulo
                        </span>
                    </div>

                    <div className={styles.detailsGrid}>
                        {/* Coluna 1 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                ID da Compra
                            </span>
                            <span className={styles.detailValue}>PUR-001</span>
                        </div>
                        {/* Coluna 2 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Data da Compra
                            </span>
                            <span className={styles.detailValue}>
                                09/11/2025
                            </span>
                        </div>
                        {/* Coluna 3 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Tipo de Ingresso
                            </span>
                            <span className={styles.detailValue}>
                                Pista - Inteira
                            </span>
                        </div>
                        {/* Coluna 4 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Quantidade
                            </span>
                            <span className={styles.detailValue}>
                                2 ingresso(s)
                            </span>
                        </div>

                        {/* Linha 2 - Coluna 1 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Valor Unitário
                            </span>
                            <span className={styles.detailValue}>
                                R$ 150,00
                            </span>
                        </div>
                        {/* Linha 2 - Coluna 2 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Valor Total
                            </span>
                            <span className={styles.detailValue}>
                                R$ 300,00
                            </span>
                        </div>
                        {/* Linha 2 - Coluna 3 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Forma de Pagamento
                            </span>
                            <span className={styles.detailValueWithIcon}>
                                <CreditCard size={16} /> Cartão de Crédito
                            </span>
                        </div>
                        {/* Linha 2 - Coluna 4 */}
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                                Ingressos Utilizados
                            </span>
                            <span className={styles.detailValueWithIconWarning}>
                                <Clock size={16} /> Não utilizado
                            </span>
                        </div>
                    </div>

                    <div className={styles.cardActions}>
                        <button className={styles.outlineButton}>
                            Ver Ingressos
                        </button>
                        <button className={styles.outlineButton}>
                            <Download size={16} />
                            Baixar Comprovante
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

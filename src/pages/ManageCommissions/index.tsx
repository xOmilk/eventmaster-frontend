import { useState } from 'react';
import { ArrowLeft, Save, Info } from 'lucide-react';
import { toast } from 'sonner';
import styles from './styles.module.css';

interface CommissionSettings {
    defaultRate: number;
    musicEvents: number;
    theaterEvents: number;
    sportsEvents: number;
    conferenceEvents: number;
    minimumCommission: number;
    paymentProcessingFee: number;
}

export function ManageCommissions({ onBack }: { onBack: () => void }) {
    const [settings, setSettings] = useState<CommissionSettings>({
        defaultRate: 5,
        musicEvents: 5,
        theaterEvents: 4,
        sportsEvents: 6,
        conferenceEvents: 5,
        minimumCommission: 2,
        paymentProcessingFee: 3.5,
    });

    const [hasChanges, setHasChanges] = useState(false);

    const handleSave = () => {
        toast.success('Configurações de comissões salvas com sucesso!');
        setHasChanges(false);
    };

    const updateSetting = (key: keyof CommissionSettings, value: number) => {
        setSettings({ ...settings, [key]: value });
        setHasChanges(true);
    };

    // Cálculos de exemplo
    const exampleTicketPrice = 100;
    const calculateCommission = (rate: number) => {
        return (exampleTicketPrice * rate) / 100;
    };

    const totalPlatformFee =
        calculateCommission(settings.defaultRate) +
        (exampleTicketPrice * settings.paymentProcessingFee) / 100;

    return (
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={24} /> Voltar ao Dashboard
                </button>
                <h1 className={styles.pageTitle}>
                    Configurar Comissões da Plataforma
                </h1>
                <p className={styles.pageSubtitle}>
                    Defina as taxas e comissões aplicadas a cada tipo de evento
                </p>
            </div>

            <div className={styles.alert}>
                <Info size={28} className={styles.alertIcon} />
                <div>
                    As alterações nas taxas de comissão serão aplicadas apenas a{' '}
                    <strong>novos eventos</strong> criados após a data de
                    alteração. Eventos existentes manterão as taxas originais.
                </div>
            </div>

            <div className={styles.cardsGrid}>
                {/* Taxa Padrão */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            Taxa de Comissão Padrão
                        </h2>
                        <p className={styles.cardDescription}>
                            Taxa aplicada a todos os eventos que não possuem
                            configuração específica
                        </p>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label className={styles.label}>
                                    Taxa Padrão (%)
                                </label>
                                <span className={styles.valueBadge}>
                                    {settings.defaultRate}%
                                </span>
                            </div>
                            <input
                                type="range"
                                className={styles.slider}
                                min="0"
                                max="20"
                                step="0.5"
                                value={settings.defaultRate}
                                onChange={(e) =>
                                    updateSetting(
                                        'defaultRate',
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                            <div className={styles.sliderLimits}>
                                <span>0%</span>
                                <span>20%</span>
                            </div>
                        </div>

                        <div className={styles.exampleBox}>
                            <div className={styles.exampleTitle}>
                                Exemplo de cálculo:
                            </div>
                            <div className={styles.exampleRow}>
                                <span>Preço do ingresso:</span>
                                <strong className={styles.exampleValue}>
                                    R$ {exampleTicketPrice.toFixed(2)}
                                </strong>
                            </div>
                            <div className={styles.exampleRow}>
                                <span>Comissão ({settings.defaultRate}%):</span>
                                <strong className={styles.exampleValue}>
                                    R${' '}
                                    {calculateCommission(
                                        settings.defaultRate
                                    ).toFixed(2)}
                                </strong>
                            </div>
                            <div
                                className={`${styles.exampleRow} ${styles.divider}`}
                            >
                                <span>Organizador recebe:</span>
                                <strong className={styles.exampleValue}>
                                    R${' '}
                                    {(
                                        exampleTicketPrice -
                                        calculateCommission(
                                            settings.defaultRate
                                        )
                                    ).toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Taxas por Categoria */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            Comissões por Categoria de Evento
                        </h2>
                        <p className={styles.cardDescription}>
                            Configure taxas específicas para cada categoria de
                            evento
                        </p>
                    </div>
                    <div className={styles.cardContent}>
                        {[
                            {
                                key: 'musicEvents',
                                label: '🎵 Eventos de Música',
                                value: settings.musicEvents,
                            },
                            {
                                key: 'theaterEvents',
                                label: '🎭 Eventos de Teatro',
                                value: settings.theaterEvents,
                            },
                            {
                                key: 'sportsEvents',
                                label: '⚽ Eventos Esportivos',
                                value: settings.sportsEvents,
                            },
                            {
                                key: 'conferenceEvents',
                                label: '💼 Conferências e Workshops',
                                value: settings.conferenceEvents,
                            },
                        ].map((cat) => (
                            <div key={cat.key} className={styles.categoryItem}>
                                <div className={styles.categoryHeader}>
                                    <label className={styles.label}>
                                        {cat.label}
                                    </label>
                                    <input
                                        type="number"
                                        className={styles.inputNumber}
                                        value={cat.value}
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        onChange={(e) =>
                                            updateSetting(
                                                cat.key as keyof CommissionSettings,
                                                parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                </div>
                                <input
                                    type="range"
                                    className={styles.slider}
                                    min="0"
                                    max="20"
                                    step="0.5"
                                    value={cat.value}
                                    onChange={(e) =>
                                        updateSetting(
                                            cat.key as keyof CommissionSettings,
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Taxas Adicionais */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            Configurações Adicionais
                        </h2>
                        <p className={styles.cardDescription}>
                            Outras taxas e configurações da plataforma
                        </p>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.inputGroup}>
                            <label className={styles.labelBlock}>
                                Comissão Mínima (R$)
                            </label>
                            <input
                                type="number"
                                className={styles.inputFull}
                                value={settings.minimumCommission}
                                min="0"
                                step="0.5"
                                onChange={(e) =>
                                    updateSetting(
                                        'minimumCommission',
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                            <p className={styles.helperText}>
                                Valor mínimo de comissão cobrada por ingresso,
                                independente da taxa percentual
                            </p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.labelBlock}>
                                Taxa de Processamento de Pagamento (%)
                            </label>
                            <input
                                type="number"
                                className={styles.inputFull}
                                value={settings.paymentProcessingFee}
                                min="0"
                                max="10"
                                step="0.1"
                                onChange={(e) =>
                                    updateSetting(
                                        'paymentProcessingFee',
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                            <p className={styles.helperText}>
                                Taxa adicional para cobrir custos de gateway de
                                pagamento (cartão de crédito, PIX, etc.)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Resumo das Taxas */}
                <section className={`${styles.card} ${styles.summaryCard}`}>
                    <div className={styles.cardHeader}>
                        <h2
                            className={`${styles.cardTitle} ${styles.summaryTitle}`}
                        >
                            Resumo de Taxas Totais
                        </h2>
                        <p
                            className={`${styles.cardDescription} ${styles.summaryTitle}`}
                        >
                            Taxas totais aplicadas ao organizador (incluindo
                            processamento de pagamento)
                        </p>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.exampleRow}>
                            <span className={styles.summaryText}>
                                Comissão da Plataforma:
                            </span>
                            <span className={styles.summaryText}>
                                {settings.defaultRate}%
                            </span>
                        </div>
                        <div className={styles.exampleRow}>
                            <span className={styles.summaryText}>
                                Taxa de Processamento:
                            </span>
                            <span className={styles.summaryText}>
                                {settings.paymentProcessingFee}%
                            </span>
                        </div>
                        <div
                            className={`${styles.exampleRow} ${styles.dividerSummary}`}
                        >
                            <span className={styles.summaryText}>
                                Taxa Total ao Organizador:
                            </span>
                            <strong className={styles.summaryHighlight}>
                                {(
                                    settings.defaultRate +
                                    settings.paymentProcessingFee
                                ).toFixed(1)}
                                %
                            </strong>
                        </div>

                        <div className={styles.exampleBoxWhite}>
                            <div className={styles.exampleTitleBlue}>
                                Exemplo para ingresso de R$ 100,00:
                            </div>
                            <div className={styles.exampleRowBlue}>
                                <span>Comissão plataforma:</span>
                                <strong>
                                    R${' '}
                                    {calculateCommission(
                                        settings.defaultRate
                                    ).toFixed(2)}
                                </strong>
                            </div>
                            <div className={styles.exampleRowBlue}>
                                <span>Processamento:</span>
                                <strong>
                                    R${' '}
                                    {(
                                        (exampleTicketPrice *
                                            settings.paymentProcessingFee) /
                                        100
                                    ).toFixed(2)}
                                </strong>
                            </div>
                            <div
                                className={`${styles.exampleRowBlue} ${styles.dividerBlue}`}
                            >
                                <span>Total de taxas:</span>
                                <strong>
                                    R$ {totalPlatformFee.toFixed(2)}
                                </strong>
                            </div>
                            <div
                                className={`${styles.exampleRowBlue} ${styles.dividerBlue}`}
                            >
                                <span>Organizador recebe:</span>
                                <strong className={styles.textGreen}>
                                    R${' '}
                                    {(
                                        exampleTicketPrice - totalPlatformFee
                                    ).toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className={styles.footerActions}>
                <button className={styles.btnCancel} onClick={onBack}>
                    Cancelar
                </button>
                <button
                    className={`${styles.btn} ${styles.btnSave}`}
                    disabled={!hasChanges}
                    onClick={handleSave}
                >
                    <Save size={24} /> Salvar Configurações
                </button>
            </footer>
        </div>
    );
}

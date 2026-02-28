import { useState } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    ArrowLeft,
    Plus,
    Minus,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import styles from './styles.module.css';
import PageRoutesName from '../../constants/PageRoutesName';
import { DefaultLayout } from '../../layouts/DefaultLayout';

export interface TicketType {
    id: string;
    name: string;
    price: number;
    availableTickets: number;
    description?: string;
    allowHalfPrice?: boolean;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price: number;
    description: string;
    availableTickets: number;
    totalTickets: number;
    category: string;
    imageUrl?: string;
    ticketTypes?: TicketType[];
}

export function InfoEventoPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // MOCK ATUALIZADO: Adicionei alguns 'ticketTypes' de exemplo
    // para você poder ver os "Lotes" e as opções de ingresso na tela!
    const event: Event = {
        id: id || '1',
        title: 'Festival de Música Eletrônica 2025',
        description:
            'Os maiores DJs do mundo em um único lugar. Uma experiência inesquecível com o melhor da música eletrônica.',
        date: '2025-12-15',
        time: '20:00',
        location: 'Estádio Nacional, São Paulo',
        price: 150,
        category: 'Música',
        availableTickets: 450,
        totalTickets: 500,
        ticketTypes: [
            {
                id: 't1',
                name: 'Lote 1 - Pista',
                description: 'Acesso à pista principal',
                price: 150,
                availableTickets: 50,
                allowHalfPrice: true, // Esse permite meia entrada
            },
            {
                id: 't2',
                name: 'Área VIP',
                description: 'Open bar e visão privilegiada',
                price: 450,
                availableTickets: 20,
                allowHalfPrice: false, // VIP não tem meia entrada
            },
        ],
    };

    const handleBack = () => {
        navigate(-1);
    };

    const [quantity, setQuantity] = useState(1);
    const [selectedTicketType, setSelectedTicketType] = useState<
        TicketType | undefined
    >(
        event.ticketTypes && event.ticketTypes.length > 0
            ? event.ticketTypes[0]
            : undefined
    );
    const [isHalfPrice, setIsHalfPrice] = useState(false);

    const handleIncrement = () => {
        const maxTickets = selectedTicketType
            ? Math.min(10, selectedTicketType.availableTickets)
            : Math.min(10, event.availableTickets);
        if (quantity < maxTickets) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Cálculos de Preço e Disponibilidade
    const basePrice = selectedTicketType
        ? selectedTicketType.price
        : event.price;
    const currentPrice = isHalfPrice ? basePrice * 0.5 : basePrice;
    const currentAvailableTickets = selectedTicketType
        ? selectedTicketType.availableTickets
        : event.availableTickets;
    const totalPrice = currentPrice * quantity;
    const soldPercentage =
        ((event.totalTickets - currentAvailableTickets) / event.totalTickets) *
        100;

    // Verifica se o ingresso selecionado permite meia
    const allowHalfPrice = selectedTicketType?.allowHalfPrice || false;

    return (
        <DefaultLayout>
            <div className={styles.pageContainer}>
                <button onClick={handleBack} className={styles.backButton}>
                    <ArrowLeft className={styles.backIcon} />
                    Voltar
                </button>

                <div className={styles.mainGrid}>
                    {/* --- COLUNA ESQUERDA (Nenhuma alteração aqui, mantive igualzinho o seu) --- */}
                    <div className={styles.leftColumn}>
                        <div className={styles.imageContainer}>
                            <img
                                src={`https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80`}
                                alt={event.title}
                                className={styles.eventImage}
                            />
                        </div>

                        <div className={styles.headerInfo}>
                            <span className={styles.categoryBadge}>
                                {event.category}
                            </span>
                            <h1 className={styles.eventTitle}>{event.title}</h1>
                            <p className={styles.eventDescription}>
                                {event.description}
                            </p>
                        </div>

                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>
                                Informações do Evento
                            </h2>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <Calendar className={styles.infoIcon} />
                                    <div className={styles.infoTextWrapper}>
                                        <div className={styles.infoLabel}>
                                            Data
                                        </div>
                                        <div className={styles.infoValue}>
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString('pt-BR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <Clock className={styles.infoIcon} />
                                    <div className={styles.infoTextWrapper}>
                                        <div className={styles.infoLabel}>
                                            Horário
                                        </div>
                                        <div className={styles.infoValue}>
                                            {event.time}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <MapPin className={styles.infoIcon} />
                                    <div className={styles.infoTextWrapper}>
                                        <div className={styles.infoLabel}>
                                            Local
                                        </div>
                                        <div className={styles.infoValue}>
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <Users className={styles.infoIcon} />
                                    <div className={styles.infoTextWrapper}>
                                        <div className={styles.infoLabel}>
                                            Disponibilidade
                                        </div>
                                        <div className={styles.infoValue}>
                                            {currentAvailableTickets} ingressos
                                            disponíveis de {event.totalTickets}
                                        </div>
                                        <div
                                            className={
                                                styles.progressBarBackground
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.progressBarFill
                                                }
                                                style={{
                                                    width: `${soldPercentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>Sobre o Evento</h2>
                            <div className={styles.aboutContent}>
                                <p>
                                    Este é um evento imperdível que promete
                                    proporcionar uma experiência única e
                                    memorável para todos os participantes. Com
                                    uma produção de alta qualidade e atenção aos
                                    detalhes, garantimos um evento seguro e bem
                                    organizado.
                                </p>
                                <p>
                                    <strong>Classificação:</strong> Livre para
                                    todos os públicos
                                </p>
                                <p>
                                    <strong>Política de entrada:</strong> É
                                    necessário apresentar ingresso digital ou
                                    impresso e documento de identificação com
                                    foto na entrada.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUNA DIREITA REFEITA COM A LÓGICA DE LOTES E MEIA ENTRADA --- */}
                    <div className={styles.rightColumn}>
                        <div className={styles.purchaseCard}>
                            {/* 1. SELEÇÃO DE TIPO DE INGRESSO (Lotes/VIP) */}
                            {event.ticketTypes &&
                                event.ticketTypes.length > 0 && (
                                    <div className={styles.sectionDivider}>
                                        <label className={styles.sectionLabel}>
                                            Tipo de Ingresso
                                        </label>

                                        <div className={styles.ticketTypesList}>
                                            {event.ticketTypes.map(
                                                (ticketType: TicketType) => {
                                                    const isAvailable =
                                                        ticketType.availableTickets >
                                                        0;
                                                    const isSelected =
                                                        selectedTicketType?.id ===
                                                        ticketType.id;

                                                    return (
                                                        <div
                                                            key={ticketType.id}
                                                            className={`${styles.ticketTypeItem} ${isSelected ? styles.ticketSelected : ''} ${!isAvailable ? styles.ticketDisabled : ''}`}
                                                            onClick={() => {
                                                                if (
                                                                    isAvailable
                                                                ) {
                                                                    setSelectedTicketType(
                                                                        ticketType
                                                                    );
                                                                    setQuantity(
                                                                        1
                                                                    );
                                                                    setIsHalfPrice(
                                                                        false
                                                                    ); // Reseta a meia entrada ao trocar de lote
                                                                }
                                                            }}
                                                        >
                                                            {/* Bolinha do Radio feita em CSS puro */}
                                                            <div
                                                                className={`${styles.radioCircle} ${isSelected ? styles.radioChecked : ''}`}
                                                            />

                                                            <div
                                                                className={
                                                                    styles.ticketTypeContent
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.ticketTypeHeader
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            styles.ticketTypeName
                                                                        }
                                                                    >
                                                                        {
                                                                            ticketType.name
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            styles.ticketTypePrice
                                                                        }
                                                                    >
                                                                        R${' '}
                                                                        {ticketType.price.toFixed(
                                                                            2
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                {ticketType.description && (
                                                                    <div
                                                                        className={
                                                                            styles.ticketTypeDescription
                                                                        }
                                                                    >
                                                                        {
                                                                            ticketType.description
                                                                        }
                                                                    </div>
                                                                )}

                                                                <div
                                                                    className={
                                                                        styles.ticketTypeAvailability
                                                                    }
                                                                >
                                                                    {isAvailable
                                                                        ? `${ticketType.availableTickets} disponíveis`
                                                                        : 'Esgotado'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}

                            {/* Valor base em destaque */}
                            <div className={styles.priceHighlight}>
                                <div className={styles.sectionLabel}>
                                    Valor do ingresso
                                </div>
                                <div className={styles.mainPrice}>
                                    R$ {currentPrice.toFixed(2)}
                                </div>
                            </div>

                            {/* 2. SELETOR DE QUANTIDADE */}
                            <div className={styles.quantitySection}>
                                <label className={styles.sectionLabel}>
                                    Quantidade de ingressos
                                </label>

                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.iconButton}
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={18} />
                                    </button>

                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(
                                                e.target.value
                                            );
                                            if (
                                                val >= 1 &&
                                                val <=
                                                    Math.min(
                                                        10,
                                                        currentAvailableTickets
                                                    )
                                            ) {
                                                setQuantity(val);
                                            }
                                        }}
                                        className={styles.quantityInput}
                                        min="1"
                                        max={Math.min(
                                            10,
                                            currentAvailableTickets
                                        )}
                                    />

                                    <button
                                        className={styles.iconButton}
                                        onClick={handleIncrement}
                                        disabled={
                                            quantity >=
                                            Math.min(
                                                10,
                                                currentAvailableTickets
                                            )
                                        }
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <div className={styles.quantityHint}>
                                    Máximo de{' '}
                                    {Math.min(10, currentAvailableTickets)}{' '}
                                    ingressos por compra
                                </div>
                            </div>

                            {/* 3. OPÇÃO MEIA ENTRADA (Só aparece se o lote permitir) */}
                            {allowHalfPrice && (
                                <div className={styles.halfPriceSection}>
                                    <label className={styles.sectionLabel}>
                                        Opções de Preço
                                    </label>

                                    <div
                                        className={styles.radioOption}
                                        onClick={() => setIsHalfPrice(false)}
                                    >
                                        <div
                                            className={`${styles.radioCircle} ${!isHalfPrice ? styles.radioChecked : ''}`}
                                        />
                                        <span>Preço Completo</span>
                                    </div>

                                    <div
                                        className={styles.radioOption}
                                        onClick={() => setIsHalfPrice(true)}
                                    >
                                        <div
                                            className={`${styles.radioCircle} ${isHalfPrice ? styles.radioChecked : ''}`}
                                        />
                                        <span>
                                            Preço Reduzido (Meia Entrada - 50%)
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* 4. RESUMO DE VALORES E BOTÃO DE COMPRA */}
                            <div className={styles.summarySection}>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>
                                        Subtotal
                                    </span>
                                    <span className={styles.summaryValue}>
                                        R$ {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span className={styles.summaryLabel}>
                                        Taxa de serviço
                                    </span>
                                    <span className={styles.summaryValue}>
                                        R$ {(totalPrice * 0.1).toFixed(2)}
                                    </span>
                                </div>
                                <div
                                    className={`${styles.summaryRow} ${styles.summaryTotal}`}
                                >
                                    <span className={styles.summaryLabelTotal}>
                                        Total
                                    </span>
                                    <span className={styles.summaryValueTotal}>
                                        R$ {(totalPrice * 1.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                className={styles.buyButton}
                                onClick={() => {
                                    navigate(
                                        PageRoutesName.cliente.checkout.replace(
                                            ':id',
                                            String(event.id)
                                        )
                                    );
                                }}
                                disabled={currentAvailableTickets === 0}
                            >
                                {currentAvailableTickets === 0
                                    ? 'Esgotado'
                                    : 'Comprar Ingressos'}
                            </button>

                            <div className={styles.securePurchaseHint}>
                                Compra 100% segura e protegida
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, QrCode } from 'lucide-react';
// Ajuste os imports abaixo se a interface CartItem estiver em outro arquivo
import type { Event, TicketType } from '../../types/Event';
import styles from './styles.module.css';
import { useNavigate } from 'react-router';

// IMPORTANTE: Declare/importe sua interface de carrinho aqui
export interface CartItem {
    event: Event;
    quantity: number;
    ticketType?: TicketType;
}

interface CheckoutProps {
    cart: CartItem[];
    onComplete: () => void;
}

export function Checkout({ cart = [], onComplete }: CheckoutProps) {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const subtotal = cart.reduce((acc, item) => {
        const price = item.ticketType
            ? item.ticketType.price
            : item.event.price;
        return acc + price * item.quantity;
    }, 0);
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulando o processamento do pagamento
        setTimeout(() => {
            onComplete();
        }, 1000);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className={styles.pageContainer}>
            <button onClick={handleBack} className={styles.backButton}>
                <ArrowLeft className={styles.backIcon} />
                Voltar
            </button>

            <h1 className={styles.pageTitle}>Finalizar Compra</h1>

            <div className={styles.mainGrid}>
                {/* LADO ESQUERDO: Formulários */}
                <div className={styles.leftColumn}>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.formContainer}
                    >
                        {/* Informações Pessoais */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                Informações Pessoais
                            </h2>

                            <div className={styles.inputGroup}>
                                <div className={styles.inputField}>
                                    <label
                                        htmlFor="name"
                                        className={styles.label}
                                    >
                                        Nome Completo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Seu nome completo"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.inputField}>
                                    <label
                                        htmlFor="email"
                                        className={styles.label}
                                    >
                                        E-mail
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        placeholder="seu@email.com"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.inputField}>
                                    <label
                                        htmlFor="cpf"
                                        className={styles.label}
                                    >
                                        CPF
                                    </label>
                                    <input
                                        id="cpf"
                                        type="text"
                                        required
                                        value={formData.cpf}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'cpf',
                                                e.target.value
                                            )
                                        }
                                        placeholder="000.000.000-00"
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Método de Pagamento */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                Método de Pagamento
                            </h2>

                            <div className={styles.radioGroup}>
                                {/* Opção Cartão de Crédito */}
                                <div
                                    className={`${styles.radioOptionBox} ${paymentMethod === 'credit' ? styles.radioSelected : ''}`}
                                    onClick={() => setPaymentMethod('credit')}
                                >
                                    <div className={styles.radioLabelArea}>
                                        <div
                                            className={`${styles.radioCircle} ${paymentMethod === 'credit' ? styles.radioChecked : ''}`}
                                        />
                                        <span className={styles.radioText}>
                                            Cartão de Crédito
                                        </span>
                                    </div>
                                    <CreditCard
                                        className={styles.paymentIcon}
                                    />
                                </div>

                                {/* Opção Cartão de Débito */}
                                <div
                                    className={`${styles.radioOptionBox} ${paymentMethod === 'debit' ? styles.radioSelected : ''}`}
                                    onClick={() => setPaymentMethod('debit')}
                                >
                                    <div className={styles.radioLabelArea}>
                                        <div
                                            className={`${styles.radioCircle} ${paymentMethod === 'debit' ? styles.radioChecked : ''}`}
                                        />
                                        <span className={styles.radioText}>
                                            Cartão de Débito
                                        </span>
                                    </div>
                                    <CreditCard
                                        className={styles.paymentIcon}
                                    />
                                </div>

                                {/* Opção PIX */}
                                <div
                                    className={`${styles.radioOptionBox} ${paymentMethod === 'pix' ? styles.radioSelected : ''}`}
                                    onClick={() => setPaymentMethod('pix')}
                                >
                                    <div className={styles.radioLabelArea}>
                                        <div
                                            className={`${styles.radioCircle} ${paymentMethod === 'pix' ? styles.radioChecked : ''}`}
                                        />
                                        <span className={styles.radioText}>
                                            PIX
                                        </span>
                                    </div>
                                    <QrCode className={styles.paymentIcon} />
                                </div>
                            </div>

                            {/* Campos do Cartão (Só exibe se for Crédito ou Débito) */}
                            {(paymentMethod === 'credit' ||
                                paymentMethod === 'debit') && (
                                <div className={styles.cardDetailsContainer}>
                                    <div className={styles.inputField}>
                                        <label
                                            htmlFor="cardNumber"
                                            className={styles.label}
                                        >
                                            Número do Cartão
                                        </label>
                                        <input
                                            id="cardNumber"
                                            type="text"
                                            required
                                            value={formData.cardNumber}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'cardNumber',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0000 0000 0000 0000"
                                            maxLength={19}
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.inputField}>
                                        <label
                                            htmlFor="cardName"
                                            className={styles.label}
                                        >
                                            Nome no Cartão
                                        </label>
                                        <input
                                            id="cardName"
                                            type="text"
                                            required
                                            value={formData.cardName}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'cardName',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Nome como está no cartão"
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputField}>
                                            <label
                                                htmlFor="expiryDate"
                                                className={styles.label}
                                            >
                                                Validade
                                            </label>
                                            <input
                                                id="expiryDate"
                                                type="text"
                                                required
                                                value={formData.expiryDate}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'expiryDate',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="MM/AA"
                                                maxLength={5}
                                                className={styles.input}
                                            />
                                        </div>

                                        <div className={styles.inputField}>
                                            <label
                                                htmlFor="cvv"
                                                className={styles.label}
                                            >
                                                CVV
                                            </label>
                                            <input
                                                id="cvv"
                                                type="text"
                                                required
                                                value={formData.cvv}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'cvv',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="123"
                                                maxLength={4}
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mensagem do PIX */}
                            {paymentMethod === 'pix' && (
                                <div className={styles.pixAlert}>
                                    <p>
                                        Após confirmar o pedido, você receberá
                                        um QR Code para pagamento via PIX. A
                                        confirmação é instantânea!
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={styles.securitySeal}>
                            <Lock className={styles.securityIcon} />
                            <span>
                                Seus dados estão seguros e criptografados
                            </span>
                        </div>

                        {/* O botão fica em baixo do lado esquerdo no celular, e oculto no PC (pois o botão do PC está na direita) */}
                        <button
                            className={`${styles.submitButton} ${styles.mobileOnlyButton}`}
                            onClick={handleSubmit}
                        >
                            Confirmar Pagamento
                        </button>
                    </form>
                </div>

                {/* LADO DIREITO: Resumo do Pedido (Sticky) */}
                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <h2 className={styles.cardTitle}>Resumo do Pedido</h2>

                        <div className={styles.cartItemsList}>
                            {cart.map((item, index) => {
                                const itemPrice = item.ticketType
                                    ? item.ticketType.price
                                    : item.event.price;
                                const itemTotal = itemPrice * item.quantity;

                                return (
                                    <div
                                        key={index}
                                        className={styles.cartItem}
                                    >
                                        <div className={styles.cartItemHeader}>
                                            <div
                                                className={styles.cartItemTitle}
                                            >
                                                {item.event.title}
                                            </div>
                                            {item.ticketType && (
                                                <div
                                                    className={
                                                        styles.cartItemBadge
                                                    }
                                                >
                                                    {item.ticketType.name}
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.cartItemDetails}>
                                            <div className={styles.cartItemQty}>
                                                {item.quantity}x R${' '}
                                                {itemPrice.toFixed(2)}
                                            </div>
                                            <div
                                                className={styles.cartItemTotal}
                                            >
                                                R$ {itemTotal.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.totalsSection}>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>
                                    Subtotal
                                </span>
                                <span className={styles.totalValue}>
                                    R$ {subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className={styles.totalRow}>
                                <span className={styles.totalLabel}>
                                    Taxa de serviço
                                </span>
                                <span className={styles.totalValue}>
                                    R$ {serviceFee.toFixed(2)}
                                </span>
                            </div>
                            <div
                                className={`${styles.totalRow} ${styles.grandTotalRow}`}
                            >
                                <span className={styles.grandTotalLabel}>
                                    Total
                                </span>
                                <span className={styles.grandTotalValue}>
                                    R$ {total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Botão Principal no Desktop */}
                        <button
                            className={`${styles.submitButton} ${styles.desktopOnlyButton}`}
                            onClick={handleSubmit}
                        >
                            Confirmar Pagamento
                        </button>

                        <div className={styles.termsHint}>
                            Ao confirmar, você concorda com nossos Termos de Uso
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

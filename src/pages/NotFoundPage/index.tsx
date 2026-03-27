import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';
import styles from './styles.module.css';

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.decorativeElement + ' ' + styles.circle1} />
            <div className={styles.decorativeElement + ' ' + styles.circle2} />

            <div className={styles.contentWrapper}>
                <div className={styles.iconWrapper}>
                    <Search size={80} color="#667eea" strokeWidth={1.5} />
                </div>

                <h1 className={styles.errorCode}>404</h1>

                <h2 className={styles.title}>Página não encontrada</h2>

                <p className={styles.description}>
                    Desculpe, não conseguimos encontrar a página que você está
                    procurando. Ela pode ter sido movida ou removida.
                </p>

                <div className={styles.buttonsWrapper}>
                    <button
                        onClick={() => navigate('/')}
                        className={`${styles.button} ${styles.primaryButton}`}
                    >
                        <Home size={20} />
                        Ir para Home
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className={`${styles.button} ${styles.secondaryButton}`}
                    >
                        <ArrowLeft size={20} />
                        Voltar
                    </button>
                </div>

                <div className={styles.suggestionsWrapper}>
                    <p className={styles.suggestionsTitle}>💡 Dicas úteis:</p>
                    <ul className={styles.suggestionsList}>
                        <li className={styles.suggestionItem}>
                            • Verifique se a URL está correta
                        </li>
                        <li className={styles.suggestionItem}>
                            • Tente acessar pela página inicial
                        </li>
                        <li className={styles.suggestionItem}>
                            • Procure pelo menu de navegação no topo
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

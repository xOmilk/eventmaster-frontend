import { useEffect, useState } from 'react';
import { useGetMe } from '../../hooks/useGetMe';
import { ArrowLeft, User, Bell, Settings, Shield, CreditCard, Globe, Sun, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { notify } from '../../adapters/toastHotAdapter';
import styles from './style.module.css';

type ActiveTab = 'perfil' | 'notificacoes' | 'preferencias' | 'seguranca';

const MOCK_CARTOES = [
    { id: '1', numero: '•••• •••• •••• 4242', expira: '12/2025' },
];

export function ConfigPage() {
    const { data: userData } = useGetMe();
    
    const [activeTab, setActiveTab] = useState<ActiveTab>('perfil');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [biografia, setBiografia] = useState('');
    const [cartoes, setCartoes] = useState(MOCK_CARTOES);
    const [notificacoes, setNotificacoes] = useState({
        email: true,
        push: true,
        sms: false,
        lembretes: true,
        promocoes: true,
        newsletter: false,
    });
    const [preferencias, setPreferencias] = useState({
        idioma: 'pt-BR',
        fusoHorario: 'America/Sao_Paulo',
        moeda: 'BRL',
        tema: 'claro',
    });
    const [categorias, setCategorias] = useState([
        'Música', 'Teatro', 'Comédia', 'Tecnologia', 'Dança', 'Esportes'
    ]);
    const [seguranca, setSeguranca] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: '',
        doisFatores: false,
        alertas: true,
        tempoSessao: '30'
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setNome(userData.name || '');
            setEmail(userData.email || '');
            // Campos que não vêm da API, inicializados para estética da página
            setTelefone('+55 11 98765-4321');
            setBiografia('Apaixonado por eventos de música e tecnologia.');
        }
    }, [userData]);

    const handleSalvar = () => {
        notify.success('Alterações salvas com sucesso!');
    };

    const handleCancelar = () => {
        if (userData) {
            setNome(userData.name || '');
            setEmail(userData.email || '');
        }
        setTelefone('+55 11 98765-4321');
        setBiografia('Apaixonado por eventos de música e tecnologia.');
    };

    const handleRemoverCartao = (id: string) => {
        setCartoes((prev) => prev.filter((c) => c.id !== id));
        notify.success('Cartão removido.');
    };

    const handleToggleNotificacao = (key: keyof typeof notificacoes) => {
        setNotificacoes((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* Voltar */}
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} />
                    Voltar
                </button>

                {/* Título */}
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Configurações</h1>
                    <p className={styles.pageSubtitle}>
                        Gerencie suas preferências e configurações da conta
                    </p>
                </div>

                {/* Tabs */}
                <div className={styles.tabsWrapper}>
                    <div className={styles.tabsGrid}>
                        <button
                            className={`${styles.tab} ${activeTab === 'perfil' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('perfil')}
                        >
                            <User size={16} /> Perfil
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'notificacoes' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('notificacoes')}
                        >
                            <Bell size={16} /> Notificações
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'preferencias' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('preferencias')}
                        >
                            <Settings size={16} /> Preferências
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'seguranca' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('seguranca')}
                        >
                            <Shield size={16} /> Segurança
                        </button>
                    </div>
                </div>

                <div className={styles.contentArea}>
                    {/* Aba Perfil */}
                    {activeTab === 'perfil' && (
                        <>
                            {/* Informações Pessoais */}
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Informações Pessoais</h2>
                                    <p className={styles.cardSubtitle}>
                                        Atualize suas informações pessoais e de contato
                                    </p>
                                </div>

                                {/* Foto */}
                                <div className={styles.photoRow}>
                                    <div className={styles.avatarBox}>
                                        <User size={40} color="#4f46e5" />
                                    </div>
                                    <div className={styles.photoActions}>
                                        <button className={styles.btnAlterarFoto}>
                                            Alterar foto
                                        </button>
                                        <p className={styles.fotoHint}>
                                            JPG, GIF ou PNG. Máximo de 1MB.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.divider} />

                                {/* Campos */}
                                <div className={styles.fieldsGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Nome completo</label>
                                        <input
                                            className={styles.input}
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>E-mail</label>
                                        <input
                                            className={styles.input}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Telefone</label>
                                        <input
                                            className={styles.input}
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Biografia</label>
                                    <textarea
                                        className={styles.textarea}
                                        value={biografia}
                                        onChange={(e) => setBiografia(e.target.value)}
                                        rows={3}
                                    />
                                    <span className={styles.fieldHint}>
                                        Breve descrição sobre você
                                    </span>
                                </div>

                                {/* Ações */}
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.btnCancelar}
                                        onClick={handleCancelar}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={styles.btnSalvar}
                                        onClick={handleSalvar}
                                    >
                                        Salvar alterações
                                    </button>
                                </div>
                            </div>

                            {/* Cartões Salvos */}
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Cartões Salvos</h2>
                                    <p className={styles.cardSubtitle}>
                                        Gerencie seus métodos de pagamento
                                    </p>
                                </div>

                                <div className={styles.cartoesList}>
                                    {cartoes.map((cartao) => (
                                        <div key={cartao.id} className={styles.cartaoItem}>
                                            <div className={styles.cartaoInfo}>
                                                <CreditCard size={28} color="#9ca3af" />
                                                <div className={styles.cartaoDetails}>
                                                    <p className={styles.cartaoNumero}>
                                                        {cartao.numero}
                                                    </p>
                                                    <p className={styles.cartaoExpira}>
                                                        Expira em {cartao.expira}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className={styles.btnRemover}
                                                onClick={() => handleRemoverCartao(cartao.id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button className={styles.btnAdicionarCartao}>
                                    + Adicionar novo cartão
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === 'notificacoes' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>Preferências de Notificação</h2>
                                <p className={styles.cardSubtitle}>
                                    Escolha como você quer receber notificações
                                </p>
                            </div>

                            <div className={styles.notificationList}>
                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Notificações por e-mail</p>
                                        <p className={styles.notificationDesc}>Receba atualizações e confirmações por e-mail</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.email}
                                            onChange={() => handleToggleNotificacao('email')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Notificações push</p>
                                        <p className={styles.notificationDesc}>Receba notificações push no navegador</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.push}
                                            onChange={() => handleToggleNotificacao('push')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Notificações por SMS</p>
                                        <p className={styles.notificationDesc}>Receba lembretes importantes via SMS</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.sms}
                                            onChange={() => handleToggleNotificacao('sms')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Lembretes de eventos</p>
                                        <p className={styles.notificationDesc}>Receba lembretes antes dos eventos</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.lembretes}
                                            onChange={() => handleToggleNotificacao('lembretes')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Promoções e ofertas</p>
                                        <p className={styles.notificationDesc}>Receba ofertas especiais e descontos</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.promocoes}
                                            onChange={() => handleToggleNotificacao('promocoes')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.notificationItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Newsletter</p>
                                        <p className={styles.notificationDesc}>Receba nossa newsletter mensal</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={notificacoes.newsletter}
                                            onChange={() => handleToggleNotificacao('newsletter')}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.cardActions} style={{ marginTop: '32px' }}>
                                <button className={styles.btnSalvar} onClick={handleSalvar}>
                                    Salvar preferências
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferencias' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2 className={styles.cardTitle}>Preferências Gerais</h2>
                                <p className={styles.cardSubtitle}>
                                    Personalize sua experiência no site
                                </p>
                            </div>

                            <div className={styles.fieldsGrid}>
                                {/* Idioma */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Globe size={16} /> Idioma
                                    </label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            className={styles.select}
                                            value={preferencias.idioma}
                                            onChange={(e) => setPreferencias({ ...preferencias, idioma: e.target.value })}
                                        >
                                            <option value="pt-BR">Português (Brasil)</option>
                                            <option value="en-US">English (US)</option>
                                        </select>
                                        <ChevronDown className={styles.selectChevron} size={16} />
                                    </div>
                                </div>

                                {/* Fuso horário */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Fuso horário</label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            className={styles.select}
                                            value={preferencias.fusoHorario}
                                            onChange={(e) => setPreferencias({ ...preferencias, fusoHorario: e.target.value })}
                                        >
                                            <option value="America/Sao_Paulo">São Paulo (BRT)</option>
                                            <option value="America/New_York">New York (EST)</option>
                                        </select>
                                        <ChevronDown className={styles.selectChevron} size={16} />
                                    </div>
                                </div>

                                {/* Moeda */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Moeda</label>
                                    <div className={styles.selectWrapper}>
                                        <select
                                            className={styles.select}
                                            value={preferencias.moeda}
                                            onChange={(e) => setPreferencias({ ...preferencias, moeda: e.target.value })}
                                        >
                                            <option value="BRL">Real (R$)</option>
                                            <option value="USD">Dólar (US$)</option>
                                        </select>
                                        <ChevronDown className={styles.selectChevron} size={16} />
                                    </div>
                                </div>

                                {/* Tema */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Tema</label>
                                    <div className={styles.selectWrapper}>
                                        <Sun className={styles.selectLeftIcon} size={16} />
                                        <select
                                            className={`${styles.select} ${styles.hasLeftIcon}`}
                                            value={preferencias.tema}
                                            onChange={(e) => setPreferencias({ ...preferencias, tema: e.target.value })}
                                        >
                                            <option value="claro">Claro</option>
                                            <option value="escuro">Escuro</option>
                                        </select>
                                        <ChevronDown className={styles.selectChevron} size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.categoriasWrapper}>
                                <h3 className={styles.categoriasTitle}>Categorias favoritas</h3>
                                <div className={styles.categoriasList}>
                                    {['Música', 'Teatro', 'Comédia', 'Tecnologia', 'Dança', 'Esportes', 'Negócios'].map((cat) => {
                                        const isSelected = categorias.includes(cat);
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setCategorias(prev =>
                                                        isSelected ? prev.filter(c => c !== cat) : [...prev, cat]
                                                    )
                                                }}
                                                className={`${styles.categoriaPill} ${isSelected ? styles.categoriaSelected : ''}`}
                                            >
                                                {cat}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={styles.cardActions} style={{ marginTop: '32px' }}>
                                <button className={styles.btnSalvar} onClick={handleSalvar}>
                                    Salvar preferências
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seguranca' && (
                        <div className={styles.contentArea}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Segurança da Conta</h2>
                                    <p className={styles.cardSubtitle}>
                                        Gerencie as configurações de segurança da sua conta
                                    </p>
                                </div>

                                <div className={styles.securitySection}>
                                    <p className={styles.sectionTitle}>Alterar senha</p>
                                    
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Senha atual</label>
                                        <input
                                            type="password"
                                            className={styles.input}
                                            value={seguranca.senhaAtual}
                                            onChange={(e) => setSeguranca({ ...seguranca, senhaAtual: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Nova senha</label>
                                        <input
                                            type="password"
                                            className={styles.input}
                                            value={seguranca.novaSenha}
                                            onChange={(e) => setSeguranca({ ...seguranca, novaSenha: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>Confirmar nova senha</label>
                                        <input
                                            type="password"
                                            className={styles.input}
                                            value={seguranca.confirmarSenha}
                                            onChange={(e) => setSeguranca({ ...seguranca, confirmarSenha: e.target.value })}
                                        />
                                    </div>
                                    <button className={styles.btnAlterarSenha}>Alterar senha</button>
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.notificationItem} style={{ borderBottom: 'none', padding: '16px 0' }}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Autenticação de dois fatores</p>
                                        <p className={styles.notificationDesc}>Adicione uma camada extra de segurança</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={seguranca.doisFatores}
                                            onChange={() => setSeguranca({ ...seguranca, doisFatores: !seguranca.doisFatores })}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.notificationItem} style={{ borderBottom: 'none', padding: '16px 0' }}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.notificationTitle}>Alertas de login</p>
                                        <p className={styles.notificationDesc}>Receba alertas quando houver login de novos dispositivos</p>
                                    </div>
                                    <label className={styles.toggleSwitch}>
                                        <input
                                            type="checkbox"
                                            checked={seguranca.alertas}
                                            onChange={() => setSeguranca({ ...seguranca, alertas: !seguranca.alertas })}
                                        />
                                        <span className={styles.toggleSlider}></span>
                                    </label>
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.fieldGroup} style={{ marginBottom: '32px' }}>
                                    <p className={styles.notificationTitle}>Tempo de sessão (minutos)</p>
                                    <div className={styles.selectWrapper} style={{ marginTop: '8px' }}>
                                        <select
                                            className={styles.select}
                                            value={seguranca.tempoSessao}
                                            onChange={(e) => setSeguranca({ ...seguranca, tempoSessao: e.target.value })}
                                        >
                                            <option value="15">15 minutos</option>
                                            <option value="30">30 minutos</option>
                                            <option value="60">60 minutos</option>
                                        </select>
                                        <ChevronDown className={styles.selectChevron} size={16} />
                                    </div>
                                </div>

                                <div className={styles.securitySection}>
                                    <p className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Sessões ativas</p>
                                    
                                    <div className={styles.sessaoCard}>
                                        <div className={styles.sessaoInfo}>
                                            <p className={styles.sessaoNome}>Chrome - Windows</p>
                                            <p className={styles.sessaoDetalhe}>São Paulo, Brasil • Agora</p>
                                        </div>
                                        <span className={styles.badgeSuccess}>Atual</span>
                                    </div>

                                    <div className={styles.sessaoCard}>
                                        <div className={styles.sessaoInfo}>
                                            <p className={styles.sessaoNome}>Safari - iPhone</p>
                                            <p className={styles.sessaoDetalhe}>São Paulo, Brasil • 2 horas atrás</p>
                                        </div>
                                        <button className={styles.btnRemover}>Encerrar</button>
                                    </div>
                                </div>

                                <div className={styles.cardActions} style={{ marginTop: '32px' }}>
                                    <button className={styles.btnSalvar} onClick={handleSalvar}>
                                        Salvar configurações
                                    </button>
                                </div>
                            </div>

                            {/* Zona de Perigo */}
                            <div className={styles.dangerZone}>
                                <div className={styles.dangerZoneHeader}>
                                    <h2 className={styles.dangerZoneTitle}>Zona de Perigo</h2>
                                    <p className={styles.dangerZoneSubtitle}>
                                        Ações irreversíveis relacionadas à sua conta
                                    </p>
                                </div>

                                <div className={styles.dangerItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.dangerItemTitle}>Desativar conta</p>
                                        <p className={styles.dangerItemDesc}>Sua conta será desativada temporariamente</p>
                                    </div>
                                    <button className={styles.btnDesativar}>
                                        Desativar
                                    </button>
                                </div>
                                <div className={styles.dangerDivider} />

                                <div className={styles.dangerItem}>
                                    <div className={styles.notificationInfo}>
                                        <p className={styles.dangerItemTitle}>Excluir conta</p>
                                        <p className={styles.dangerItemDesc}>Excluir permanentemente sua conta e todos os dados</p>
                                    </div>
                                    <button className={styles.btnExcluir}>
                                        Excluir conta
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

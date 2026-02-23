import { LockIcon, MailIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';

const registerSchema = z.object({
    email: z
        .string()
        .email('Digite um email válido')
        .min(1, 'Email é obrigatório'),

    password: z
        .string()
        .min(6, 'A senha precisa ter no mínimo 6 dígitos')
        .max(30, 'A senha precisa ter no máximo 30 dígitos'),
});

export function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async () => {
        try {
            // 🔐 Aqui futuramente você chama a API
            // await authService.login(data);

            // ✅ Se deu certo → redireciona
            navigate('/');
        } catch {
            // ❌ Se login falhar
            setError('root', {
                message: 'Email ou senha incorretos',
            });
        }
    };
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <header></header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Header>
                    <Form.Title children={'Entrar na sua conta'} />
                    <Form.Subtitle
                        children={
                            'Digite suas credenciais para acessar sua conta'
                        }
                    />
                </Form.Header>

                <Form.Content>
                    <div className={styles.group}>
                        <Form.Input
                            {...register('email')}
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={<MailIcon />}
                        />
                        {errors.email?.message && (
                            <p className={styles.error}>
                                {errors.email?.message}
                            </p>
                        )}
                    </div>

                    <div className={styles.group}>
                        <Form.Input
                            {...register('password')}
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            icon={<LockIcon />}
                            minLength={6}
                        />
                        {errors.password?.message && (
                            <p className={styles.error}>
                                {errors.password?.message}
                            </p>
                        )}
                    </div>
                    <div className={styles.forgotPasswordContainer}>
                        <Link
                            to="/auth/ForgotPassword"
                            className={styles.forgotPasswordLink}
                        >
                            Esqueceu a senha?
                        </Link>
                    </div>

                    <Form.SendButton disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Form.SendButton>

                    {errors.root?.message && (
                        <p className={styles.error}>{errors.root.message}</p>
                    )}
                </Form.Content>
            </Form>
        </AuthLayout>
    );
}

import { MailIcon, ArrowLeft } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Digite um email válido')
        .min(1, 'Email é obrigatório'),
});

export function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async () => {
        alert('Se o e-mail existir, enviaremos um código!');
    };

    return (
        <AuthLayout>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Header>
                    <Form.Title>Recuperar Senha </Form.Title>
                    <Form.Subtitle>
                        Digite seu e-mail para receber as instruções
                    </Form.Subtitle>
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
                                {errors.email?.message as string}
                            </p>
                        )}
                    </div>

                    <Form.SendButton disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Email'}
                    </Form.SendButton>

                    <div className={styles.backLinkContainer}>
                        <Link to="/auth/login" className={styles.backLink}>
                            <ArrowLeft size={16} /> Voltar para o Login
                        </Link>
                    </div>
                </Form.Content>
            </Form>
        </AuthLayout>
    );
}

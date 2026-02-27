import { LockIcon, MailIcon } from 'lucide-react';
import { Form } from '../../components/Form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './style.module.css';
import { AuthLayout } from '../../layouts/AuthLayout';
import { notify } from '../../adapters/toastHotAdapter';
import { useNavigate } from 'react-router';
import PageRoutesName from '../../constants/PageRoutesName';
import { setLocalStorageRole } from '../../utils/localStorageRole';

const loginSchema = z.object({
    email: z.email('Digite um email válido').min(1, 'Email é obrigatório'),

    password: z
        .string()
        .min(6, 'A senha precisa ter no mínimo 6 dígitos')
        .max(30, 'A senha precisa ter no máximo 30 dígitos'),
});

type LoginFields = z.infer<typeof loginSchema>;

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFields> = async (_data) => {
        //TODO: verificação se o usuario realmente existe pela chamada API
        notify.success('Conta logada');
        //isso deve ser setado baseado no valor que API retornar quando efetuar chamada
        setLocalStorageRole('USUARIO');
        navigate(PageRoutesName.home);
    };

    return (
        <AuthLayout>
            <header></header>

            <Form>
                <Form.Header>
                    <Form.Title children={'Entrar na sua conta'} />
                    <Form.Subtitle
                        children={
                            'Digite suas credenciais para acessar sua conta'
                        }
                    />
                </Form.Header>

                <Form.Content onSubmit={handleSubmit(onSubmit)}>
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

                    <Form.SendButton>Entrar</Form.SendButton>
                    {errors.root?.message && (
                        <p className={styles.error}>{errors.root?.message}</p>
                    )}
                    {isSubmitSuccessful && (
                        <p
                            style={{
                                color: 'var(--color-green-600)',
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >
                            Login realizado com sucesso
                        </p>
                    )}
                </Form.Content>
            </Form>
        </AuthLayout>
    );
}

import { AuthLayout } from '../../layouts/AuthLayout';
import { Form } from '../../components/Form';

export function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <Form>
                <Form.Header>
                    <Form.Title children="Recuperar senha" />
                    <Form.Subtitle children="Informe seu e-mail para receber o link de recuperação." />
                </Form.Header>
                {/* TODO: add email field and submit */}
            </Form>
        </AuthLayout>
    );
}

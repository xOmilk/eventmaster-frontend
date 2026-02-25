import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Ticket } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { cn } from '../../components/ui/utils';
import type { Event, TicketType } from '../EventDetails';

type EventSummary = Pick<Event, 'title' | 'price'>;
type TicketSummary = Pick<TicketType, 'name' | 'price'>;

export interface CartItem {
  event: EventSummary;
  quantity: number;
  ticketType?: TicketSummary;
}

interface CheckoutProps {
  cart?: CartItem[];
  onComplete?: () => void;
  onBack?: () => void;
}

export function Checkout({
  //caso a rota seja acessada sem o link (só pra teste)
  cart: defaultCart = [
    {
      event: { title: "Evento Exemplo", price: 0 },
      quantity: 0,
      ticketType: { name: "Nenhum selecionado", price: 0 }
    }
  ],
  onComplete = () => alert("Compra simulada com sucesso!"),
  onBack
}: CheckoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // carrinho vem da navegação (EventDetails).
  // se não (por ex o usuário acessou direto pelo link), usa o defaultCart.
  const activeCart: CartItem[] = location.state?.cart || defaultCart;

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  //calculos
  const subtotal = activeCart.reduce((acc, item) => {
    const price = item.ticketType ? item.ticketType.price : item.event.price;
    return acc + (price * item.quantity);
  }, 0);

  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  //voltar 1 pagina
  const handleInternalBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 py-12">

        <button
          onClick={handleInternalBack}
          className="flex items-center gap-3 text-gray-500 hover:text-black mb-10 font-bold text-xl group transition-colors"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight uppercase">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/*form*/}
          <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/*dados pessoais*/}
              <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm">
                <h2 className="text-gray-900 font-bold text-xl mb-8 uppercase tracking-tight border-b pb-4">
                  1. Informações Pessoais
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2 space-y-3">
                    <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">Nome Completo</Label>
                    <Input
                      className="h-16 !text-xl rounded-2xl border-gray-200"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome impresso no documento"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">E-mail</Label>
                    <Input
                      type="email"
                      className="h-16 !text-xl rounded-2xl border-gray-200"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">CPF</Label>
                    <Input
                      className="h-16 !text-xl rounded-2xl border-gray-200"
                      required
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              {/*pagamento*/}
              <div className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm">
                <h2 className="text-gray-900 font-bold text-xl mb-8 uppercase tracking-tight border-b pb-4">
                  2. Método de Pagamento
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {['credit', 'pix'].map((method) => (
                    <div key={method} className="relative">
                      <RadioGroupItem value={method} id={method} className="sr-only" />
                      <Label
                        htmlFor={method}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all gap-3",
                          paymentMethod === method ? "border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600" : "border-gray-100 hover:border-gray-300"
                        )}
                      >
                        {method === 'pix' ? <span className="font-black text-xl">PIX</span> : <CreditCard className={cn("size-8", paymentMethod === method ? "text-indigo-600" : "text-gray-400")} />}
                        <span className="font-bold text-sm uppercase tracking-wider">
                          {method === 'credit' ? 'Cartão de Crédito' : 'PIX'}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === 'credit' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="space-y-3">
                      <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">Número do Cartão</Label>
                      <Input
                        className="h-16 !text-xl rounded-2xl border-gray-200"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">Validade</Label>
                        <Input
                          className="h-16 !text-xl rounded-2xl border-gray-200"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/AA"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-ms font-bold text-gray-900 uppercase tracking-widest">CVV</Label>
                        <Input
                          className="h-16 !text-xl rounded-2xl border-gray-200"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 text-center">
                    <p className="text-indigo-900 font-bold text-xl mb-1">Pagamento via PIX</p>
                    <p className="text-indigo-700">O código será gerado após a confirmação.</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/*resumo na lateral*/}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-[32px] p-10 shadow-2xl sticky top-10 space-y-8 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Resumo do Pedido</h2>
              
              <div className="space-y-6">
                {activeCart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                      <Ticket className="text-indigo-600 size-6" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg leading-tight mb-1">{item.event.title}</div>
                      <div className="text-indigo-600 font-bold text-sm uppercase">
                        {item.ticketType?.name || 'Ingresso Comum'}
                      </div>
                      <div className="text-gray-500 font-medium mt-1">
                        {item.quantity}x R$ {(item.ticketType?.price ?? item.event.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100 text-xl font-bold text-gray-900">
                <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxas</span><span>R$ {serviceFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-4xl font-black text-gray-900 pt-6 border-t border-gray-100">
                  <span>Total</span><span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full bg-black hover:bg-zinc-800 text-white py-10 rounded-2xl text-2xl font-black shadow-xl active:scale-95 transition-all"
                onClick={handleSubmit}
              >
                Confirmar e Pagar
              </Button>

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-green-600 font-black italic uppercase text-xs">
                  <ShieldCheck size={16} /> Checkout 100% Seguro
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <Lock size={10} /> Criptografia de ponta (SSL)
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
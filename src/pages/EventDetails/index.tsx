import { useState, useMemo } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Plus,
    Minus,
    ShieldCheck,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { cn } from '../../components/ui/utils';

// interfaces
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

interface EventDetailsProps {
    event: Event;
    onBuyTickets: (
        event: Event,
        quantity: number,
        ticketType?: TicketType
    ) => void;
    onBack: () => void;
}

// componentes auxiliares
const SectionCard = ({
    title,
    children,
    className,
}: {
    title?: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={cn(
            'bg-white rounded-[32px] border border-gray-100 p-12 shadow-sm',
            className
        )}
    >
        {title && (
            <h2 className="text-gray-900 font-black mb-10 text-2xl uppercase tracking-tight border-b pb-4">
                {title}
            </h2>
        )}
        {children}
    </div>
);

const InfoItem = ({
    icon: Icon,
    title,
    value,
    children,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
    children?: React.ReactNode;
}) => (
    <div className="flex items-start gap-5 py-3">
        <div className="p-3 bg-indigo-50 rounded-xl">
            <Icon className="size-7 text-indigo-600" />
        </div>
        <div className="flex-1">
            <div className="text-gray-900 font-bold text-xl mb-1">{title}</div>
            <div className="text-gray-600 text-xl font-medium leading-relaxed">
                {value}
            </div>
            {children}
        </div>
    </div>
);

export default function EventDetails({
    event,
    onBuyTickets,
    onBack,
}: EventDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState<
        TicketType | undefined
    >(event?.ticketTypes?.[0]);

    const stats = useMemo(() => {
        if (!event) return { subtotal: 0, fee: 0, total: 0, percent: 0 };
        const basePrice = selectedTicket?.price ?? event.price;
        const subtotal = basePrice * quantity;
        const fee = subtotal * 0.1;
        const percent = (event.availableTickets / event.totalTickets) * 100;
        return { subtotal, fee, total: subtotal + fee, percent };
    }, [selectedTicket, quantity, event]);

    if (!event) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="max-w-[1400px] mx-auto px-8 py-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 text-gray-500 hover:text-black mb-10 font-bold text-xl group"
                >
                    <ArrowLeft
                        size={24}
                        className="group-hover:-translate-x-1 transition-transform"
                    />{' '}
                    Voltar
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/*esquerda*/}
                    <div className="lg:col-span-8 space-y-10">
                        {event.imageUrl && (
                            <div className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-lg border border-gray-100">
                                <img
                                    src={event.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt={event.title}
                                />
                            </div>
                        )}

                        <header className="space-y-6">
                            <Badge className="bg-black text-white px-5 py-2 text-sm uppercase font-black">
                                {event.category}
                            </Badge>
                            <h1 className="text-5xl font-black text-gray-900 leading-tight">
                                {event.title}
                            </h1>
                            <p className="text-gray-600 text-2xl leading-relaxed">
                                {event.description}
                            </p>
                        </header>

                        <SectionCard title="Informações do Evento">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <InfoItem
                                    icon={Calendar}
                                    title="Data"
                                    value="14 de Dezembro de 2025"
                                />
                                <InfoItem
                                    icon={Clock}
                                    title="Horário"
                                    value={event.time}
                                />
                                <InfoItem
                                    icon={MapPin}
                                    title="Local"
                                    value={event.location}
                                />
                                <InfoItem
                                    icon={Users}
                                    title="Disponibilidade"
                                    value={`${event.availableTickets} ingressos disponíveis`}
                                >
                                    <div className="mt-4 w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-indigo-600 h-3 rounded-full transition-all duration-700"
                                            style={{
                                                width: `${stats.percent}%`,
                                            }}
                                        />
                                    </div>
                                </InfoItem>
                            </div>
                        </SectionCard>

                        <SectionCard title="Sobre o Evento">
                            <p className="text-gray-600 text-xl leading-relaxed mb-8">
                                Experiência completa com infraestrutura de ponta
                                e segurança reforçada.
                            </p>
                            <div className="space-y-4 text-xl border-t pt-8 font-medium">
                                <p>
                                    <span className="font-black text-gray-900">
                                        Classificação:
                                    </span>{' '}
                                    Livre para todos os públicos
                                </p>
                                <p>
                                    <span className="font-black text-gray-900">
                                        Entrada:
                                    </span>{' '}
                                    Documento com foto e ingresso digital ou
                                    impresso.
                                </p>
                            </div>
                        </SectionCard>
                    </div>

                    {/*direita(checkout)*/}
                    <aside className="lg:col-span-4">
                        <div className="bg-white rounded-[32px] p-10 shadow-2xl sticky top-10 space-y-10 border border-gray-100">
                            {/*seleção ingreso*/}
                            <div>
                                <label className="text-gray-900 font-bold text-xl block mb-6 uppercase tracking-widest text-center lg:text-left">
                                    Tipo de Ingresso
                                </label>
                                <RadioGroup
                                    value={selectedTicket?.id}
                                    onValueChange={(v) =>
                                        setSelectedTicket(
                                            event.ticketTypes?.find(
                                                (t) => t.id === v
                                            )
                                        )
                                    }
                                    className="space-y-4"
                                >
                                    {event.ticketTypes?.map((t) => (
                                        <div key={t.id} className="relative">
                                            <RadioGroupItem
                                                value={t.id}
                                                id={t.id}
                                                className="sr-only"
                                            />
                                            <Label
                                                htmlFor={t.id}
                                                className={cn(
                                                    'flex justify-between items-center p-6 border-2 rounded-2xl cursor-pointer transition-all',
                                                    selectedTicket?.id === t.id
                                                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                                                        : 'border-gray-100'
                                                )}
                                            >
                                                <div className="space-y-1">
                                                    <div className="font-black text-gray-900 text-2xl">
                                                        {t.name}
                                                    </div>
                                                    <div className="text-lg text-gray-500 font-semibold">
                                                        {t.description}
                                                    </div>
                                                </div>
                                                <div className="font-black text-gray-900 text-2xl ml-4">
                                                    R$ {t.price.toFixed(2)}
                                                </div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {/*quantidade*/}
                            <div className="pt-8 border-t space-y-6">
                                <div>
                                    <label className="text-gray-900 font-bold text-xl block mb-5 uppercase tracking-widest text-center lg:text-left">
                                        Quantidade
                                    </label>
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                            className="h-14 w-14 hover:bg-white active:bg-gray-200"
                                        >
                                            <Minus size={24} />
                                        </Button>
                                        <span className="text-3xl font-black text-gray-900">
                                            {quantity}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.min(10, quantity + 1)
                                                )
                                            }
                                            className="h-14 w-14 hover:bg-white active:bg-gray-200"
                                        >
                                            <Plus size={24} />
                                        </Button>
                                    </div>
                                </div>

                                {/*resumo valores*/}
                                <div className="space-y-4 text-gray-900 font-bold text-xl">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>
                                            R$ {stats.subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxa de serviço</span>
                                        <span>R$ {stats.fee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-4xl font-black text-gray-900 pt-6 border-t border-gray-100">
                                        <span>Total</span>
                                        <span>R$ {stats.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-black text-white py-10 rounded-2xl text-2xl font-black shadow-xl active:scale-95 transition-all"
                                    onClick={() =>
                                        onBuyTickets(
                                            event,
                                            quantity,
                                            selectedTicket
                                        )
                                    }
                                >
                                    Comprar Ingressos
                                </Button>

                                <div className="flex items-center justify-center gap-3 text-lg text-gray-500 font-bold italic">
                                    <ShieldCheck
                                        size={24}
                                        className="text-green-500"
                                    />{' '}
                                    Compra Segura
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

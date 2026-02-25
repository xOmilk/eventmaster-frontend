import { useNavigate } from 'react-router';
import EventDetails from './index';
import type { Event, TicketType } from './index';
import { MOCK_EVENT } from './mockEvent';
import PageRoutesName from '../../constants/PageRoutesName';

export default function EventDetailsPage() {
  const navigate = useNavigate();

  const handleBuy = (event: Event, quantity: number, ticketType?: TicketType) => {
    const cartData = {
      event: {
        title: event.title,
        price: event.price
      },
      quantity: quantity,
      ticketType: ticketType ? {
        name: ticketType.name,
        price: ticketType.price
      } : undefined
    };

    navigate('/checkout', {
      state: { cart: [cartData] },
      replace: false
    });
  };

  const handleBack = () => {
    navigate(PageRoutesName.home);
  };

  return (
    <EventDetails
      event={MOCK_EVENT}
      onBuyTickets={handleBuy}
      onBack={handleBack}
    />
  );
}
import { useQuery } from '@tanstack/react-query';
import { getTicketSummary } from '../api/client';
import { Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const SummaryCards = () => {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['ticketSummary'],
    queryFn: getTicketSummary,
  });

  const cards = [
    {
      title: 'Total Tickets',
      value: summary?.total ?? '-',
      icon: <Ticket className="w-5 h-5 text-primary-600" />
    },
    {
      title: 'Open Tickets',
      value: summary?.open ?? '-',
      icon: <AlertCircle className="w-5 h-5 text-semantic-info" />
    },
    {
      title: 'Pending Tickets',
      value: summary?.inProgress ?? '-',
      icon: <Clock className="w-5 h-5 text-semantic-warning" />
    },
    {
      title: 'Resolved Tickets',
      value: summary?.resolved ?? '-',
      icon: <CheckCircle2 className="w-5 h-5 text-semantic-success" />
    }
  ];

  if (isError) {
    return <div className="text-semantic-danger p-4 enterprise-card">Failed to load summary counts.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border-subtle bg-bg-surface">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className={`p-6 flex flex-col justify-center ${idx !== cards.length - 1 ? 'border-r border-border-subtle' : ''}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {card.icon}
            <p className="text-text-secondary text-sm font-medium">{card.title}</p>
          </div>
          {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 animate-pulse" />
          ) : (
            <h3 className="text-3xl font-bold text-text-primary">
              {card.value}
            </h3>
          )}
        </div>
      ))}
    </div>
  );
};

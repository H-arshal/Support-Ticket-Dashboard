import { useQuery } from '@tanstack/react-query';
import { getTicketSummary } from '../api/client';

const TicketIcon = ({ type, tileColor, inkColor }: { type: 'total' | 'open' | 'pending' | 'resolved', tileColor: string, inkColor: string }) => {
  const isBadge = type !== 'total';
  const transform = isBadge
    ? 'translate(20.5 20.5) rotate(-28) scale(.84) translate(-24 -24)'
    : 'translate(24 24) rotate(-28) scale(1) translate(-24 -24)';
    
  return (
    <svg className="w-[55px] h-[55px] overflow-visible" viewBox="0 0 48 48" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform={transform}>
        <path d="M9 12H13.4A3.6 3.6 0 0 0 20.6 12H39A4 4 0 0 1 43 16V32A4 4 0 0 1 39 36H20.6A3.6 3.6 0 0 0 13.4 36H9A4 4 0 0 1 5 32V16A4 4 0 0 1 9 12Z" stroke={inkColor} />
        <line x1="17" y1="19" x2="17" y2="29.5" strokeDasharray="2.2 3.4" stroke={type === 'total' ? '#0a46f0' : inkColor} />
      </g>
      {isBadge && (
        <g>
          <circle cx="35" cy="35" r="11" fill={tileColor} stroke={inkColor} />
          {type === 'open' && (
            <>
              <line x1="35" y1="29" x2="35" y2="36" stroke={inkColor} />
              <circle cx="35" cy="40.2" r="0.5" stroke={inkColor} />
            </>
          )}
          {type === 'pending' && (
            <path d="M35 29.5V35.5H40" stroke={inkColor} />
          )}
          {type === 'resolved' && (
            <path d="M29.5 35.5L33.2 39.2L40.5 31" stroke={inkColor} />
          )}
        </g>
      )}
    </svg>
  );
};

export const SummaryCards = () => {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['ticketSummary'],
    queryFn: getTicketSummary,
  });

  const cards = [
    { title: 'Total', value: summary?.total ?? '-', type: 'total', tile: '#e1e6f8', ink: '#0b1020' },
    { title: 'Open', value: summary?.open ?? '-', type: 'open', tile: '#e1e6f8', ink: '#0a46f0' },
    { title: 'Pending', value: summary?.inProgress ?? '-', type: 'pending', tile: '#fdebdd', ink: '#c2660b' },
    { title: 'Resolved', value: summary?.resolved ?? '-', type: 'resolved', tile: '#ddf3e4', ink: '#0f8a32' }
  ] as const;

  if (isError) {
    return <div className="text-semantic-danger p-4 enterprise-card">Failed to load summary counts.</div>;
  }

  const getBorderClasses = (idx: number) => {
    if (idx === 0) return 'border-b sm:border-r lg:border-b-0';
    if (idx === 1) return 'border-b lg:border-b-0 lg:border-r';
    if (idx === 2) return 'border-b sm:border-b-0 sm:border-r lg:border-r';
    return '';
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch w-full lg:min-h-[98px] bg-white border border-border-subtle rounded-none overflow-hidden font-sans text-[#0b0b14] shadow-sm">
      
      {/* Title block */}
      <div className="flex-none w-full lg:w-12 h-10 lg:h-auto flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border-subtle">
        <span className="block lg:-rotate-90 text-[15px] tracking-[0.01em] whitespace-nowrap text-text-primary font-bold">
          Tickets
        </span>
      </div>

      {/* Cells */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`flex items-center gap-4 xl:gap-6 p-4 xl:px-7 min-h-[80px] lg:min-h-[98px] border-border-subtle ${getBorderClasses(idx)}`}
          >
            <div 
              className="flex-none w-[55px] h-[55px] rounded-[5px] grid place-items-center"
              style={{ backgroundColor: card.tile }}
            >
                <TicketIcon type={card.type} tileColor={card.tile} inkColor={card.ink} />
            </div>
            
            <div className="flex flex-col justify-between h-[55px] py-0.5">
              <span className="text-[15px] text-[#1c1c28] leading-none">{card.title}</span>
              {isLoading ? (
                <div className="h-8 w-12 bg-gray-200 animate-pulse rounded-none" />
              ) : (
                <span className="text-[32px] font-bold text-[#05050a] leading-none mb-0.5">
                  {card.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

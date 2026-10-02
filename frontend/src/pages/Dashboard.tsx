import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../api/client';
import type { Priority, Status, Ticket } from '../types/ticket';
import { SummaryCards } from '../components/SummaryCards';
import { TicketTable } from '../components/TicketTable';
import { TicketDetailsModal } from '../components/TicketDetailsModal';
import { Search, Filter, RefreshCcw } from 'lucide-react';

export const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [status, setStatus] = useState<Status | undefined>();
  const [priority, setPriority] = useState<Priority | undefined>();
  const [sort, setSort] = useState<string>('createdAt');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  
  // Modal states
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['tickets', { page, search, status, priority, sort, direction }],
    queryFn: () => getTickets(page, 11, search, status, priority, sort, direction),
  });

  const handleSort = (field: string) => {
    if (sort === field) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field);
      setDirection('asc');
    }
    setPage(0);
  };

  return (
    <div className="space-y-4">
      
      {/* Summary Cards */}
      <SummaryCards />

      {/* Controls & Table Area */}
      <div className="space-y-4">
        
        {/* Filter Controls */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-bg-surface p-4 border border-border-subtle">
          
          {/* Left: Title & Search */}
          <div className="flex items-center gap-4 w-full flex-1">
            <h2 className="text-lg font-bold text-text-primary whitespace-nowrap hidden lg:block">Recent Tickets</h2>
            <div className="h-6 w-px bg-border-subtle hidden lg:block"></div>
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary opacity-70" strokeWidth={2.5} />
              <input 
                type="text" 
                placeholder="Search by ticket ID, email or title..." 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="enterprise-input !pl-11 w-full"
              />
            </div>
          </div>
          
          {/* Right: Filters */}
          <div className="flex items-center gap-4 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border-r border-border-subtle pr-4 transition-colors ${showFilters ? 'text-primary-600' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {showFilters && (
              <>
                <select 
                  className="enterprise-input min-w-[140px]"
                  value={status || ''}
                  onChange={(e) => {
                    setStatus(e.target.value ? e.target.value as Status : undefined);
                    setPage(0);
                  }}
                >
                  <option value="">All Statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>

                <select 
                  className="enterprise-input min-w-[140px]"
                  value={priority || ''}
                  onChange={(e) => {
                    setPriority(e.target.value ? e.target.value as Priority : undefined);
                    setPage(0);
                  }}
                >
                  <option value="">All Priorities</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

                <button 
                  onClick={() => {
                    setPage(0);
                    setSearch('');
                    setStatus(undefined);
                    setPriority(undefined);
                  }}
                  className="enterprise-button-secondary px-3 ml-2"
                  title="Reset Filters"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* The Data Table */}
        <TicketTable 
          tickets={data?.content || []} 
          isLoading={isLoading} 
          page={page} 
          totalPages={data?.totalPages || 0}
          setPage={setPage}
          onTicketClick={setSelectedTicket}
          sort={sort}
          direction={direction}
          onSort={handleSort}
        />
      </div>

      <TicketDetailsModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
    </div>
  );
};

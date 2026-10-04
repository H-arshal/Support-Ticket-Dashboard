
import type { Ticket } from '../types/ticket';
import { 
  Hash, User, Calendar, Eye, 
  CircleDot, Clock, CheckCircle2, 
  AlertTriangle, ArrowUpRight, ArrowDownRight,
  ArrowUp, ArrowDown
} from 'lucide-react';

interface TicketTableProps {
  tickets: Ticket[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  onTicketClick: (ticket: Ticket) => void;
  sort?: string;
  direction?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export const TicketTable = ({ tickets, isLoading, page, totalPages, setPage, onTicketClick, sort = 'createdAt', direction = 'desc', onSort }: TicketTableProps) => {
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'OPEN': return <CircleDot className="w-3 h-3 mr-1" />;
      case 'IN_PROGRESS': return <Clock className="w-3 h-3 mr-1" />;
      case 'RESOLVED': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'OPEN': return 'text-semantic-info border-semantic-info bg-blue-50/50';
      case 'IN_PROGRESS': return 'text-semantic-warning border-semantic-warning bg-orange-50/50';
      case 'RESOLVED': return 'text-semantic-success border-semantic-success bg-green-50/50';
      default: return 'text-text-muted border-border-subtle bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'HIGH': return <AlertTriangle className="w-4 h-4 mr-1.5" />;
      case 'MEDIUM': return <ArrowUpRight className="w-4 h-4 mr-1.5" />;
      case 'LOW': return <ArrowDownRight className="w-4 h-4 mr-1.5" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'HIGH': return 'text-semantic-danger';
      case 'MEDIUM': return 'text-semantic-warning';
      case 'LOW': return 'text-semantic-info';
      default: return 'text-text-muted';
    }
  };

  const handleSort = (field: string) => {
    if (onSort) onSort(field);
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) return null;
    return direction === 'asc' ? <ArrowUp className="w-3 h-3 inline ml-1 text-primary-600" /> : <ArrowDown className="w-3 h-3 inline ml-1 text-primary-600" />;
  };

  if (isLoading) {
    return (
      <div className="enterprise-card p-8 flex flex-col items-center justify-center space-y-4 min-h-[300px]">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-text-muted">Loading tickets...</p>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="enterprise-card p-12 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-text-primary text-lg font-medium mb-2">No tickets found</p>
        <p className="text-text-muted">There are currently no tickets matching your filters.</p>
      </div>
    );
  }

  const thClass = "px-4 py-3 font-medium border-r border-border-subtle cursor-pointer hover:bg-gray-50 transition-colors select-none";

  return (
    <div className="enterprise-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-primary text-text-secondary border-b border-border-subtle font-medium">
            <tr>
              <th className={`${thClass} w-16`} onClick={() => handleSort('id')}>
                ID {renderSortIcon('id')}
              </th>
              <th className={thClass} onClick={() => handleSort('title')}>
                Title {renderSortIcon('title')}
              </th>
              <th className={thClass} onClick={() => handleSort('customerEmail')}>
                Customer {renderSortIcon('customerEmail')}
              </th>
              <th className={`${thClass} w-24`} onClick={() => handleSort('priority')}>
                Priority {renderSortIcon('priority')}
              </th>
              <th className={`${thClass} w-24`} onClick={() => handleSort('status')}>
                Status {renderSortIcon('status')}
              </th>
              <th className="px-4 py-3 font-medium cursor-pointer hover:bg-gray-50 transition-colors select-none w-32" onClick={() => handleSort('createdAt')}>
                Created {renderSortIcon('createdAt')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-bg-surface">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                onClick={() => onTicketClick(ticket)}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-4 py-2 text-text-muted border-r border-border-subtle">
                  <div className="flex items-center">
                    <Hash className="w-3.5 h-3.5 mr-1" />
                    {ticket.ticketNumber || ticket.id}
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-text-primary group-hover:text-primary-600 transition-colors border-r border-border-subtle">
                  {ticket.title}
                </td>
                <td className="px-4 py-2 text-text-secondary border-r border-border-subtle">
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5 text-text-muted" />
                    {ticket.customerEmail}
                  </div>
                </td>
                <td className="px-4 py-2 border-r border-border-subtle">
                  <span className={`font-medium flex items-center ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityIcon(ticket.priority)}
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-2 border-r border-border-subtle">
                  <span className={`px-2 py-0.5 text-xs font-medium border ${getStatusColor(ticket.status)} uppercase flex items-center w-fit`}>
                    {getStatusIcon(ticket.status)}
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-2 text-text-secondary flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-text-muted" />
                    {new Date(ticket.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <Eye className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="px-4 py-2 border-t border-border-subtle bg-bg-surface flex items-center justify-between text-sm text-text-secondary">
        <div>
          Showing page <span className="font-medium text-text-primary">{page + 1}</span> of <span className="font-medium text-text-primary">{totalPages || 1}</span>
        </div>
        <div className="flex gap-2">
          <button 
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="enterprise-button-secondary py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
          >
            Previous
          </button>
          <button 
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="enterprise-button-secondary py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

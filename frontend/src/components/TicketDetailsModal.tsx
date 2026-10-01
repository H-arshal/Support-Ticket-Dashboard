import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicket } from '../api/client';
import { 
  X, Loader2, Clock, User, CheckCircle2,
  CircleDot, AlertTriangle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import type { Ticket, Status } from '../types/ticket';

interface TicketDetailsModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

export const TicketDetailsModal = ({ ticket, onClose }: TicketDetailsModalProps) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number, status: Status }) => updateTicket(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticketSummary'] });
      onClose();
    }
  });

  // Reset local state when modal opens with new ticket
  useEffect(() => {
    if (ticket) {
      setSelectedStatus(ticket.status);
    }
  }, [ticket]);

  if (!ticket) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'OPEN': return 'text-semantic-info border-semantic-info bg-blue-50';
      case 'IN_PROGRESS': return 'text-semantic-warning border-semantic-warning bg-orange-50';
      case 'RESOLVED': return 'text-semantic-success border-semantic-success bg-green-50';
      default: return 'text-text-muted border-border-subtle bg-gray-50';
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'OPEN': return <CircleDot className="w-3.5 h-3.5 mr-1.5" />;
      case 'IN_PROGRESS': return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'RESOLVED': return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />;
      default: return null;
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

  const isStatusChanged = selectedStatus !== ticket.status && selectedStatus !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="enterprise-card w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-border-subtle bg-bg-surface">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-text-muted font-medium text-sm">#{ticket.id}</span>
              <span className={`px-2.5 py-1 rounded-none text-xs font-medium border uppercase flex items-center ${getStatusColor(ticket.status)}`}>
                {getStatusIcon(ticket.status)}
                {ticket.status.replace('_', ' ')}
              </span>
              <span className={`text-xs font-semibold uppercase tracking-wider flex items-center ${getPriorityColor(ticket.priority)}`}>
                {getPriorityIcon(ticket.priority)}
                {ticket.priority} PRIORITY
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary leading-tight">{ticket.title}</h2>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 bg-bg-surface">
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider border-b border-border-subtle pb-2">Description</h3>
            <div className="bg-gray-50 border border-border-subtle p-4 text-text-primary whitespace-pre-wrap rounded-none text-sm leading-relaxed">
              {ticket.description}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider border-b border-border-subtle pb-2">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-primary">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-xs text-text-secondary">{ticket.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider border-b border-border-subtle pb-2">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-text-primary">
                  <Clock className="w-4 h-4 mt-0.5 text-text-secondary" />
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-text-secondary">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-primary">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-text-secondary" />
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-text-secondary">
                      {new Date(ticket.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-border-subtle space-y-4">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Update Status</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Status)}
                className="enterprise-input sm:max-w-xs"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              
              <button
                disabled={!isStatusChanged || updateMutation.isPending}
                onClick={() => updateMutation.mutate({ id: ticket.id, status: selectedStatus as Status })}
                className="enterprise-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

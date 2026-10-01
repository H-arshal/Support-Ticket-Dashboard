
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '../api/client';
import { X, Loader2, Plus } from 'lucide-react';
import type { Priority } from '../types/ticket';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TicketForm {
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TicketForm>({
    defaultValues: {
      priority: 'MEDIUM'
    }
  });

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticketSummary'] });
      reset();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="enterprise-card w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        <div className="flex justify-between items-center p-5 border-b border-border-subtle bg-bg-surface">
          <h2 className="text-xl font-bold text-text-primary">Create New Ticket</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 space-y-5 bg-bg-surface">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
            <input 
              {...register('title', { required: 'Title is required' })} 
              className="enterprise-input"
              placeholder="Brief summary of the issue"
            />
            {errors.title && <p className="text-semantic-danger text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <textarea 
              {...register('description', { required: 'Description is required' })} 
              className="enterprise-input min-h-[120px] resize-y"
              placeholder="Provide detailed information..."
            />
            {errors.description && <p className="text-semantic-danger text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Customer Email</label>
            <input 
              type="email"
              {...register('customerEmail', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })} 
              className="enterprise-input"
              placeholder="john@example.com"
            />
            {errors.customerEmail && <p className="text-semantic-danger text-xs mt-1">{errors.customerEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Priority</label>
            <select 
              {...register('priority')} 
              className="enterprise-input"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="enterprise-button-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="enterprise-button-primary min-w-[120px]"
            >
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Create Ticket</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

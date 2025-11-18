import { AlertTriangle, X, AlertCircle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'bg-red-50 text-red-600',
      iconRing: 'ring-red-100',
      button: 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-600/25',
      IconComponent: AlertTriangle,
    },
    warning: {
      icon: 'bg-amber-50 text-amber-600',
      iconRing: 'ring-amber-100',
      button: 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-lg hover:shadow-amber-600/25',
      IconComponent: AlertCircle,
    },
    info: {
      icon: 'bg-blue-50 text-blue-600',
      iconRing: 'ring-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/25',
      IconComponent: Info,
    },
  };

  const styles = variantStyles[variant];
  const IconComponent = styles.IconComponent;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start gap-4 p-6">
          <div className={`flex-shrink-0 rounded-xl p-3 ring-4 ${styles.icon} ${styles.iconRing}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-3 border-t border-slate-200 p-4 bg-slate-50/50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:border-slate-400"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

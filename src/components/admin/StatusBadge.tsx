interface StatusBadgeProps {
  status: 'activo' | 'pendiente' | 'critico';
}

const STATUS_STYLES = {
  activo: 'bg-success/15 text-success border-success/20',
  pendiente: 'bg-warning/15 text-warning border-warning/20',
  critico: 'bg-danger/15 text-danger border-danger/20',
};

const STATUS_LABELS = {
  activo: 'Activo',
  pendiente: 'Pendiente',
  critico: 'Crítico',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${STATUS_STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'activo' ? 'bg-success' : status === 'pendiente' ? 'bg-warning' : 'bg-danger'
      }`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

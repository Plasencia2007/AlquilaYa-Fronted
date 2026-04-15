import { Building } from 'lucide-react';

export default function AdminPropertiesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-admin-text">Verificación de Propiedades</h1>
        <p className="text-sm text-admin-text-muted mt-1">Revisa y aprueba las propiedades listadas</p>
      </div>

      <div className="bg-admin-surface border border-admin-border rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-admin-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-admin-accent" />
        </div>
        <h2 className="text-lg font-semibold text-admin-text mb-2">Módulo en desarrollo</h2>
        <p className="text-sm text-admin-text-muted max-w-md mx-auto">
          Aquí se mostrarán las propiedades pendientes de verificación con fotos, documentos y acciones de aprobación/rechazo.
        </p>
      </div>
    </div>
  );
}

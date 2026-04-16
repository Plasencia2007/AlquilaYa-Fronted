import { Propiedad } from '@/types/propiedad';
import { MOCK_PROPIEDADES } from '@/mocks/propiedades';

export const servicioPropiedades = {
  obtenerTodas: async (): Promise<Propiedad[]> => {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_PROPIEDADES;
  },

  obtenerPorId: async (id: string): Promise<Propiedad | null> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const propiedad = MOCK_PROPIEDADES.find(p => p.id === id);
    return propiedad || null;
  },

  buscar: async (filtros: { ubicacion?: string; precioMaximo?: number; tipo?: string }): Promise<Propiedad[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return MOCK_PROPIEDADES.filter(p => {
      if (filtros.ubicacion && !p.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase())) return false;
      if (filtros.precioMaximo && p.precio > filtros.precioMaximo) return false;
      if (filtros.tipo && p.tipo !== filtros.tipo) return false;
      return true;
    });
  }
};

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  landlordId: string;
  landlordName: string;
  rating: number;
  reviews: number;
  available: boolean;
  type: 'cuarto' | 'departamento' | 'estudio';
}

export interface AdminMetric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export interface RecentActivity {
  id: string;
  type: 'reserva' | 'registro' | 'verificacion' | 'alerta';
  description: string;
  user: string;
  timestamp: string;
  status: 'activo' | 'pendiente' | 'critico';
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Cuarto Luminoso en Miraflores',
    description: 'Hermoso cuarto amoblado con vista al parque. Ideal para estudiantes universitarios. Incluye Wi-Fi, agua y luz.',
    price: 850,
    location: 'Miraflores, Lima',
    address: 'Av. Larco 456, Miraflores',
    images: ['/rooms/room-1.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 18,
    amenities: ['Wi-Fi', 'Agua caliente', 'Cocina compartida', 'Lavandería'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.8,
    reviews: 24,
    available: true,
    type: 'cuarto',
  },
  {
    id: '2',
    title: 'Estudio Moderno en San Isidro',
    description: 'Estudio completamente equipado en zona financiera. Perfecto para profesionales jóvenes. Edificio con seguridad 24/7.',
    price: 1200,
    location: 'San Isidro, Lima',
    address: 'Calle Las Begonias 123, San Isidro',
    images: ['/rooms/room-2.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    amenities: ['Wi-Fi', 'Gimnasio', 'Estacionamiento', 'Seguridad 24/7'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.6,
    reviews: 18,
    available: true,
    type: 'estudio',
  },
  {
    id: '3',
    title: 'Cuarto Acogedor en Barranco',
    description: 'Cuarto en casa compartida en el corazón de Barranco. Cerca de la vida cultural y nocturna. Ambiente bohemio y tranquilo.',
    price: 650,
    location: 'Barranco, Lima',
    address: 'Jr. Unión 789, Barranco',
    images: ['/rooms/room-3.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 15,
    amenities: ['Wi-Fi', 'Terraza', 'Cocina compartida', 'Mascotas permitidas'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.9,
    reviews: 32,
    available: true,
    type: 'cuarto',
  },
  {
    id: '4',
    title: 'Departamento Compartido en Jesús María',
    description: 'Habitación en departamento compartido. Zona céntrica con acceso a transporte público. Ambiente joven y estudiantil.',
    price: 550,
    location: 'Jesús María, Lima',
    address: 'Av. Brasil 2345, Jesús María',
    images: ['/rooms/room-4.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 14,
    amenities: ['Wi-Fi', 'Agua caliente', 'Cable', 'Limpieza semanal'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.3,
    reviews: 12,
    available: true,
    type: 'cuarto',
  },
  {
    id: '5',
    title: 'Mini Depa en Pueblo Libre',
    description: 'Mini departamento independiente con kitchenette. Ideal para quienes buscan privacidad completa. Cerca de la PUCP.',
    price: 950,
    location: 'Pueblo Libre, Lima',
    address: 'Av. Universitaria 567, Pueblo Libre',
    images: ['/rooms/room-5.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 28,
    amenities: ['Wi-Fi', 'Kitchenette', 'Entrada independiente', 'Estacionamiento'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.7,
    reviews: 21,
    available: false,
    type: 'departamento',
  },
  {
    id: '6',
    title: 'Cuarto Premium en Surco',
    description: 'Cuarto amplio y moderno en residencial de Surco. Baño privado, closet empotrado y escritorio de trabajo incluido.',
    price: 1100,
    location: 'Surco, Lima',
    address: 'Calle Monte Rosa 890, Surco',
    images: ['/rooms/room-6.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    area: 22,
    amenities: ['Wi-Fi', 'Baño privado', 'Escritorio', 'Aire acondicionado'],
    landlordId: '2',
    landlordName: 'María Proveedora',
    rating: 4.5,
    reviews: 15,
    available: true,
    type: 'cuarto',
  },
];

export const ADMIN_METRICS: AdminMetric[] = [
  { label: 'Usuarios Activos', value: '2,847', change: 12.5, changeLabel: 'vs mes anterior' },
  { label: 'Propiedades Listadas', value: '1,234', change: 8.2, changeLabel: 'vs mes anterior' },
  { label: 'Reservas del Mes', value: '486', change: -3.1, changeLabel: 'vs mes anterior' },
  { label: 'Ingresos Plataforma', value: 'S/ 48,520', change: 15.7, changeLabel: 'vs mes anterior' },
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: '1', type: 'reserva', description: 'Nueva reserva en Cuarto Luminoso - Miraflores', user: 'Carlos E.', timestamp: 'Hace 5 min', status: 'activo' },
  { id: '2', type: 'registro', description: 'Nuevo proveedor registrado', user: 'Ana Torres', timestamp: 'Hace 15 min', status: 'pendiente' },
  { id: '3', type: 'verificacion', description: 'Propiedad en Barranco requiere verificación', user: 'Sistema', timestamp: 'Hace 1 hora', status: 'pendiente' },
  { id: '4', type: 'alerta', description: 'Reporte de usuario sobre propiedad #45', user: 'Pedro M.', timestamp: 'Hace 2 horas', status: 'critico' },
  { id: '5', type: 'reserva', description: 'Reserva confirmada - Estudio San Isidro', user: 'Laura G.', timestamp: 'Hace 3 horas', status: 'activo' },
  { id: '6', type: 'registro', description: 'Nuevo estudiante registrado', user: 'Diego R.', timestamp: 'Hace 4 horas', status: 'activo' },
];

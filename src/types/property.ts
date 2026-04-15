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

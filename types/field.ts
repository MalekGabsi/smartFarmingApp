export type Field = {
  id: string;
  name: string;
  size: number;
  sizeUnit: 'ha' | 'acre';
  cropType: string;
  soilType: string;
  plantingDate: string;
  harvestDate: string;
  status: 'active' | 'fallow' | 'planned';
  image: string;
};
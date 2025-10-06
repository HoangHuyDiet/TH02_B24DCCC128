export interface Country {
  name: {
    common: string;
    official?: string; 
  };
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  region: string;
}
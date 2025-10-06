export interface CurrencyData {
  base: string; 
  rates: {
    [key: string]: number; 
  };
}
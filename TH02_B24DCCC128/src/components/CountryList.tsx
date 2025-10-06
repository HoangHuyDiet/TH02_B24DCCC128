import React from 'react';
import type { Country } from '../types/country.ts';

interface CountryListProps {
  countries: Country[];
  onCountryClick: (countryName: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onCountryClick }) => {
  if (countries.length === 0) {
    return <p>Không tìm thấy quốc gia nào.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {countries.map(country => (
        <div 
          key={country.name.common} 
          onClick={() => onCountryClick(country.name.common)} 
          style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            cursor: 'pointer',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <img 
            src={country.flags.png} 
            alt={`Cờ của ${country.name.common}`} 
            style={{ width: '100%', height: '100px', objectFit: 'cover', marginBottom: '10px' }} 
          />
          <p><strong>Tên:</strong> {country.name.common}</p>
          <p><strong>Dân số:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Khu vực:</strong> {country.region}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
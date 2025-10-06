import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Country } from '../types/country';

interface CountryDetailProps {
    allCountries: Country[]; 
}

const CountryDetail: React.FC<CountryDetailProps> = ({ allCountries }) => {
  const { countryName } = useParams<{ countryName: string }>();

  const country = allCountries.find(c => c.name.common === countryName);

  if (!country) {
    return (
        <div>
            <p>Không tìm thấy thông tin chi tiết cho quốc gia "{countryName}".</p>
            <Link to="/bai1">Quay lại danh sách</Link>
        </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <Link to="/bai1" style={{ display: 'block', marginBottom: '15px' }}>&larr; Quay lại danh sách</Link>
      
      <img 
        src={country.flags.svg} 
        alt={`Cờ của ${country.name.common}`} 
        style={{ width: '150px', border: '1px solid #000' }} 
      />
      
      <h3>{country.name.common} ({country.name.official ?? 'N/A'})</h3>
      <p><strong>Dân số:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Khu vực:</strong> {country.region}</p>
    </div>
  );
};

export default CountryDetail;
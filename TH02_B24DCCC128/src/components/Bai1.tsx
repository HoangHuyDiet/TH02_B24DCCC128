import React, { useState, useRef } from "react";
import axios from "axios";
import type { Country } from "../types/country.ts";
import CountryList from './CountryList.tsx';
import CountryDetail from "./CountryDetail.tsx";
import { Routes, Route, useNavigate } from 'react-router-dom';

const Bai1: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const dataFetchedRef = useRef(false);

    if (!dataFetchedRef.current) {
        dataFetchedRef.current = true;
        axios
            .get<Country[]>("https://restcountries.com/v3.1/all?fields=name,flags,population,region")
            .then((res) => setCountries(res.data))
            .catch((err) => console.error("Lỗi tải dữ liệu quốc gia:", err))
            .finally(() => setLoading(false));
    }

    const filteredCountries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const handleCountryClick = (countryName: string) => {
        navigate(countryName);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        navigate('/bai1'); 
    };

    if (loading) return <div>Đang tải dữ liệu quốc gia...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Bài 1: Tra cứu Quốc gia</h2>
            <input
                type="text"
                placeholder="Tìm quốc gia..."
                value={search}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <CountryList
                            countries={filteredCountries}
                            onCountryClick={handleCountryClick}
                        />
                    }
                />
                <Route
                    path=":countryName"
                    element={<CountryDetail allCountries={countries} />}
                />
            </Routes>
        </div>
    );
};

export default Bai1;
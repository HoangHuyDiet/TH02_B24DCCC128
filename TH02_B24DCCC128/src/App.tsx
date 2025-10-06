import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Bai1 from "./components/Bai1.tsx"; 
import Bai2 from "./components/Bai2.tsx"; 
import Bai3 from "./components/Bai3.tsx"; 

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <nav
                style={{
                    display: "flex",
                    gap: "20px",
                    padding: "10px",
                    background: "#eee",
                    marginBottom: '20px'
                }}
            >
                <Link to="/bai1">Bài 1: Quốc gia</Link> 
                <Link to="/bai2">Bài 2: Tỷ giá</Link>
                <Link to="/bai3">Bài 3: Phim</Link>
            </nav>

            <div style={{ padding: '0 20px' }}>
                <Routes>
                    <Route path="/" element={<Bai1 />} /> 

                    {/* DÙNG /* CHO ROUTER LỒNG */}
                    <Route path="/bai1/*" element={<Bai1 />} /> 

                    <Route path="/bai2" element={<Bai2 />} />

                    {/* DÙNG /* CHO ROUTER LỒNG */}
                    <Route path="/bai3/*" element={<Bai3 />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
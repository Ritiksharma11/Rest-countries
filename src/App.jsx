import React from 'react'
import Countries from './components/Countries'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Country from './components/Country'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Countries />} />
                <Route path='/:name' element={<Country />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App
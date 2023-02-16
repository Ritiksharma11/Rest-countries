import React, { useState } from 'react'
import { useEffect } from 'react'
import Article from './Article'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState()

    const regions = [
        {
            name: 'Select by region'
        },
        {
            name: 'Asia'
        },
        {
            name: 'Europe'
        },
        {
            name: 'Americas'
        },
        {
            name: 'Africa'
        },
        {
            name: 'Oceania'
        },
    ]

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data);

            } catch (error) {
                console.log(error)
            }
        }

        getCountries();

    }, [])

    async function searchCountry() {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
            {
                if (!res.ok) {
                    throw Error('Not found');
                }
                else {
                    const data = await res.json();
                    setCountries(data);
                }
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    async function filterByRegion(region) {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
            {
                if (!res.ok) {
                    throw Error('Error');
                }
                else {
                    const data = await res.json();
                    setCountries(data);
                }

            }

        }
        catch (error) {
            console.log(error);

        }
    }


    const handleSearch = (e) => {
        e.preventDefault();
        searchCountry();
    }

    const handleFilter = (e) => {
        e.preventDefault();
        filterByRegion();
    }

    return (
        <>
            {
                !countries ? <h1 className='bg-slate-900 h-screen text-white text-5xl font-semibold flex justify-center items-center'>Loading...</h1> :
                    <section className='bg-slate-900 text-white p-5 min-h-screen'>

                        <div className='flex flex-col md:flex-row md:justify-between md:items-center md:gap-5 md:mb-8'>
                            <form onSubmit={handleSearch} autoComplete='off' className='max-w-5xl md:flex-1'>
                                <input type="text" name='search' id='search'
                                    placeholder='Search for a country...' required
                                    value={search} onChange={(e) => { setSearch(e.target.value) }}
                                    className='py-1 px-2 outline-none font-semibold text-lg rounded-md text-black w-full'
                                />
                            </form>

                            <form onSubmit={handleFilter}>
                                <select name="filterByRegion" id="filterByRegion"
                                    className='text-black rounded-sm my-5 outline-none py-1 px-2 w-40 '
                                    value={regions.name} onChange={(e) => filterByRegion(e.target.value)}
                                >
                                    {
                                        regions.map((region, index) => (
                                            <option key={index} value={region.name}>{region.name}</option>
                                        ))
                                    }
                                </select>
                            </form>
                        </div>

                        {/* {error && <div className='py-4'>{error}</div>}
                        {
                            error ? <div className='py-4'><Error/></div> : ''
                        } */}
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
                            {
                                countries.map((country) => (
                                    <Article key={country.name.common} {...country} />
                                )
                                )
                            }
                        </div>
                    </section>
            }
        </>
    )
}

export default Countries
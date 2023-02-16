import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Country = () => {
    const [country, setCountry] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        const getCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const data = await res.json();
                setCountry(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCountry();
    }, [name])

    return (
        <>
            <section className='p-5 md:py-0 bg-slate-900 text-white'>
                {
                    country.map((item) => (
                        <div key={item.population} className='flex flex-col justify-center md:grid md:gap-20 md:grid-cols-2 md:place-items-center h-[calc(100vh-2.5rem)] md:h-screen max-w-6xl mx-auto'>
                            <article>
                                <img src={item.flags.svg} alt={item.name.common} className='max-h-72 mb-5 lg:max-h-80' />
                            </article>

                            <article>
                                <h1 className='font-bold text-2xl lg:text-4xl '>{item.name.official}</h1>
                                <ul className='my-2 flex flex-col gap-1 text-lg mb-5'>
                                    <li><span className='font-bold'>Capital: </span>{item.capital[0]}</li>
                                    <li><span className='font-bold'>Population: </span>{item.population.toLocaleString()}</li>
                                    <li><span className='font-bold'>Region:</span> {item.region} </li>
                                    <li><span className='font-bold'>SubRegion:</span> {item.subregion} </li>
                                </ul>

                                {
                                    item.borders && (
                                        <>
                                            <h3 className='font-bold text-lg'>Borders:</h3>
                                            <ul className='flex gap-2 mb-5'>
                                                {
                                                    item.borders.map((border, index) => (
                                                        <li className='bg-gray-800 p-1 rounded-md' key={index}>{border}</li>
                                                    )
                                                    )
                                                }
                                            </ul>
                                        </>
                                    )
                                }

                                <Link to='/' className=' bg-gray-700 p-2 text-center rounded-md'>&larr;Back</Link>

                            </article>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default Country
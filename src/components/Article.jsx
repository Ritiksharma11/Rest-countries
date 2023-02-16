import React from 'react'
import { Link } from 'react-router-dom'

const Article = ({ flags, name, population, region, subregion }) => {
    return (
        <Link to={`/${name.official}`}>
            <article className='bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 duration-200 '>
                <img src={flags.svg} alt="flag" className='h-64 max-w-[32rem] md:h-64 w-full object-cover' />
                <div className='p-4'>
                    <h2 className='font-bold text-lg my-2 '>{name.common}</h2>
                    <ul className='flex flex-col gap-1 font-semibold'>
                        <li>Population:{population.toLocaleString()}</li>
                        <li>Region:{region}</li>
                        <li>SubRegion:{subregion}</li>
                    </ul>
                </div>
            </article>
        </Link>
    )
}

export default Article

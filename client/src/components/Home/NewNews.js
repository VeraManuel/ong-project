import React, { useState, useEffect } from 'react';
//Link to go new news
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewNews = () => {
    const [news, setNews] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/news`)
            .then(res => {
                setNews(res.data.data)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [])

    return (
        <div className="flex flex-col justify-center items-center py-12">
            <h1 className=" my-4 text-3xl font-extrabold tracking-tight lg:text-4xl">Ùltimas Novedades</h1>
            <div className="flex flex-col items-center lg:flex-row pt-4">
                {news?.slice(0, 4).map(item =>
                    <Link style={{ textDecoration: "none" }} key={`${item.id}`} to={`/news/${item.id}`}>
                        <CardNews item={item} />
                    </Link>)}
            </div>
            <div className="flex justify-center items-center">
                <Link style={{ textDecoration: "none" }} to="/news" className="py-2 px-5 bg-blue-400 text-white my-3 rounded">
                    Ver mas
                </Link>
            </div>
        </div>
    );
}

export default NewNews;

const CardNews = ({ item }) => {
    return (
        <div className="news-card" style={{ backgroundImage: `url(${item.image})` }}>
            <h1 className="news-title">
                {item.name}
            </h1>
            <style jsx>{`
                .news-card {
                    display: flex; 
                    justify-content: center;
                    align-items: center;
                    margin: 10px;
                    width: 300px;
                    height: 210px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    position: relative;
                }
                .news-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    padding: 0.25rem;
                    background: #fafa88; 
                }
            
            `}</style>
        </div>
    )
}
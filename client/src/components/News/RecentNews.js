import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './NewsDetail.scss';

const RecentNews = () => {
    const [recentNews, setRecentNews] = useState([]);

    const getRecentNews = async () => {
        try {
            const newsRes = await axios.get(`${process.env.REACT_APP_API}/news`);
            setRecentNews(newsRes.data.data.slice(0,3));
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        getRecentNews();
    }, [])

    return (
        <div className="newsDetail__linksContainer">
            <div className="newsDetail__linksHeader">
                Novedades recientes
            </div>
            <ul className="newsDetail__list">
                {recentNews.map((item, i) => (
                    <li key={`news ${i}`} className="newsDetail__item"><Link className="newsDetail__link" to={`/news/${item.id}`}>{item.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default RecentNews

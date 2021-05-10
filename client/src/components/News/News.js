import React, {useState, useEffect} from 'react';
import useAxios from '../../hooks/useAxios';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './News.scss'


const News = () => {

    const [news, setNews] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [responseData, setResponseData] = useState({
        state: true,
        message: "Cargando...",
      });
    const {send} =useAxios()

    const getNews = async () => {
        try {
            const newsRes = await send({url:`/news`,method:'get'});
            console.log(newsRes)
            newsRes.data.OK
            ? setNews(newsRes.data.data)
            : setNews([]);
        } catch (error) {
            setResponseData({
                state: true,
                message: `Ha ocurrido un error ${
                  error.response ? error.response.status : 503
                } al intentar mostrar las novedades: ${error.response}`,
              });
              setTimeout(() => {
                setResponseData({ state: false, message: "" });
              }, 5000);
              console.log(responseData.message)
        }
    };

    useEffect(()=>{
        getNews();
    }, [])

    const newsPerPage = 10;
    const pagesVisited = pageNumber * newsPerPage;
    const pageCount = Math.ceil(news.length / newsPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const displayNews = news
    .slice(pagesVisited, pagesVisited + newsPerPage)
    .map((item, i)=>(
        <div key={`news ${i}`} className="newsCard">
        <Link to={`/news/${item.id}`}>
            <img className="newsCard__image" src={item.image} alt={item.name} />
            <h2 className="newsCard__title font-semibold">{item.name}</h2>
        </Link>
        </div>
        ))

    return (
        <React.Fragment>
            <h1 className="news__title text-3xl font-semibold">Últimas Noticias</h1>
            {news.length === 0 ? (
                <div className="h-screen my-10 font-semibold">No hay noticias todavía</div>
            ) : (
                <>
                    <div className="news__container">
                        {displayNews}
                    </div>
                    <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                    />
                </>
            )} 
            
        </React.Fragment>
    )
}

export default News

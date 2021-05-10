import React, {useState, useEffect} from 'react';
import useAxios from '../../hooks/useAxios';
import {useRouteMatch} from 'react-router-dom';
import Moment from 'react-moment';
import './NewsDetail.scss';
import RecentNews from './RecentNews';



const NewsDetail = () => {
    const match = useRouteMatch();
    const [newsDetail, setNewsDetail] = useState({});
    const [responseData, setResponseData] = useState({
        state: true,
        message: "Cargando...",
      });
    const {send} =useAxios()

    const getNewsDetail = async () => {
        try {
            const newsDetailRes = await send({url:`/news/${match.params.id}`,method:'get'});
            setNewsDetail(newsDetailRes.data.data);
            setResponseData({
                state: false,
                message: ``,
              });
        } catch (error) {
            setResponseData({
                state: true,
                message: `Ha ocurrido un error ${
                  error.response ? error.response.status : 503
		} al intentar mostrar el detalle de la noticia: ${ error.response && error.response.data.message}`,
              });
        }
    };

    useEffect(()=>{
        getNewsDetail();
    }, [match.params.id])

    return (
        <React.Fragment>
            {responseData.state ?  (
                <div className="errorMessage">{responseData.message}</div>
            ) : (
                <React.Fragment>
                    <h1 className="newsDetail__heading">{newsDetail.name}</h1>
                    <p className="newsDetail__createdAt"><Moment format="D MMM YYYY hh:mm">{newsDetail.createdAt}</Moment></p>
                    <div className="newsDetail">
                    <div className="newsDetail__container">
                        <div className="newsDetail__imageContainer"> 
                            <img className="newsDetail__image" src={newsDetail.image} alt={newsDetail.name}/>
                        </div>
		      <p 
			className="newsDetail__text"
			dangerouslySetInnerHTML={{ __html: newsDetail.content }}
		      ></p>
                    </div>
                    <RecentNews />
                </div>
                </React.Fragment>
                
            )}
        </React.Fragment>
    )
}
export default NewsDetail

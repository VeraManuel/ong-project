import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Activity.scss'
import { LoaderDots } from '../Loader/Loader'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

const Activities = () => {

    const [activities, setActivities] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [loader, setLoader] = useState(true)

    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_API}/activities/`)
            .then(response => {
                setActivities(response.data.data)
                setLoader(false)
            })
            .catch(err => {
                setLoader(false)
            })
    }, []);

    if (loader) {
        return (
            <div className="loader-container">
                <div>
                    <LoaderDots />
                </div>
            </div>
        )
    }
    const activitiesPerPage = 12;
    const pagesVisited = pageNumber * activitiesPerPage;
    const pageCount = Math.ceil(activities.length / activitiesPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const displayActivities = activities
    .slice(pagesVisited, pagesVisited + activitiesPerPage)
    .map((item, i)=>(
        <div key={`news ${i}`} className="newsCard">
        <Link to={`/activities/${item.id}`}>
            <img className="newsCard__image" src={item.image} alt={item.name} />
            <h2 className="newsCard__title font-semibold">{item.name}</h2>
        </Link>
        </div>
        ))

    return (
        <React.Fragment>
        <h1 className="news__title text-3xl font-semibold">Últimas Actividades</h1>
        {activities.length === 0 ? (
            <div className="h-screen my-10 font-semibold">No hay actividades todavía</div>
        ) : (
            <>
                <div className="news__container">
                    {displayActivities}
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

export default Activities;


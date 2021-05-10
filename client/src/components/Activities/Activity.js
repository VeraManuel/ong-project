import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Activity.scss'
import { LoaderDots } from '../Loader/Loader'


const Activity = () => {
    const { id } = useParams()
    const [activity, setActivity] = useState({})
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/activities/${id}`)
            .then(response => {
                setActivity(response.data.data)
                setLoader(false)
            })
            .catch(err => {
                setError(true)
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

    if (error) {
        return (
            <div className="error-container">
                <div >
                    <h1 className="error-title">No pudimos encontrar la pagina que estas buscando</h1>
                    <img className="error__img" src="/images/404.png" alt="" />
                </div>
            </div>
        )
    }

    return (
        <main >
            <div className="activity-container">

                <h1 className="activity-title">{activity.name}</h1>
                <img className="activity-image" src={activity.image} alt="activity" />
                <p 
		  className="activity-paragraph"
		  dangerouslySetInnerHTML={{ __html: activity.content }}
		>
                </p>
            </div>
        </main>
    )
}

export default Activity;

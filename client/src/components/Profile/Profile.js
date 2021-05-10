import React, { useState } from 'react';
import './profile.scss';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from './Form/Form';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';


const Profile = () => {
    const { user } = useSelector((state) => state.user);

    const [userInfo, setuserInfo] = useState(user)

    return (
        <div className="container__profile">
            <div className="sidebar">
                <ul className="sidebar__list">
                    <li className="sidebar__element"><Link style={{ textDecoration: "none" }} to="/profile">Informacion</Link></li>
                    <li className="sidebar__element"><Link style={{ textDecoration: "none" }} to="/profile/edit-profile">Editar</Link></li>
                </ul>
            </div>

            <main className="main">
                <Switch>
                    <Route path="/profile/edit-profile" >

                        <Form userInfo={userInfo} setuserInfo={setuserInfo} />
                    </Route>

                    <Route exact path="/profile/">
                        <ProfileInfo userInfo={userInfo} />
                    </Route>
                </Switch>

            </main>
        </div>
    )
}

export default Profile



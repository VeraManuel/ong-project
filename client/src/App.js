import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.scss";
import { useSelector } from "react-redux";

//components
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";
import Contents from "./components/Contents/Contents.js";
import Admin from "./components/Admin/Admin.js";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact/Contact";
import News from "./components/News/News";
import NewsDetail from "./components/News/NewsDetail";
import Activities from "./components/Activities/Activities";
import Activity from "./components/Activities/Activity";
import ActivityForm from "./components/Admin/ActivityForm";
import NewsForm from "./components/Admin/NewsForm";
import BackOffice from "./components/BackOffice/BackOffice";
import BackofficeNews from "./components/Admin/BackofficeNews";
import BackofficeActivities from "./components/Admin/BackofficeActivities";
import BackofficeTestimonials from "./components/Admin/BackofficeTestimonials";
import Categories from "./components/BackOffice/Categories";
import EditOrganization from "./components/Organization/EditOrganization";
import TestimonyForm from "./components/Admin/TestimonyForm";
import CategoryForm from "./components/Admin/CategoryForm";
import BackofficeContacts from "./components/Admin/BackofficeContacts";
import HomeEdit from "./components/Admin/FormEditHome";
import Profile from "./components/Profile/Profile";
import Testimonial from "./components/Testimonials/Testimonials";

function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  if (user) {
    if (user.isAdmin) {
      var routes = (
        <TransitionGroup>
          <CSSTransition timeout={500} classNames="route" key={location.key}>
            <Switch>
              <Route exact path="/backoffice/editHome" component={HomeEdit} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/edit-profile" component={Profile} />
              <Route
                exact
                path="/backoffice/activity-form/"
                component={ActivityForm}
              />
              <Route
                exact
                path="/backoffice/activity-form/:id"
                component={ActivityForm}
              />
              <Route
                exact
                path="/backoffice/testimony-form/:id"
                component={TestimonyForm}
              />
              <Route
                exact
                path="/backoffice/testimony-form/"
                component={TestimonyForm}
              />
              <Route
                exact
                path="/backoffice/category-form/"
                component={CategoryForm}
              />
              <Route
                exact
                path="/backoffice/category-form/:id"
                component={CategoryForm}
              />
              <Route exact path="/backoffice/news-form/" component={NewsForm} />
              <Route
                exact
                path="/backoffice/news-form/:id"
                component={NewsForm}
              />
              <Route exact path="/backoffice/news" component={BackofficeNews} />
              <Route
                exact
                path="/backoffice/edit-organization"
                component={EditOrganization}
              />
              <Route exact path="/backoffice" component={BackOffice} />
              <Route
                exact
                path="/backoffice/activities"
                component={BackofficeActivities}
              />
              <Route
                exact
                path="/backoffice/contacts"
                component={BackofficeContacts}
              />
              <Route
                exact
                path="/backoffice/testimonials"
                component={BackofficeTestimonials}
              />
              <Route exact path="/backoffice/category" component={Categories} />
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/news" component={News} />
              <Route exact path="/testimonial" component={Testimonial} />
              <Route exact path="/news/:id" component={NewsDetail} />
              <Route exact path="/activities" component={Activities} />
              <Route exact path="/activities/:id" component={Activity} />
              <Route path="/contents/:id" component={Contents} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      );
    } else {
      var routes = (
        <TransitionGroup>
          <CSSTransition timeout={500} classNames="route" key={location.key}>
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/edit-profile" component={Profile} />

              <Route exact path="/backoffice" component={BackOffice} />
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/news" component={News} />
              <Route exact path="/testimonial" component={Testimonial} />
              <Route exact path="/news/:id" component={NewsDetail} />
              <Route exact path="/activities" component={Activities} />
              <Route exact path="/activities/:id" component={Activity} />
              <Route path="/contents/:id" component={Contents} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      );
    }
  } else {
    var routes = (
      <TransitionGroup>
        <CSSTransition timeout={500} classNames="route" key={location.key}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/news" component={News} />
            <Route exact path="/testimonial" component={Testimonial} />
            <Route exact path="/news/:id" component={NewsDetail} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/activities/:id" component={Activity} />
            <Route path="/contents/:id" component={Contents} />
            <Redirect to="/" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
  return (
    <>
      <Header />
      <Switch>
        <div className="App">{routes}</div>
      </Switch>
      <Footer />
    </>
  );
}

export default App;

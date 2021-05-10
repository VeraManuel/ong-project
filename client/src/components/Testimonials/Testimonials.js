import axios from "axios";
import React, { useState, useEffect } from "react";
import { LoaderDots } from "../Loader/Loader";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/testimonials/`)
      .then((response) => {
        setTestimonial(response.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  if (loader) {
    return (
      <div className="loader-container">
        <div>
          <LoaderDots />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-56">
      <h1 className=" my-4 text-3xl font-extrabold tracking-tight lg:text-4xl mx-auto">
        Testimonios
      </h1>
      <div className="flex max-w-6xl mx-auto flex-wrap justify-center">
        {testimonial.length !== 0 ? (
          testimonial.map((testimonial) => (
            <div
              className=" sm:w-80 shadow-xl bg-gray-100 mx-2 my-3 px-2 py-4 rounded-lg"
              key={testimonial.id}
            >
              <img
                className="mx-auto rounded-full h-12 w-12"
                src={testimonial.image}
                alt=""
              />

              <p
                className="py-4"
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              ></p>
              <div className="font-semibold">{testimonial.name}</div>
            </div>
          ))
        ) : (
          <div className="h-screen"></div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;

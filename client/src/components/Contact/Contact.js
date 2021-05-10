import axios from "axios";
import React, { useState } from "react";
import { contactSchema } from "../../validations/ContactValidations";

const message = {
  name: "",
  email: "",
  phone: undefined,
  message: "",
};

const Contact = () => {
  const [errorForm, setErrorForm] = useState(false);
  const [succesMessage, setSuccessMessage] = useState(false);
  const [contactForm, setContactForm] = useState(message);
  const enviarContact = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/contacts`, contactForm)
      .then((response) => {
        setSuccessMessage(true);
        console.log(response);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleInput = (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    setContactForm({
      ...contactForm,
      [campo]: valor,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await contactSchema.isValid(contactForm);
    if (isValid) {
      setErrorForm(false);
      enviarContact();
      document.getElementById("form").reset();
    } else {
      setErrorForm(true);
    }
  };

  return (
    <div className="lg:mh-screen">
      <main className="contact">
        <div className="contact__info">
          <h3 className=" my-4 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Contacto
          </h3>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            harum repellendus. Sapiente magnam perspiciatis consequatur
            asperiores error ipsam explicabo, quaerat dolor doloremque eaque
            esse sed exercitationem voluptatum dignissimos sequi officiis.
          </p>
        </div>
        <div className="form__container">
          <form id="form" className="form" action="" onSubmit={handleSubmit}>
            <div className="form__input-div">
              <label className="form__label" htmlFor="name">
                Nombre
              </label>
              <div>
                <input
                  className="form__input"
                  name="name"
                  type="text"
                  id="name"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form__input-div">
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <div>
                <input
                  className="form__input"
                  name="email"
                  type="text"
                  id="email"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form__input-div">
              <label className="form__label" htmlFor="phone">
                Telefono
              </label>
              <div>
                <input
                  className="form__input"
                  name="phone"
                  type="number"
                  id="phone"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form__input-div">
              <label className="form__label" htmlFor="message">
                Message
              </label>
              <div>
                <textarea
                  className="form__input"
                  name="message"
                  rows="5"
                  type="text"
                  id="message"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form__btn-div">
              <button className="form__btn">ENVIAR</button>
            </div>
            <div className="text-center py-3">
              {succesMessage ? (
                <p className="text-green-500 text-lg">Mensaje enviado!</p>
              ) : (
                ""
              )}
              {errorForm ? (
                <p className="text-red-500 text-lg">
                  Complete los campos correctamente
                </p>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Contact;

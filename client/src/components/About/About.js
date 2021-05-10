import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { message } from "../../Alerts";
import "./about.scss";
import axios from "../../api/axios";

const About = () => {
  const [members, setMembers] = useState([]);
  const { send } = useAxios();

  const getDataMember = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/members`);
      console.log(response);
      if (response.data.length) {
        setMembers(...members, response.data);
      }
    } catch (error) {
      console.log(error);
      message("", "Problema para cargar los miembros", error);
    }
  };

  useEffect(() => {
    getDataMember();
  }, []);

  return (
    <div>
      <main className="about">
        <div className="">
          <h3 className="my-4 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Nosotros
          </h3>
          <h3 className="text-2xl font-bold pt-5 pb-3">Historia</h3>
          <p className="text-xl">
            Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social. Uniendo las manos de todas las familias, las que viven en el barrio y las que viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. ﻿ Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de dar alimento a las familias del barrio. Con el tiempo fuimos involucrándonos con la comunidad y agrandando y mejorando nuestra capacidad de trabajo. Hoy somos un centro comunitario que acompaña a más de 700 personas a través de las áreas de: Educación, deportes, primera infancia, salud, alimentación y trabajo social.
          </p>
          <h3 className="text-2xl font-bold pt-5 pb-3">Visión</h3>
          <p className="text-xl">
          Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la educación, salud, trabajo, deporte, responsabilidad y compromiso.
          </p>
          <h3 className="text-2xl font-bold pt-5 pb-3">Misión</h3>
          <p className="text-xl">
          Trabajar articuladamente con los distintos aspectos de la vida de las familias, generando espacios de desarrollo personal y familiar, brindando herramientas que logren mejorar la calidad de vida a través de su propio esfuerzo.
          </p>
        </div>
        <section className="section-content">
          <h3 className="text-2xl font-bold pt-5 pb-3">Equipo</h3>

          <div className="img-wrapper">
            {members.length === 0 ? (
              <h4 className="text-2xl font-bold pt-5 pb-3">
                No existen miembros en este momento
              </h4>
            ) : (
              members.map((mem) => (
                <div className="img-content">
                  <h3 className="img-content__name font-bold pt-5 pb-3">
                    {mem.name}
                  </h3>
                  <img className="img-content__img" src={mem.image} alt="img" />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;

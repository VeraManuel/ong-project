import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Footer = () => {
    const [redesSociales, setRedesSociales] = useState([])
    const [logo, setLogo] = useState("./images/assets/logo-somos-mas.png");

    const getLogo = async () => {
      try {
        const LogoRes = await axios.get(
          `${process.env.REACT_APP_API}/organizations/1/public`
        );
        const logo = LogoRes.data.data.image;
        setLogo(logo);
      } catch (error) { }
    };

    useEffect(() => {
      getLogo();
    }, []);

    useEffect(() => {
        axios
            .get("REACT_APP_API/redes-sociales")
            .then(response => setRedesSociales(response.data))
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <footer className="pt-5 pb-3 flex flex-col lg:flex-row items-center content-center justify-around bg-black">

            <div className="flex items-start">
                <img src={logo} alt="" ></img>
            </div>

            <div className='flex flex-col text-white py-10 text-center'>
                <Link className="py-1" to='/'>Inicio</Link>
                <Link className="py-1" to='/about'>Nosotros</Link>
                <Link className="py-1" to='/activities'>Actividades</Link>
                <Link className="py-1" to='/news'>Novedades</Link>
                <Link className="py-1" to='/contact'>Contacto</Link>
            </div>

            <div className=" flex ">
                {redesSociales ? redesSociales.map(item => (

                    <div key={item.id} className='py-2 px-2'>
                        <a href={item.url} target='_blank' rel="noreferrer">
                            <img src={item.srcIcon} className='h-6 w-6' />
                        </a>
                    </div>)
                ) : ""}
            </div>
        </footer>
    )
}

export default Footer

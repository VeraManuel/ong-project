import React from 'react';

const Welcome = () => {
    return (
        <div className="flex flex-col justify-center items-center py-12 ">
            <h1 className=" my-4 text-3xl font-extrabold tracking-tight lg:text-4xl">Somos Más</h1>
            <div className="max-w-4xl py-4 px-3">
                <p>
                    En Somos Más trabajamos con los chicos y chicas,
                    mamás y papás, abuelos y vecinos del barrio La Cava
                    generando procesos de crecimiento y de inserción social.
                    Uniendo las manos de todas las familias, las que viven en
                    el barrio y las que viven fuera de él, es que podemos pensar,
                    crear y garantizar estos procesos.
                </p>
            </div>
        </div>
    );
}

export default Welcome;

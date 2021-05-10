import React from 'react';
import Loader from 'react-loader-spinner';
import './Loader.css';

// To import this module use: import {LoaderDots} from '...'
export const LoaderDots = () => (
    <div className="loader">
        <Loader type="ThreeDots" color="$primaryColor" height={36} width={36} />
    </div>
);
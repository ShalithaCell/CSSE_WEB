import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './navbar';

export default function Home() {

	const dispatch = useDispatch();

	return (
    <div>
        <Navbar/>
    </div>
	);
}

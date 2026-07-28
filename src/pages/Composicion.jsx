import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ServiceDetail from '../components/ServiceDetail'
import { services } from '../data/services'

export default function Composicion() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 50)
    }, [])

    return (
        <>
            <Navbar />
            <div className={`form-container form-container--card ${visible ? "show" : ""}`}>
                <ServiceDetail service={services.composicion} />
            </div>
        </>
    )
}
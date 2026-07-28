import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const cards = [
  {
    title: 'Composición Musical',
    desc: 'Si necesitas ayuda para la música de tu proyecto, sean canciones, beats, bandas sonoras, diseño sonoro.',
    link: '/servicios/composicion',
    color: '#2a6b5e',
  },
  {
    title: 'Producción Musical',
    desc: 'Si necesitas ayuda para producir tu música, o producción adicional, o si necesitas una mezcla o materización para tu proyecto',
    link: '/servicios/produccion',
    color: '#00913d',
  },
  {
    title: 'Clases de Música',
    desc: 'Si buscas clases de música, instrumentos (guitarra, piano, bajo, canto), armonía, teoría musical, composición, producción musical, arreglos, diseño sonoro.',
    link: '/servicios/clases',
    color: '#9b59b6',
  },
]

export default function Servicios() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 50)
    }, [])

    return (
        <>
            <Navbar />
            <div className={`form-container form-container--cards ${visible ? "show" : ""}`}>
                <h2>Servicios</h2>
                <div className="grid-servicios">
                    {cards.map((card) => (
                        <div key={card.title} className="card-servicios">
                            <div className="card-servicios__accent" style={{ backgroundColor: card.color }} />
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                            <Link to={card.link}>
                                <button className="cta1" style={{ borderColor: card.color, color: card.color }}>Más info</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
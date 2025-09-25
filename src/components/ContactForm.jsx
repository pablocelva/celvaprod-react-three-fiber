import { useState, useEffect } from 'react'

export default function ContactForm() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
    }, []);

    return (
        <div className={`form-container ${visible ? "show" : ""}`}>
            <form 
                className="contact-form"
                action="https://formspree.io/f/xjkakang"
                method="POST"
            >
                <h2>Contacto</h2>
                <label>
                    Nombre:
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Tu nombre" 
                        required 
                        className="block w-full border rounded p-2 my-2"
                        />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="tuemail@email.com" 
                        required 
                        className="block w-full border rounded p-2 my-2"
                        />
                </label>
                <label>
                    Motivo:
                    <select 
                        name="reason" 
                        required 
                        className="block w-full border rounded p-2 my-2"
                        >
                        <option value="">Selecciona un motivo</option>
                        <option value="produccion">Producción</option>
                        <option value="composicion">Composición</option>
                        <option value="clases">Clases</option>
                        <option value="collaboration">Colaboración</option>
                    </select>
                </label>
                <label>
                    Mensaje:
                    <textarea 
                        name="message" 
                        placeholder="Escribe tu mensaje..." 
                        rows="4" 
                        required 
                        className="block w-full border rounded p-2 my-2"
                        />
                </label>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Enviar
                </button>
            </form>
        </div>
    )
}
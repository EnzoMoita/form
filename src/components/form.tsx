import React, { useState } from 'react';
import './form.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cnpj: '' 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                apikey: 'c2a943f7-683a-4ffa-92bb-a3c85daca5d4',
                ...formData
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('Form submitted successfully!');
            setFormData({ name: '', email: '', cnpj: '' }); // Limpar formulário após submissão
        } else {
            alert('Failed to submit form. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="cnpj">CNPJ</label>
                <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} required />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default ContactForm;

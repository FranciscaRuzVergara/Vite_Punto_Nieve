import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // entorno de enrutamiento aislado(falso), para simular la navegacion sin interactuar con el navegador real
import CardCategoria from '../components/CardCategoria';

const dato = {
    titulo: 'Boda',
    imagen: '/img/matrimonio.jpg'
};
describe('<CardCategoria />', () =>{
    it('Mostrar titulo e imagen almacenada',()=>{
        
        render(
        <MemoryRouter>
            <CardCategoria titulo={dato.titulo}
            imagen={dato.imagen}/>
        </MemoryRouter>
        );
        expect(screen.getByText(/boda/i)).toBeInTheDocument();
        const imagenElemento = screen.getByAltText(dato.titulo);
        expect(imagenElemento).toBeInTheDocument();
    })
})
import { describe, it, expect } from 'vitest';
import { validateCotizacionForm } from '../utils/validacionForm';

const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const base = {
  nombre: 'Nombre Valido',
  correo: 'correo@gmail.com',
  mensaje: 'Mensaje con al menos 10 caracteres',
};

describe('validateCotizacionForm - FECHA (debe ser >= hoy + 7 días)', () => {
  it('error si fecha vacía', () => {
    const res = validateCotizacionForm({ ...base, fecha: '' });
    expect(res.fecha).toBeDefined();
  });

  it('error si fecha es hoy', () => {
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const res = validateCotizacionForm({ ...base, fecha: ymd(hoy) });
    expect(res.fecha).toBeDefined();
  });

  it('error si fecha es hoy+6', () => {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + 6);
    const res = validateCotizacionForm({ ...base, fecha: ymd(d) });
    expect(res.fecha).toBeDefined();
  });

  it('OK si fecha es hoy+7', () => {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + 7);
    const res = validateCotizacionForm({ ...base, fecha: ymd(d) });
    expect(res.fecha).toBeUndefined();
  });

  it('OK si fecha es hoy+8', () => {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + 8);
    const res = validateCotizacionForm({ ...base, fecha: ymd(d) });
    expect(res.fecha).toBeUndefined();
  });
});

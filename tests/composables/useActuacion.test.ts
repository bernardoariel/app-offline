import { ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { mount } from '@vue/test-utils';

import { formatFecha } from '../../src/helpers/getFormatFecha';
import useActuacion from '@/composables/useActuacion';
import { formatFecha } from '@/helpers/getFormatFecha';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}));

describe('Composable useActuacion', () => {
    it('debe inicializar fechaCreacion con la fecha actual', async () => {
      // arrange
      const routerMock = { push: vi.fn() };
      const routeMock = { name: 'newActuacion' };
      useRouter.mockReturnValue(routerMock);
      useRoute.mockReturnValue(routeMock);
  
      const { fechaCreacion, toogleDateActuacion } = useActuacion();
  
      // act
      toogleDateActuacion();
      await nextTick();
  
      // assert
      expect(fechaCreacion.value).toBeInstanceOf(Date);
    });
  
    it('debe cambiar fechaCreacion a null ', async () => {
      // arrange
      const routerMock = { push: vi.fn() };
      const routeMock = { name: 'editActuacion' };
      useRouter.mockReturnValue(routerMock);
      useRoute.mockReturnValue(routeMock);
  
      const { fechaCreacion, toogleDateActuacion } = useActuacion();
  
      // act
      toogleDateActuacion();
      await nextTick();
  
      // assert
      expect(fechaCreacion.value).toBeNull()
    });
  
    it('debe formatear la fecha correctamente cuando fechaCreacion cambia', async () => {
      // arrange
      const routerMock = { push: vi.fn() };
      const routeMock = { name: 'notNewActuacion' };
      useRouter.mockReturnValue(routerMock);
      useRoute.mockReturnValue(routeMock);
  
      const { setFechaCreacion, getFormattedDate, getFormattedDateTime } = useActuacion();
      const nuevaFecha = new Date('2024-06-19T14:18:53');
  
      // act
      setFechaCreacion(nuevaFecha);
      await nextTick();
  
      // assert
      expect(getFormattedDate.value).toBe(formatFecha(nuevaFecha, 'fecha'));
      expect(getFormattedDateTime.value).toBe(formatFecha(nuevaFecha, 'fechaHora'));

    });
  
    it('debe navegar a la página de formulario con la clave correcta', () => {
      // arrange
      const routerMock = { push: vi.fn() };
      const routeMock = { name: 'notNewActuacion' };
      useRouter.mockReturnValue(routerMock);
      useRoute.mockReturnValue(routeMock);
  
      const { agregarNuevoItem } = useActuacion();
      const clave = 'testKey';
  
      // act
      agregarNuevoItem(clave);
  
      // assert
      expect(routerMock.push).toHaveBeenCalledWith({ name: 'formulario', params: { tipo: clave } });
    });
  });
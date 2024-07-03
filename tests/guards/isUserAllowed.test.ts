import isUserAllowed from '@/guards/isUserAllowed';
import { useStorageData } from '@/composables/useStorageData';

vi.mock('@/composables/useStorageData');

describe('isUserAllowed', () => {
    const next = vi.fn();
    const to = {};
    const from = {};

    beforeEach(() => {
        next.mockClear();
    });

    test('debe permitir el acceso si el usuario está habilitado', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: "Jefe de Sumario"
            })
        });

        isUserAllowed(to, from, next);

        expect(next).toHaveBeenCalledWith();
    });

    test('debe redirigir a "denegado" si el usuario no está habilitado', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: "Usuario No Habilitado"
            })
        });

        isUserAllowed(to, from, next);

        expect(next).toHaveBeenCalledWith({ name: 'denegado' });
    });

    test('debe redirigir a "denegado" si no hay datos de usuario', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: null
            })
        });

        isUserAllowed(to, from, next);

        expect(next).toHaveBeenCalledWith({ name: 'denegado' });
    });

    test('debe redirigir a "denegado" si no hay datos en localStorage', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: null,
                dependencia: null
            })
        });

        isUserAllowed(to, from, next);

        expect(next).toHaveBeenCalledWith({ name: 'denegado' });
    });
});

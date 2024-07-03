
import isUserAccessValid from '@/guards/isUserAccessValid';
import { useStorageData } from '@/composables/useStorageData';

vi.mock('@/composables/useStorageData');

describe('isUserAccessValid', () => {
    const next = vi.fn();
    const to = {};
    const from = {};

    beforeEach(() => {
        next.mockClear();
    });

    test('debe redirigir a "actuaciones" si el usuario está habilitado', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: "Jefe de Sumario"
            })
        });

        isUserAccessValid(to, from, next);

        expect(next).toHaveBeenCalledWith({ name: 'actuaciones' });
    });

    test('debe permitir el acceso si el usuario no está habilitado', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: "Usuario No Habilitado"
            })
        });

        isUserAccessValid(to, from, next);

        expect(next).toHaveBeenCalledWith();
    });

    test('debe permitir el acceso si no hay datos de usuario', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: null
            })
        });

        isUserAccessValid(to, from, next);

        expect(next).toHaveBeenCalledWith();
    });

    test('debe permitir el acceso si no hay datos en localStorage', () => {
        useStorageData.mockReturnValue({
            obtenerDatos: () => ({
                usuario: null,
                dependencia: null
            })
        });

        isUserAccessValid(to, from, next);

        expect(next).toHaveBeenCalledWith();
    });
});

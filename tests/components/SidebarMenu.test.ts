import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import PrimeVue from 'primevue/config';

// Mock de vue-router para router-link
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
  RouterLink: {
    template: '<a><slot /></a>',
  },
}));

// Define los mocks antes de usarlos
let sidebarLinksMock;
let mockActivateComponent;

beforeAll(() => {
  sidebarLinksMock = [
    {
      pathName: 'home',
      path: '/home',
      titulo: 'Home',
      icon: 'pi-home',
      grupo: 'principal',
      roles: ['Oficial Sumariante'],
      subitems: [],
    },
    {
      pathName: 'settings',
      path: '/settings',
      titulo: 'Settings',
      icon: 'pi-cog',
      grupo: 'configuración',
      roles: ['Oficial Sumariante'],
      subitems: [],
    },
  ];

  vi.mock('@/data/sideBarLinks', () => ({
    sidebarLinks: sidebarLinksMock,
  }));

  mockActivateComponent = vi.fn();

  vi.mock('@/composables/useActuacion', () => ({
    useActuacion: () => ({
      activateComponent: mockActivateComponent,
    }),
  }));
});

describe('SidebarMenu', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  test('debe mostrar el sidebar cuando se hace clic en el botón', async () => {
    const wrapper = mount(SidebarMenu, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          RouterLink: true,
        },
      },
      props: {
        icono: 'pi-menu',
        colorIcono: 'primary',
      },
    });

    // Verifica que el sidebar no esté visible inicialmente
    expect(wrapper.find('.p-sidebar-visible').exists()).toBe(false);

    // Haz clic en el botón para abrir el sidebar
    await wrapper.find('button').trigger('click');
    await nextTick();

    // Verifica que el sidebar esté visible después de hacer clic en el botón
    expect(wrapper.find('.p-sidebar-visible').exists()).toBe(true);
  });

  test('debe ocultar el sidebar cuando se hace clic en el botón de cerrar', async () => {
    const wrapper = mount(SidebarMenu, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          RouterLink: true,
        },
      },
      props: {
        icono: 'pi-menu',
        colorIcono: 'primary',
      },
    });

    // Haz clic en el botón para abrir el sidebar
    await wrapper.find('button').trigger('click');
    await nextTick();

    // Haz clic en el botón de cerrar dentro del sidebar
    await wrapper.find('.pi-times').trigger('click');
    await nextTick();

    // Verifica que el sidebar no esté visible después de hacer clic en el botón de cerrar
    expect(wrapper.find('.p-sidebar-visible').exists()).toBe(false);
  });

  test('debe renderizar los enlaces del sidebar correctamente', async () => {
    const wrapper = mount(SidebarMenu, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          RouterLink: true,
        },
      },
      props: {
        icono: 'pi-menu',
        colorIcono: 'primary',
      },
    });

    // Haz clic en el botón para abrir el sidebar
    await wrapper.find('button').trigger('click');
    await nextTick();

    // Verifica que los enlaces del sidebar estén presentes
    const links = wrapper.findAll('a');
    expect(links.length).toBe(sidebarLinksMock.length);

    // Verifica que los títulos de los enlaces sean correctos
    expect(links[0].text()).toBe('Home');
    expect(links[1].text()).toBe('Settings');
  });
});

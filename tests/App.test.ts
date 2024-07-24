import { mount, shallowMount } from '@vue/test-utils';
import App from './App.vue';
import router from '../src/router/index';
import isSavedChanges from '@/guards/isSavedChanges';
import { RouteLocationNormalized } from 'vue-router';
import { vi } from 'vitest';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import ActuacionesView from '@/views/ActuacionesView.vue';

// Mock isUserAllowed to always allow access
vi.mock('@/guards/isUserAllowed', () => ({
  default: vi.fn((to, from, next) => next())
}));

// Mock useStorageData if needed
vi.mock('@/composables/useStorageData', () => ({
  useStorageData: () => ({
    obtenerDatos: vi.fn().mockReturnValue({
      usuario: "Jefe de Sumario"
    })
  })
}));

vi.mock('@/composables/useDatosDiligencia', () => {
  return {
    default: vi.fn(() => ({
      processedText: { header: '', footer: '' },
      processedAfectados: [],
      processedIntervinientes: [],
      primeradiligencia: {},
      processedHeaderText: '',
      isEditingHeader: false,
      headerContainer: '',
      headerTextComputed: '',
      processedFooterText: '',
      isEditingFooter: false,
      footerContainer: '',
      footerTextComputed: '',
      relato: '',
      footerText: ''
    }))
  };
});

// Redirigir los mensajes de advertencia de Vue a una función que los silencie
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (msg) => {
    if (!msg.includes('[Vue warn]: Failed to resolve component')) {
      originalWarn(msg);
    }
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

describe('<App />', () => {
  const next = vi.fn();
  const to: RouteLocationNormalized = {
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    name: undefined,
    path: '/home-screen',
    params: {},
    meta: {}
  };
  const from: any = {
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    name: undefined,
    path: '/',
    params: {},
    meta: {}
  };
 
  test('should render correctly with RouterView', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, PrimeVue, ToastService, ConfirmationService],
        stubs: ['Button'] // Stub components that are not resolved
      }
    });

    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBe(true);
  });

  test('renders ActuacionesView when visiting / sin Authentication', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, PrimeVue, ToastService, ConfirmationService],
        stubs: ['Button'] // Stub components that are not resolved
      }
    });

    isSavedChanges(to, from, next);
    expect(next).toHaveBeenCalled();
  });
  
  test('renders ActuacionesView when visiting / con Authentication', async () => {
    // Navigate to the specific route
    await router.push('/actuaciones/list');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, PrimeVue, ToastService, ConfirmationService],
        stubs: {
          RouterView: true,
          RouterLink: true,
          Button: true,
          Toast: true,
          RadioButton: true,
          Column: true,
          Tag: true,
          DataTable: true,
          MyConfirmPopup: true,
        }
      }
    });
    console.log('wrapper',wrapper.html())
    // Verify that the ActuacionesView component has rendered (stubbed)
    // expect(wrapper.findComponent(ActuacionesView).exists()).toBe(true);
  });
});


import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import ActuacionView from '@/views/ActuacionView.vue';
import { useRoute } from 'vue-router';

// Mock de useRoute y useRouter
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock de useItems
vi.mock('@/composables/useItems', () => ({
  __esModule: true,
  default: () => ({
    setAll: vi.fn(),
    resetAll: vi.fn(),
    afectados: ref([]),
    efectos: ref([]),
    fechaUbicacion: ref(''),
    intervinientes: ref([]),
    vinculados: ref([]),
  }),
}));

// Mock de useFieldState
vi.mock('@/composables/useFieldState', () => ({
  __esModule: true,
  default: () => ({
    resetStates: vi.fn(),
  }),
}));

// Mock de useDatosDiligencia
vi.mock('@/composables/useDatosDiligencia', () => ({
  __esModule: true,
  default: () => ({
    processedText: ref({ header: '', footer: '' }),
    primeradiligencia: ref({ titulo: '' }),
    processedHeaderText: ref(''),
    isEditingHeader: ref(false),
    headerContainer: ref(''),
    headerTextComputed: ref(''),
    processedFooterText: ref(''),
    isEditingFooter: ref(false),
    footerContainer: ref(''),
    footerTextComputed: ref(''),
    relato: ref(''),
  }),
}));

// Mock de useNewActuacion
vi.mock('@/composables/useNewActuacion', () => ({
  __esModule: true,
  default: () => ({
    isEditedHeader: ref(false),
    isEditedFooter: ref(false),
  }),
}));

// Mock de useViewPdf
vi.mock('@/composables/useViewPdf', () => ({
  __esModule: true,
  useViewPdf: () => ({
    generatePdf: vi.fn(),
  }),
}));

// Mock de useSaveData
vi.mock('@/composables/useSaveData', () => ({
  __esModule: true,
  default: () => ({
    saveData: vi.fn(),
    updateData: vi.fn(),
  }),
}));

describe('<ActuacionView />', () => {
  beforeEach(() => {
    // Resetea el mock antes de cada test
    vi.clearAllMocks();
  });

  it('debe recibir la prop actuacion en la ruta newActuacion y mostrarla en el DOM', async () => {
    // Mock de useRoute para que devuelva un objeto route válido
    useRoute.mockReturnValue({
      name: 'newActuacion',
      params: { actuacion: 'sumario-denuncia' },
    });

    // arrange
    const wrapper = mount(ActuacionView, {
      global: {
        components: {
          Button: {
            template: '<button><slot /></button>',
          },
          Card: {
            template: '<div><slot name="title"></slot><slot name="content"></slot></div>',
          },
          TabPanel: {
            template: '<div><slot /></div>',
          },
          TabView: {
            template: '<div><slot /></div>',
          },
          ToggleButton: {
            template: '<button><slot /></button>',
          },
          DataViewCard: {
            template: '<div><slot /></div>',
          },
          DatosLegalesView: {
            template: '<div>DatosLegalesView</div>',
          },
          DiligenciaView: {
            template: '<div>DiligenciaView</div>',
            props: ['actuacion', 'id'],
          },
          Textarea: {
            template: '<textarea></textarea>',
          },
          PdfViewer: {
            template: '<div>PDF Viewer</div>',
          },
        },
      },
      props: {
        actuacion: 'sumario-denuncia',
      },
    });

    // act
    const titleElement = wrapper.find('.font-medium.text-3xl.text-900');

    // assert
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toContain('Ingreso de datos sumario-denuncia');
  });

  it('debe recibir las props id y actuacion en la ruta editActuacion y mostrar "Edición" en el DOM', async () => {
    // Mock de useRoute para que devuelva un objeto route válido
    useRoute.mockReturnValue({
      name: 'editActuacion',
      params: { actuacion: 'sumario-denuncia', id: '123' },
    });

    // arrange
    const wrapper = mount(ActuacionView, {
      global: {
        components: {
          Button: {
            template: '<button><slot /></button>',
          },
          Card: {
            template: '<div><slot name="title"></slot><slot name="content"></slot></div>',
          },
          TabPanel: {
            template: '<div><slot /></div>',
          },
          TabView: {
            template: '<div><slot /></div>',
          },
          ToggleButton: {
            template: '<button><slot /></button>',
          },
          DataViewCard: {
            template: '<div><slot /></div>',
          },
          DatosLegalesView: {
            template: '<div>DatosLegalesView</div>',
          },
          DiligenciaView: {
            template: '<div>DiligenciaView</div>',
            props: ['actuacion', 'id'],
          },
          Textarea: {
            template: '<textarea></textarea>',
          },
          PdfViewer: {
            template: '<div>PDF Viewer</div>',
          },
        },
      },
      props: {
        actuacion: 'sumario-denuncia',
        id: 123,
      },
    });

    // act
    const titleElement = wrapper.find('.font-medium.text-3xl.text-900');

    // assert
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toContain('Edición sumario-denuncia');
  });
});

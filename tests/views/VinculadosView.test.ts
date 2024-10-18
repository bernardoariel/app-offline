import { shallowMount } from '@vue/test-utils';
import VinculadosView from '@/views/VinculadosView.vue';

describe('VinculadosView.vue', () => {

  test('should render divs', () => {
    const wrapper = shallowMount(VinculadosView);
    console.log('Wrapper', wrapper.html())

    const div = wrapper.find('div');
    
    expect(div.exists()).toBe(true);
    expect(div.find('vinculados-form-stub').exists()).toBe(true);
  });

  test('should render VinculadosForm inside a div without any class', () => {
    const wrapper = shallowMount(VinculadosView);

    // Busca el primer div
    const div = wrapper.find('div');

    // Verifica que el div no tiene clases
    expect(div.attributes('class')).toBe(undefined); // Si no hay clases, el atributo 'class' no existirá

  });
  test('should render VinculadosForm and other elements inside a div', () => {
    const wrapper = shallowMount(VinculadosView);

    const div = wrapper.find('div');

    expect(div.findAll('*').length).toBe(1); 

  });

  
});

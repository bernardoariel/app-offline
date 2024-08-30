import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MyInput from '@/components/elementos/MyInput.vue';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';

describe('MyInput', () => {
  it('renderiza correctamente con las propiedades dadas', async () => {
    const wrapper = mount(MyInput, {
      global: {
        plugins: [PrimeVue],
        components: { InputText },  
      },
      props: {
        modelValue: 'Test value',
        type: 'text',
        placeholder: 'Enter text',
        color: true,
        error: 'This is an error',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('Test value');
    expect(input.attributes('placeholder')).toBe('Enter text');
    expect(input.classes()).toContain('surface-100');
    expect(input.classes()).toContain('border-red-500');
    
    const errorSpan = wrapper.find('span.text-red-400');
    expect(errorSpan.exists()).toBe(true);
    expect(errorSpan.text()).toBe('This is an error');
  });

  it('emite update:modelValue cuando cambia el input', async () => {
    const wrapper = mount(MyInput, {
      global: {
        plugins: [PrimeVue],
        components: { InputText },
      },
      props: {
        modelValue: '',
        color:true
      },
    });

    const input = wrapper.find('input');
    await input.setValue('New value');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New value']);
  });

  it('emite el evento blur cuando el input pierde el foco', async () => {
    const wrapper = mount(MyInput, {
      global: {
        plugins: [PrimeVue],
        components: { InputText },
      },
      props: {
        modelValue: '',
        color:true
      },
    });

    const input = wrapper.find('input');
    await input.trigger('blur');

    expect(wrapper.emitted('blur')).toHaveLength(1);
  });
});

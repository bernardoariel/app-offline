import { shallowMount, mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';


describe('<MyDropdown/>', () => {
  it('prueba', async () => {
   
    const DropdownStub = defineComponent({
      props: ['modelValue', 'options', 'optionLabel', 'placeholder', 'class', 'filter'],
      template: `
        <div class="dropdown-stub">
          <slot name="value" :value="modelValue" :placeholder="placeholder"></slot>
        </div>
      `,
    });


    const yearsActuacion = ['2024', '2023'];
    const year = ref('2024');
    const handleDropdownChange = vi.fn();

    const wrapper = mount(MyDropdown, {
      props: {
        items: yearsActuacion.map((year) => ({ name: year })),
        modelValue: year.value,
        error: undefined,
        placeholder: yearsActuacion[0].toString(),
        optionLabel: "name",
        filter: false,
        color: true,
      },
      global: {
       /*  components: {
          Dropdown: DropdownStub,
        }, */
      },
    });

    console.log('wrapper HTML output:', wrapper.html()); 

/* 
    const spanElement = wrapper.find('.dropdown-stub');
    console.log('Does the span exist?', spanElement.exists());
  

    await wrapper.vm.$emit('change', '2023');

    expect(handleDropdownChange).toHaveBeenCalledWith('selectYear', '2023'); */

    // Accede a las props de MyDropdown
    const dropdownProps = wrapper.props();
    console.log('Props passed to MyDropdown:', dropdownProps);

    // Verifica que las props contengan los items correctos
    expect(dropdownProps.items).toEqual([
      { name: '2024' },
      { name: '2023' }
    ]);

    // Verifica que modelValue esté configurado correctamente
    expect(dropdownProps.modelValue).toBe('2024');

  });
});

// import { shallowMount, mount } from '@vue/test-utils';
// import { defineComponent, ref } from 'vue';
// import MyDropdown from '@/components/elementos/MyDropdown.vue';


// describe('<MyDropdown/>', () => {
//   it('prueba', async () => {
   
//     const DropdownStub = defineComponent({
//       props: ['modelValue', 'options', 'optionLabel', 'placeholder', 'class', 'filter'],
//       template: `
//         <div class="dropdown-stub">
//           <slot name="value" :value="modelValue" :placeholder="placeholder"></slot>
//         </div>
//       `,
//     });


//     const yearsActuacion = ['2024', '2023'];
//     const year = ref('2024');
//     const handleDropdownChange = vi.fn();

//     const wrapper = mount(MyDropdown, {
//       props: {
//         items: yearsActuacion.map((year) => ({ name: year })),
//         modelValue: year.value,
//         error: undefined,
//         placeholder: yearsActuacion[0].toString(),
//         optionLabel: "name",
//         filter: false,
//         color: true,
//       },
//       global: {
//        /*  components: {
//           Dropdown: DropdownStub,
//         }, */
//       },
//     });

//     console.log('wrapper HTML output:', wrapper.html()); 

// /* 
//     const spanElement = wrapper.find('.dropdown-stub');
//     console.log('Does the span exist?', spanElement.exists());
  

//     await wrapper.vm.$emit('change', '2023');

//     expect(handleDropdownChange).toHaveBeenCalledWith('selectYear', '2023'); */

//     // Accede a las props de MyDropdown
//     const dropdownProps = wrapper.props();
//     console.log('Props passed to MyDropdown:', dropdownProps);

//     // Verifica que las props contengan los items correctos
//     console.log('dropdownProps.items::: ', dropdownProps.items);
//     expect(dropdownProps.items).toEqual([
//       { name: '2024' },
//       { name: '2023' }
//     ]);

//     // Verifica que modelValue esté configurado correctamente
//     // expect(dropdownProps.modelValue).toBe('2024');
//     console.log('dropdownProps.modelValue::: ', dropdownProps.modelValue);
//     await wrapper.vm.$emit('change', '2023');
//     console.log('dropdownProps.modelValue::: ', dropdownProps.modelValue);

//   });
// });

import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import { describe, it, expect, vi } from 'vitest';

describe('<MyDropdown/>', () => {
  it('prueba modelValue', async () => {
    const DropdownStub = defineComponent({
      props: ['modelValue', 'options', 'optionLabel', 'placeholder', 'class', 'filter'],
      template: `
        <div class="dropdown-stub">
          <slot name="value" :value="modelValue" :placeholder="placeholder"></slot>
        </div>
      `,
    });

    const yearsActuacion = ['2024', '2023'];
    const year = ref('2024');  // Ref para el v-model
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
        'onUpdate:modelValue': (newValue: string) => {
          year.value = newValue;
        },
      },
      global: {
        components: {
          Dropdown: DropdownStub,
        },
      },
    });

    // Accede a las props de MyDropdown
    const dropdownProps = wrapper.props();
    console.log('Props passed to MyDropdown:', dropdownProps);

    // Verifica que las props contengan los items correctos
    console.log('dropdownProps.items::: ', dropdownProps.items);
    expect(dropdownProps.items).toEqual([
      { name: '2024' },
      { name: '2023' }
    ]);

    // Verifica que modelValue esté configurado correctamente
    console.log('dropdownProps.modelValue (initial)::: ', dropdownProps.modelValue);
    expect(dropdownProps.modelValue).toBe('2024');

    // Simular el cambio en el modelValue
    await wrapper.setProps({ modelValue: '2023' });
    console.log('dropdownProps.modelValue (after change)::: ', wrapper.props().modelValue);
    expect(wrapper.props().modelValue).toBe('2023');

    // Verificar que el evento se emite correctamente
    await wrapper.vm.$emit('change', '2023');
    expect(handleDropdownChange).toHaveBeenCalledWith('selectYear', '2023');
  });
});

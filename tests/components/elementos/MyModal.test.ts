import { mount } from "@vue/test-utils";
import MyModalDummy from "./mockComponents/dummyModalParent.vue";
import { beforeEach, describe, expect, it } from "vitest";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { MyModal } from "@/components/elementos";

describe("MyModal", () => {

  let globalConfig: any

  beforeEach(() => {
    globalConfig = {
      global: {
        components: { MyModal, Button, Dialog },
        plugins: [PrimeVue]
      }
    }
  })

  it("se muestra según la propiedad visible", async () => {
    const wrapper = mount(MyModalDummy, { ...globalConfig });

    // Hacer visible el modal
    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: "MyModal" }).props("visible")).toBe(
      true
    );

    // Hacer invisible el modal
    wrapper.vm.modalVisible = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: "MyModal" }).props("visible")).toBe(
      false
    );
  });

  it("muestra correctamente el título", async () => {
    const wrapper = mount(MyModalDummy, { ...globalConfig });


    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    const title = wrapper.findComponent({ name: "MyModal" }).props("title");
    expect(title).toBe("Título de prueba");
  });

  it("muestra correctamente los botones con las opciones configuradas y emite eventos", async () => {
    const wrapper = mount(MyModalDummy, { ...globalConfig });


    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBe(2)

    expect(buttons[0].text()).toBe('Aceptar');
    expect(buttons[1].text()).toBe('Cancelar');
  });

  it("emite el evento correcto al hacer clic en aceptar", async () => {
    const wrapper = mount(MyModalDummy, { ...globalConfig });

    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    // Simular clic en el primer botón ("Aceptar")
    await wrapper.findAllComponents(Button)[0].trigger("click");

    expect(wrapper.emitted("button-click")).toBeTruthy();
  });

  it("emite el evento correcto al hacer clic en cancelar", async () => {
    const wrapper = mount(MyModalDummy, { ...globalConfig });

    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    // Simular clic en el segundo botón ("Cancelar")
    await wrapper.findAllComponents(Button)[1].trigger("click");

    expect(wrapper.emitted("update:visible")).toBeTruthy();
  });
});

import { mount } from "@vue/test-utils";
import MyModalDummy from "./dummy.vue";
import { describe, expect, it } from "vitest";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { MyModal } from "@/components/elementos";

describe("MyModal", () => {
  it("se muestra según la propiedad visible", async () => {
    const wrapper = mount(MyModalDummy, {
      global: {
        components: { MyModal },
      },
    });

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
    const wrapper = mount(MyModalDummy, {
      global: {
        components: { MyModal },
      },
    });

    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();

    const title = wrapper.findComponent({ name: "MyModal" }).props("title");
    expect(title).toBe("Título de prueba");
  });

  it("muestra correctamente los botones con las opciones configuradas", async () => {
    const wrapper = mount(MyModalDummy, {
      global: {
        components: { MyModal },
      },
    });

    // Hacer visible el modal para que los botones sean renderizados
    wrapper.vm.modalVisible = true;
    await wrapper.vm.$nextTick();
    console.log(wrapper.emitted());

    expect(wrapper.text()).toContain("Aceptar");
  });
});

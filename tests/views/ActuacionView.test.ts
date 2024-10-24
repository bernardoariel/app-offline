import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ActuacionView } from "@/views/index";
import { createRouter, createWebHistory } from "vue-router";

// Mock para Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "formulario", component: {} }],
});

describe("ActuacionView", () => {
  beforeEach(() => {
    router.push("/");
    return router.isReady();
  });

  it("debe renderizar correctamente", () => {
    const wrapper = mount(ActuacionView, {
      global: {
        plugins: [router],
      },
      props: {
        id: 1,
        actuacionName: "Actuación Test",
        actuacionData: { example: "data" },
      },
    });

    expect(wrapper.findComponent({ name: "ToolbarActuacion" }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: "ActuacionCards" }).exists()).toBe(
      true
    );
    expect(
      wrapper.findComponent({ name: "DiligenciaComponent" }).exists()
    ).toBe(true);
    expect(wrapper.findComponent({ name: "MyModal" }).exists()).toBe(true);
  });
});

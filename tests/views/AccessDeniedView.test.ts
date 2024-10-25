import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { AccessDeniedView } from "@/views/index";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { createRouter, createWebHistory } from "vue-router";

// Mock para `useToast`
vi.mock("primevue/usetoast", () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home", component: {} }],
});

describe("AccessDeniedView", () => {
  beforeEach(() => {
    router.push("/");
    return router.isReady();
  });

  it("debe renderizar correctamente", () => {
    const wrapper = shallowMount(AccessDeniedView, {
      global: {
        plugins: [PrimeVue, ToastService],
      },
    });

    expect(wrapper.find("toast").exists()).toBe(true);
    expect(wrapper.find(".title").text()).toBe("SIIS - Modo OFFLine");
    expect(wrapper.find(".subtitle").text()).toBe(
      "Su usuario no está habilitado para el modo offline"
    );
  });

  it('debe navegar a "/" al hacer click en el botón Reintentar', async () => {
    const wrapper = shallowMount(AccessDeniedView, {
      global: {
        plugins: [PrimeVue, ToastService, router],
      },
    });

    await wrapper.find("button").trigger("click");
    expect(router.currentRoute.value.path).toBe("/");
  });
});

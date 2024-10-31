import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import MyInputMask from "@/components/elementos/MyInputMask.vue";
import PrimeVue from "primevue/config";
import InputMask from "primevue/inputmask";

vi.mock("primevue/inputmask", () => ({
  default: {
    template: "<input @input='$emit(\"input\", $event)' />",
  },
}));

describe("MyInput Component", () => {
  it("renders the input with the correct placeholder", () => {
    const wrapper = mount(MyInputMask, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask },
      },
      props: {
        modelValue: "05/04/1998",
        error: undefined,
        color: false,
        placeholder: "Ingrese fecha",
        mask: "99/99/9999",
        slotChar: "dd/mm/yyyy",
      },
    });

    const inputMask = wrapper.find("input");
    expect(inputMask.exists()).toBe(true);
    expect(inputMask.attributes("placeholder")).toBe("Ingrese fecha");

    const errorSpan = wrapper.find("span.text-red-400");
    expect(errorSpan.exists()).toBe(false);
  });

  it("emits update:modelValue on input change", async () => {
    const wrapper = mount(MyInputMask, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask },
      },
      props: {
        modelValue: "05/04/1998",
        error: undefined,
        color: false,
        placeholder: "Ingrese fecha",
        mask: "99/99/9999",
        slotChar: "dd/mm/yyyy",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("05/03/2002");
    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["05/03/2002"]);
  });

  it("applies mask and slotChar correctly", async () => {
    const wrapper = mount(MyInputMask, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask },
      },
      props: {
        error: undefined,
        color: false,
        placeholder: "Ingrese fecha",
        mask: "99-99-9999",
        slotChar: "dd-mm-yyyy",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("12-03-2022");
    expect(input.element.value).toBe("12-03-2022");
  });

  it("displays error message and applies error styling", () => {
    const wrapper = mount(MyInputMask, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask },
      },
      props: {
        modelValue: "",
        color: true,
        error: "This is an error",
      },
    });

    const errorSpan = wrapper.find("span.text-red-400");
    expect(errorSpan.exists()).toBe(true);
    expect(errorSpan.text()).toBe("This is an error");

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-red-500");
  });

  it("applies surface-100 class when color prop is true", () => {
    const wrapper = mount(MyInputMask, {
      global: {
        plugins: [PrimeVue],
        components: { InputMask },
      },
      props: {
        modelValue: "",
        color: true,
      },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("surface-100");
  });
});

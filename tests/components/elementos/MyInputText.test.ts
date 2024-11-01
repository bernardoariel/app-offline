import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyInput } from "@/components/elementos/index";
import InputText from "primevue/inputtext";
import PrimeVue from "primevue/config";

// Mockeamos el InputText de PrimeVue
vi.mock("primevue/inputtext", () => ({
  default: {
    template: "<input />",
  },
}));

describe("MyInput Component", () => {
  let globalConfig: any;

  beforeEach(() => {
    globalConfig = {
      global: {
        plugins: [PrimeVue],
        components: { InputText },
      },
    };
  });

  it("renders the input with the correct placeholder", () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: {
        modelValue: "Test value",
        type: "text",
        placeholder: "Enter text",
        color: true,
        error: "This is an error",
      },
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe("Test value");
    expect(input.attributes("placeholder")).toBe("Enter text");
    expect(input.classes()).toContain("surface-100");

    const errorSpan = wrapper.find("span.text-red-400");
    expect(errorSpan.exists()).toBe(true);
    expect(errorSpan.text()).toBe("This is an error");
  });

  it("updates modelValue on text input", async () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: {
        modelValue: "",
        type: "text",
        placeholder: "Enter text",
        color: true,
        error: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("Hello");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["Hello"]);
  });

  it("updates modelValue on number input", async () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: {
        modelValue: "",
        type: "number",
        placeholder: "Enter text",
        color: true,
        error: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("123");

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["123"]); // Verifica que se emita como número
  });

  it("emits blur event when input loses focus", async () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
    });
    const input = wrapper.find("input");

    await input.trigger("blur");
    expect(wrapper.emitted().blur).toBeTruthy();
  });

  it("displays error message when error prop is set", () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: {
        modelValue: "",
        error: "This is an error",
        placeholder: "Enter text",
        color: true,
      },
    });

    const errorSpan = wrapper.find("span.text-red-400");
    expect(errorSpan.exists()).toBe(true);
    expect(errorSpan.text()).toBe("This is an error");
  });

  it("applies surface-100 class when color is true", () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: { color: true },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("surface-100");
  });

  it("applies border-red-500 class when there is an error", () => {
    const wrapper = mount(MyInput, {
      ...globalConfig,
      props: { error: "Error", color: true },
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain("border-red-500");
  });
});

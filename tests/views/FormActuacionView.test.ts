import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { FormActuacionView } from "@/views/index";

describe("FormActuacionView", () => {
  it("debe renderizar correctamente", () => {
    const wrapper = shallowMount(FormActuacionView);
    const div = wrapper.find("form-actuacion-component-stub");

    expect(div.exists()).toBe(true);
  });
});

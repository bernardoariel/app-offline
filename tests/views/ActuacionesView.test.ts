import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { ActuacionesView } from "@/views/index";

describe("ActuacionesView", () => {
  it("debe renderizar correctamente", () => {
    const wrapper = shallowMount(ActuacionesView);

    const div = wrapper.find("data-table-expansion-stub");

    expect(div.exists()).toBe(true);
  });
});

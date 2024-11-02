import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MyConfirmPopup } from "@/components/elementos/index";
import ParentComponent from "./mockComponents/parentElementConfirm.vue";
import { useConfirm } from "primevue/useconfirm";
import PrimeVue from "primevue/config";

vi.mock("primevue/useconfirm", () => ({
  useConfirm: vi.fn(),
}));

describe("MyConfirmPopup Component", () => {
  let globalConfig: any;

  beforeEach(() => {
    globalConfig = {
      global: {
        components: { MyConfirmPopup },
        plugins: [PrimeVue],
      },
    };
    useConfirm.mockReturnValue({
      require: vi.fn(),
    });
  });
  it("renders MyConfirmPopup when showConfirm is called", async () => {
    const wrapper = mount(ParentComponent);
    expect(wrapper.findComponent({ name: "MyConfirmPopup" }).exists()).toBe(
      false
    );
    await wrapper.find("button").trigger("click");
    expect(wrapper.findComponent({ name: "MyConfirmPopup" }).exists()).toBe(
      true
    );
  });
  it("sets the correct message in MyConfirmPopup", async () => {
    const wrapper = mount(ParentComponent);
    await wrapper.find("button").trigger("click");
    const myConfirmPopup = wrapper.findComponent({ name: "MyConfirmPopup" });
    expect(myConfirmPopup.props("config").message).toBe("Are you sure?");
  });

  it("sets the correct button labels in MyConfirmPopup", async () => {
    const wrapper = mount(ParentComponent);
    await wrapper.find("button").trigger("click");
    const myConfirmPopup = wrapper.findComponent({ name: "MyConfirmPopup" });
    expect(myConfirmPopup.props("config").acceptLabel).toBe("Yes");
    expect(myConfirmPopup.props("config").rejectLabel).toBe("No");
  });
  it("emits 'accepted' event when confirmation is accepted", async () => {
    const requireMock = useConfirm().require;
    requireMock.mockImplementation((options) => {
      options.accept();
    });

    const wrapper = mount(ParentComponent, { ...globalConfig });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("accepted")).toBeTruthy();
  });

  it("emits 'rejected' event when confirmation is rejected", async () => {
    const requireMock = useConfirm().require;
    requireMock.mockImplementation((options) => {
      options.reject();
    });

    const wrapper = mount(ParentComponent, { ...globalConfig });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("rejected")).toBeTruthy();
  });
});

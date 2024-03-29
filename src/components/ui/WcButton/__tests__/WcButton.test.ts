import { mount } from '@vue/test-utils';
import WcButton from '../WcButton.vue';

describe('WcButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(WcButton);
  });

  it('renders default WcButton component', () => {
    const component = wrapper.findComponent(WcButton);
    const element = component.vm.$el.tagName;
    const defaultSlot = wrapper.find('.WcButton-label');
    const iconLeftSlot = wrapper.find('span.mr-2');
    const iconRightSlot = wrapper.find('span.ml-2');

    expect(component.exists()).toBe(true);
    expect(element).toBe('BUTTON');
    // default slot states
    expect(defaultSlot.text()).toContain('');
    expect(iconLeftSlot.exists()).toBe(false);
    expect(iconRightSlot.exists()).toBe(false);
  });

  it('renders "a" element and includes href attribute', async () => {
    const href = 'http://google.com';
    await wrapper.setProps({ href });
    const element = wrapper.vm.$el.tagName;

    expect(element).toBe('A');
    expect(wrapper.attributes('href')).toBe(href);
  });

  it('renders disabled state', async () => {
    await wrapper.setProps({ disabled: true });

    expect(wrapper.classes()).toContain('pointer-events-none');
    expect(wrapper.classes()).toContain('!opacity-40');
  });

  it('renders title attribute', async () => {
    const title = 'Button Title';
    await wrapper.setProps({ title });

    expect(wrapper.attributes('title')).toBe(title);
  });

  it('renders rounded state', async () => {
    await wrapper.setProps({ rounded: true });

    expect(wrapper.classes()).toContain('!rounded-full');
  });

  it('renders button sizes', async () => {
    // default medium
    expect(wrapper.classes()).toContain('WcButton--medium');

    // xSmall
    await wrapper.setProps({ size: 'xSmall' });
    expect(wrapper.classes()).toContain('WcButton--xSmall');

    // small
    await wrapper.setProps({ size: 'small' });
    expect(wrapper.classes()).toContain('WcButton--small');

    // large
    await wrapper.setProps({ size: 'large' });
    expect(wrapper.classes()).toContain('WcButton--large');
  });

  it('renders button types', async () => {
    // default type
    expect(wrapper.attributes('type')).toBe('button');

    // submit
    await wrapper.setProps({ type: 'submit' });
    expect(wrapper.attributes('type')).toBe('submit');

    // reset
    await wrapper.setProps({ type: 'reset' });
    expect(wrapper.attributes('type')).toBe('reset');
  });

  it('renders button variations', async () => {
    let classes = ['text-white', 'bg-blue-500', 'hover:bg-blue-600'];
    // default primary
    classes.forEach((val) => {
      expect(wrapper.classes()).toContain(val);
    });

    // secondary
    await wrapper.setProps({ variation: 'secondary' });
    classes = ['text-gray-900', 'bg-gray-100', 'hover:bg-gray-200'];
    classes.forEach((val) => {
      expect(wrapper.classes()).toContain(val);
    });

    // white
    await wrapper.setProps({ variation: 'white' });
    classes = ['text-gray-700', 'bg-white', 'hover:bg-gray-100'];
    classes.forEach((val) => {
      expect(wrapper.classes()).toContain(val);
    });

    // text
    await wrapper.setProps({ variation: 'text' });
    classes = ['bg-transparent', 'shadow-none', 'text-gray-700', 'hover:bg-gray-100'];
    classes.forEach((val) => {
      expect(wrapper.classes()).toContain(val);
    });

    // error
    await wrapper.setProps({ variation: 'error' });
    classes = ['bg-red-500', 'text-white', 'hover:bg-red-600'];
    classes.forEach((val) => {
      expect(wrapper.classes()).toContain(val);
    });
  });

  it('renders default slot', () => {
    wrapper = mount(WcButton, { slots: { default: 'Button Text' } });
    const defaultSlot = wrapper.find('.WcButton-label');

    expect(defaultSlot.text()).toContain('Button Text');
  });

  it('renders icon-left slot', () => {
    wrapper = mount(WcButton, { slots: { ['icon-left']: 'Icon Left' } });
    const iconLeftSlot = wrapper.find('span.mr-2');

    expect(iconLeftSlot.text()).toContain('Icon Left');
  });

  it('renders icon-right slot', () => {
    wrapper = mount(WcButton, { slots: { ['icon-right']: 'Icon Right' } });
    const iconRightSlot = wrapper.find('span.ml-2');

    expect(iconRightSlot.text()).toContain('Icon Right');
  });
});

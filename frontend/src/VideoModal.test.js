import { mount } from 'enzyme';
import React from 'react';
import VideoModal from '../src/components/Modals/VideoModal';

describe('VideoModal', () => {
  const noop = () => {};

  // input nothing
  it('try', () => {
    const defaultOpen = true;
    const wrapper = mount(<VideoModal open={defaultOpen} setOpen={noop} setDefaultMedia={noop} setDefaultLink={noop} />)
    wrapper.find('input').instance().value = '';
    expect(wrapper.find('input').instance().value).toEqual('');
  });

  // with not-empty input
  it('try not-empty input', () => {
    const defaultOpen = true;
    const wrapper = mount(<VideoModal open={defaultOpen} setOpen={noop} setDefaultMedia={noop} setDefaultLink={noop} />)
    wrapper.find('input').instance().value = 'www.youtube.com';
    expect(wrapper.find('input').instance().value).toEqual('www.youtube.com');
  });

  // click cancel after open
  it('cancel modal', () => {
    const defaultOpen = true;
    const setHookState = (newState) => jest.fn().mockImplementation(() => [
      newState,
      () => {},
    ]);
    const wrapper = mount(<VideoModal open={defaultOpen} setOpen={setHookState} setDefaultMedia={noop} setDefaultLink={noop} />)
    wrapper.find('#video-cancel-btn').at(1).simulate('click');
    expect(wrapper.props('open')).toBeFalsy();
  })
});

import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import ResultBarChart from './ResultBarChart';

describe('ResultBarChart', () => {
  // const noop = () => {};

  it('render graph when mount', () => {
    const ResultBarChart = shallow(<ResultBarChart options='' topic='' labels={[]} dataset={[]} />).simulate('click');
    expect(ResultBarChart.contains(<h3 align="center">Percentage of Correctness</h3>)).to.equal(true);
  });

  //   it('aria-label attribute is defined', () => {
  //     const button = shallow(<ResultBarChart onClick={noop} open={false} />);
  //     expect(button.props()['aria-label']).toBeDefined();
  //   });

  //   it('sets aria-expanded to false when closed', () => {
  //     const button = shallow(<ResultBarChart onClick={noop} open={false} />);
  //     expect(button.props()['aria-expanded']).toBe(false);
  //   });

  //   it('sets aria-expanded to true when open', () => {
  //     const button = shallow(<ResultBarChart onClick={noop} open={true} />);
  //     expect(button.props()['aria-expanded']).toBe(true);
  //   });
});

// describe('MenuItem', () => {
//   const noop = () => {};

//   it('triggers onClick event handler with title when clicked', () => {
//     const onClick = jest.fn();
//     shallow(<MenuItem onClick={onClick} title={'A title'} />).simulate('click');
//     expect(onClick).toBeCalledWith('A title');
//   });

//   it('renders with custom title', () => {
//     const title = 'My custom title';
//     const button = shallow(<MenuItem onClick={noop} title={title} />);
//     expect(button.text()).toBe(title);
//   })
// });

// describe('Menu', () => {
//   const noop = () => {};
//   const items = ['Item 1', 'Item 2', 'Item 3'];

//   it('is closed by default', () => {
//     const menu = shallow(<Menu onClick={noop} items={items} />);
//     expect(menu.find(MenuButton).first()).toBeDefined();
//     expect(menu.find(MenuItem).length).toBe(0);
//   });

//   it('creates a MenuItem for every provided item', () => {
//     const menu = shallow(<Menu onClick={noop} items={items} />);
//     expect(menu.find(MenuItem).length).toBe(0);
//     menu.find(MenuButton).first().simulate('click');
//     expect(menu.find(MenuItem).length).toBe(3);
//   });
// });

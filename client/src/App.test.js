import { render, screen } from '@testing-library/react';

import Comment from './Components/Clienttests/Comment';
import {SharedLayout} from './Pages/SharedLayout';




describe(Comment, () => {
    it("div has text test text ", () => {
      const {getByTestId} = render(<Comment />);
    const testdiv = getByTestId('testing').textContent;
    expect(testdiv).toEqual('test text');
    });

});

describe(SharedLayout, () => {
    it("renders the Header Component ", () => {
        const {getAllByRole} = render(<SharedLayout />);
        const divrole = getAllByRole('div');
        expect(divrole).toBeInTheDocument();
    });
});

// it('should render', () => {
//     const component = shallow(<MyComponent />);
//     const wrapper = component.find('myClassName');
//     expect(wrapper.length).toBe(1);
//   });




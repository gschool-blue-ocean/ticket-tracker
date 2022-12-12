import { getAllByTitle, render, screen } from '@testing-library/react';

import Comment from './Components/Clienttests/Comment';
import SharedLayout from './Pages/SharedLayout';

import Header from './Components/Admin/Header';
import { DataTable } from 'primereact/datatable';
import { table } from 'console';




describe(Comment, () => {
    it("div has text test text ", () => {
      const {getByTestId} = render(<Comment />);
    const testdiv = getByTestId('testing').textContent;
    expect(testdiv).toEqual('test text');
    });

});


//This test checks the DataTable component to make sure that it includes a table element on render
describe(table, () => {
    it("DataTable includes a table ", () => {
        const {getAllByRole} = render(<DataTable />);
        const divrole = getAllByRole('table');
        console.log(getAllByRole)
        console.log(divrole[0]);
        expect(divrole[0]).toBeInTheDocument();
        
    });

});

// it('should render', () => {
//     const component = shallow(<MyComponent />);
//     const wrapper = component.find('myClassName');
//     expect(wrapper.length).toBe(1);
//   });




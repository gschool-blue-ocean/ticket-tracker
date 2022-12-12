// import React, {useContextMock, useContext} from 'react';
// import ReactDOM from 'react-dom';
// import { render, screen, cleanup} from '@testing-library/react'
// import {expect, jest, test} from '@jest/globals';

import TestComponent from "./TestComponent";

// afterEach(cleanup)
it("renders without crashing", () =>{
    const renderer = new ShallowRenderer();
    renderer.render(<TestComponent/>);
    
})

// test('expext 1 + 1 to be 2', () =>  {
//     expect(1+1).toBe(2);
// })

// test('has the word test', () =>  {
//     render(<TestComponent/>)
//     expect(screen.getByText(`Test`)).toBeInTheDocument()
//     const Testelement = screen.getByTestId('TEST');
//     // expect(Testelement).toHaveTextContent("test");
    
    
// })
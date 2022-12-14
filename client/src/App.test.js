////Utilities
import { LoginProvider } from './Contexts/loginContext';
import { getAllByTitle, render, screen, cleanup, getByText, getByRole } from '@testing-library/react';


/////Components///////////////////////
import Comment from './Components/Clienttests/Comment';
import LoginForm from './Components/Login/loginForm';
import { DataTable } from 'primereact/datatable';
import CreateAccount from './Components/Admin/CreateAccount';



afterEach(cleanup)
//create a test that validates login success
//validate create account success
//validate login success
//expect(isloggedin toEqual true) in App.js
//obstacles: spoof or clone the login database
//test every component for text


/////////////UNIT TESTS////////////////////
describe("These are the Component tests", () => {
    test('should render the login form', async () => {
        
        const {getAllByRole} = render(
            <LoginProvider >
                <LoginForm />
            </LoginProvider>
        );
        const element = getAllByRole('textbox')
        console.log(element);
        expect(element[0]).toBeInTheDocument();

    })

    test('should render the CreateAccount Component', async () => {
        
        const {getAllByRole} = render(
            <LoginProvider >
                <CreateAccount/>
            </LoginProvider>
        );
        const formdiv = getAllByRole('textbox')
        // console.log(element);
        expect(formdiv[0]).toBeInTheDocument();

    })

    it("div has text test text ", () => {
        const {getByTestId} = render(<Comment />);
        const testdiv = getByTestId('testing').textContent;
        expect(testdiv).toEqual('test text');
    });
    it("DataTable includes a table ", () => {
        const {getAllByRole} = render(<DataTable />);
        const divrole = getAllByRole('table');

        expect(divrole[0]).toBeInTheDocument();
        
    });
});








    
    
    
    
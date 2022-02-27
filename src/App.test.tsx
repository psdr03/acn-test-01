import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

const mockAxios = new MockAdapter(axios);

const mockValues = [
  {
    userId: 12,
    id: 1,
    title: "test title",
    completed: false
  }
]

describe('Smoke test App component', () => {
  let container: HTMLElement | null = null;
  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    mockAxios.onGet(/jsonplaceholder/i).reply(200, mockValues);
    await act(async () => {
      render(<App />);
    })
  })

  afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
  })

  test('should render title', async () => {
    const linkElement = screen.getByText(/Payment Title/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('should render name input', () => {
    const name = screen.getByLabelText(/Name/i);
    expect(name).toBeInTheDocument();
  })

  test('should render email input', () => {
    const email = screen.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
  })

  test('should render date of birth input', () => {
    const dob = screen.getByLabelText(/Date of birth/i);
    expect(dob).toBeInTheDocument();
  })

  test('should render amount input', () => {
    const amount = screen.getByLabelText(/Amount/i);
    expect(amount).toBeInTheDocument();
  })

  test('should render the credt card number input', () => {
    // const ccNum = screen.getByLabelText('Credit card');
    const ccNum = screen.getByRole('textbox', { name: 'Card number' })
    expect(ccNum).toBeInTheDocument();
  })

  test('should render expiration date input', () => {
    const ccExp = screen.getByRole('textbox', { name: 'Expiry date in format MM YY' })
    expect(ccExp).toBeInTheDocument();
  })

  test('should render item description select', () => {
    const itemDesc = screen.getByLabelText(/Item Description/i);
    expect(itemDesc).toBeInTheDocument();
  })
})
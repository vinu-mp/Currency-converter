import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import CurrencyCard from './CurrencyCard';
import store from '../../store/index';

// This is just a basic testing file.
describe('Currency Card Component', () => {
  test('does not show error message on load', () => {
    render(<Provider store={store}><CurrencyCard /></Provider>);
    const errorText = screen.queryByText('Couldn\'t fetch conversion rate', {exact: false});
    expect(errorText).toBeNull();
  })
})
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import bannerImg from './assets/images/currency-banner.jpeg';
import CurrencyCard from './components/CurrencyCard/CurrencyCard';
import Footer from './components/Footer/Footer';
import {Provider} from 'react-redux';
import store from './store/index';

import './App.css';
function App() {
  return (
    <div className='App'>
      <Header/>
      <Banner img={bannerImg} title={'Check out the latest exchange rates'} subText={'Transact at the right time'}/>
      <div store={store} className='contentWrapper'>
        <Provider store={store}><CurrencyCard /></Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;

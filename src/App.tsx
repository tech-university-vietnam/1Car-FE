import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import store from './redux';
import AppRouters from './Routes';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouters />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

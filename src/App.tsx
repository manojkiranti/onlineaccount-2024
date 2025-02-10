import { AppRoutes } from './routes';
import AppProvider from './providers/app';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthListener from './components/Auth/AuthListener';
// import Loader from './components/Elements/Loader';

function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <AuthListener />
        <AppRoutes />

        {/* <Loader /> */}
      </Provider>
    </AppProvider>
  );
}

export default App;

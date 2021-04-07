import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import useApollo from '../graphql/useApollo';
import useNotifications from '../notifications/useNotifications';
import GlobalStyle from '../style/global';
import theme from '../style/theme';

import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useNotifications();
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;

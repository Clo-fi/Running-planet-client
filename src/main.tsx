import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import TanstackProvider from './libs/tanstack/TanstackProvider';
import { BrowserRouter } from 'react-router-dom';
import RootErrorBoundary from './components/RootErrorBoundary';
import { CookiesProvider } from 'react-cookie';
// import PwaInductionPage from './PwaInductionPage';
const Main = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log(event);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
  // useEffect(() => { document.documentElement.setAttribute('data-theme', 'dark'); }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  return (
    // <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <RootErrorBoundary>
          <TanstackProvider>
            <App />
            {deferredPrompt && (
              // TODO: PWA 다운안했을 시 다운 페이지 렌더링
              // <PwaInductionPage /> 
              <button onClick={handleInstallClick}>
                Install PWA
              </button>
            )}
          </TanstackProvider>
        </RootErrorBoundary>
      </BrowserRouter>
    </CookiesProvider>
    // </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Main />
);

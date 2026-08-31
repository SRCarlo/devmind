import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from './providers/ToastProvider';
import { ProgressProvider } from './providers/ProgressProvider';
import { IntroSplash } from '../components/ui/IntroSplash';
import { router } from './routes';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProgressProvider>
          {/* Tech Developer Opening Splash Animation */}
          <IntroSplash />
          <RouterProvider router={router} />
        </ProgressProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;

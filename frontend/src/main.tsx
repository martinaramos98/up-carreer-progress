import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import NewGrade from './routes/grade/NewGrade.tsx';
import Home from './routes/Home.tsx';
import './index.css';
import { HeroUIProvider } from '@heroui/react';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route
              index
              element={<Home />}
            />
            <Route path='grade'>
              <Route
                path='new'
                element={<NewGrade />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
);

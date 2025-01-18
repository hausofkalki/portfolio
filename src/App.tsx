import { HashRouter } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Work from "./pages/Work";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";
import { PageTransition } from "./components/PageTransition";
import { TransitionProvider } from "./context/TransitionContext";
import { useEffect, useState } from "react";

function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Hero />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/process"
          element={
            <PageTransition>
              <Process />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      // Simulate asset loading with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadAssets();
  }, []);
  return (
    <HashRouter>
      <TransitionProvider>
        {isLoading ? <LoadingScreen /> : <Pages />}
      </TransitionProvider>
    </HashRouter>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Plakater } from "./pages/Plakater";
import { Footer } from "./components/Footer";
import { Container } from "./components/Container";
import { Hero } from "./components/Hero";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Lyt til URL ændringer
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simpel router funktion
  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return (
          <>
            <Hero />
            <Container as="main">
              <Home />
            </Container>
          </>
        );
      case "/plakater":
        return <Plakater />;
      default:
        return (
          <>
            <Hero />
            <Container as="main">
              <div>404 - Siden blev ikke fundet</div>
            </Container>
          </>
        );
    }
  };

  return (
    <>
      <Header />
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;

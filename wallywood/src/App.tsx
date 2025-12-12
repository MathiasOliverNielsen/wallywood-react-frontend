import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Plakater } from "./pages/Plakater";
import { PosterDetail } from "./components/PosterDetail";
import { Footer } from "./components/Footer";
import { Container } from "./components/Container";
import { Hero } from "./components/Hero";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Global navigation handler
  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

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
    // Check for poster detail routes
    const posterMatch = currentPath.match(/^\/poster\/(.+)$/);
    if (posterMatch) {
      const posterSlug = posterMatch[1];
      return <PosterDetail posterSlug={posterSlug} onBack={() => navigateTo("/plakater")} />;
    }

    // Check for genre routes
    const genreMatch = currentPath.match(/^\/plakater\/genre\/([^/]+)$/);
    if (genreMatch) {
      const genreSlug = genreMatch[1];
      return <Plakater navigateTo={navigateTo} genreSlug={genreSlug} />;
    }

    switch (currentPath) {
      case "/":
        return (
          <>
            <Hero />
            <Container as="main">
              <Home navigateTo={navigateTo} />
            </Container>
          </>
        );
      case "/plakater":
        return <Plakater navigateTo={navigateTo} />;
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
      <Header currentPath={currentPath} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;

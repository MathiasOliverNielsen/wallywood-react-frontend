import { useState, useEffect } from "react";
import { Container } from "./Container";

export const Header = () => {
  const [cartCount] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<string>("");

  // Følg med i URL ændringer
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    // Sæt initial path
    updatePath();

    // Lyt til popstate (tilbage/frem knapper)
    window.addEventListener("popstate", updatePath);

    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  // Tjek om link er aktivt
  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  // Håndter navigation uden page reload
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  return (
    <header className="site-header">
      <Container className="header-inner">
        <h1>Wallywood</h1>
        <nav className="main-nav">
          <a href="/" className={isActive("/") ? "active" : ""} onClick={(e) => handleNavigation(e, "/")}>
            Forside
          </a>
          <a href="/plakater" className={isActive("/plakater") ? "active" : ""} onClick={(e) => handleNavigation(e, "/plakater")}>
            Plakater
          </a>
          <a href="/om-os" className={isActive("/om-os") ? "active" : ""} onClick={(e) => handleNavigation(e, "/om-os")}>
            Om os
          </a>
          <a href="/kontakt" className={isActive("/kontakt") ? "active" : ""} onClick={(e) => handleNavigation(e, "/kontakt")}>
            Kontakt os
          </a>
          <a href="/login" className={isActive("/login") ? "active" : ""} onClick={(e) => handleNavigation(e, "/login")}>
            Login
          </a>
          <button className="basket" aria-label="Kurv">
            Kurv ({cartCount})
          </button>
        </nav>
      </Container>
    </header>
  );
};

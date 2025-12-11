import { useState } from "react";
import { Container } from "./Container";

export const Header = () => {
  const [cartCount] = useState<number>(0);
  return (
    <header className="site-header">
      <Container className="header-inner">
        <h1>Wallywood</h1>
        <nav className="main-nav">
          <a href="/">Forside</a>
          <a href="#">Plakater</a>
          <a href="#">Om os</a>
          <a href="#">Kontakt os</a>
          <a href="#">Login</a>
          <button className="basket" aria-label="Kurv">
            Kurv ({cartCount})
          </button>
        </nav>
      </Container>
    </header>
  );
};

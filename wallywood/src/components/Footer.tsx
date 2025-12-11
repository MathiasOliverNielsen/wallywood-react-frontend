import { Container } from "./Container";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <p>© {new Date().getFullYear()} Wallywood. Alle rettigheder forbeholdes.</p>
        <p>Kontakt: support@wallywood.example</p>
      </Container>
    </footer>
  );
};

import { Container } from "./Container";

export const Hero = () => {
  return (
    <section className="hero">
      <Container className="hero-inner">
        <div className="hero-copy">
          <h2>Find din næste filmplakat</h2>
          <p>Originale plakater i mange genrer og størrelser.</p>
        </div>
      </Container>
    </section>
  );
};

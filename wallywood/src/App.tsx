import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { Container } from "./components/Container";

function App() {
  return (
    <>
      <Header />
      <Container as="main">
        <Home />
      </Container>
      <Footer />
    </>
  );
}

export default App;

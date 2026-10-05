import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import CursorGrid from "./components/CursorGrid";
import CustomCursor from "./components/CustomCursor";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

function App() {
  useScrollAnimations();

  return (
    <>
      <CursorGrid />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Background />
        <Contact />
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}

export default App;

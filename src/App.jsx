import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import WordsPreloader from "./components/WordsPreloader";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <WordsPreloader onComplete={handleIntroComplete} />
      <div inert={!introComplete} aria-hidden={!introComplete}>
        <Navbar />
        <main>
          <Hero />
          <Marquee className="pointer-events-none" speed={40} />
          <Projects />
          <Skills />
          <About />
          <Journey />
          <Education />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

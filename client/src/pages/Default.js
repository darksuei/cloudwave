import "../index.css";
import { Intro, Footer } from "../components/Reusable";

export function Default() {
  return (
    <div className='h-fit'>
      <Intro />
      <Footer />
    </div>
  );
}

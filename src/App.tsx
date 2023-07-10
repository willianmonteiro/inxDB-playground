
import Hero from './components/hero'
import Playground from './components/playground';

function App() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen">
      <div className="container mx-auto py-12">
        <Hero />
        <Playground />
      </div>
    </div>
  );
}

export default App

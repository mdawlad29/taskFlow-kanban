import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Column from "./components/Column";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <Column />

        <Footer />
      </div>
    </div>
  );
}

export default App;

import Header from "./partials/Header";
import Footer from "./partials/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          deleniti nostrum temporibus voluptatem ad ipsam libero laudantium
          animi explicabo consequuntur inventore, ut molestias reprehenderit sed
          architecto labore laboriosam! Odit, nesciunt?
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;

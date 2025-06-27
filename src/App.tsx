import { useState, useEffect } from "react";
import Column from "./components/Column";
import { Layouts } from "./partials/Layouts";
import { Loader } from "./shared/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Layouts>
          <Column />
        </Layouts>
      )}
    </>
  );
}

export default App;

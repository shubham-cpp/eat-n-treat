import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchbar from "./components/Searchbar";
import Chatbot from "./components/Chatbotcomp";
function App() {
  return (
    <div>
     <Navbar/>
     <Searchbar/>
     <Chatbot/>
    </div>
  );
}
export default App;

import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import Main from "./pages/Main";
import PageAdmin from "./pages/PageAdmin";
import NewsPage from "./pages/News";
import Header from "./components/Header/Header";
import { AuthProvider } from "reactfire";
import { AuthContextProvider } from "./firebase/authContext";
import { auth } from "./firebase/firebase";
import Footer from "./components/Footer/Footer";



function App() {

    return (
        <AuthProvider sdk={auth}>
            <AuthContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/news/" element={<NewsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/adminring" element={<PageAdmin />} />
                </Routes>
                <Footer />
            </AuthContextProvider>
        </AuthProvider>
    );
}

export default App;

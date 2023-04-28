import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutPage from "./pages/AboutPage";
import PageAdmin from "./pages/PageAdmin";
import NewsPage from "./pages/News/NewsPage";
import Header from "./components/Header";
import { AuthProvider } from "reactfire";
import { AuthContextProvider } from "./firebase/authContext";
import { auth } from "./firebase/firebase";



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
            </AuthContextProvider>
        </AuthProvider>
    );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PageTwo from "./pages/PageTwo";
import AboutPage from "./pages/AboutPage";
import PageCTA from "./pages/PageCTA";
import NewsPage from "./pages/News/NewsPage";
import Header from "./components/Header";
import { AuthProvider } from "reactfire";
import { AuthContextProvider } from "./firebase/authContext";
import { auth } from "./firebase/firebase";
import NewsPreview from "./pages/News/NewsList";
import NewsList from "./pages/News/NewsList";



function App() {

    return (
        <AuthProvider sdk={auth}>
            <AuthContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/news/" element={<NewsPage />} />
                    {/* <Route path="/page-two" element={<PageTwo />\} /> */}
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/admin" element={<PageCTA />} />
                </Routes>
            </AuthContextProvider>
        </AuthProvider>
    );
}

export default App;

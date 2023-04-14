import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase/firebase";


ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Router >
            <App />
        </Router>
    </FirebaseAppProvider>,
    document.getElementById("root")
);

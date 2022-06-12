/*
 * Project: frontend
 * File: index.js - Author: Miguel Couto (couttonet@gmail.com)
 * Copyright 2022 Miguel Couto,
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";

import "./Sass/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//Container
const container = document.getElementById("root");
//Root
const root = createRoot(container);

//React 18 new render
//@link https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
root.render(<App />)

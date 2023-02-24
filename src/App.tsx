import { Component } from "solid-js";

import { SubredditProvider } from "./context/SubredditProvider";
import Dashboard from "./views/Dashboard/Dashboard";
import Navbar from "./views/Navbar/Navbar";

const App: Component = () => {
  return (
    <SubredditProvider>
      <Navbar />
      <Dashboard />
    </SubredditProvider>
  );
};

export default App;

import { Component } from "solid-js";

import { SubredditProvider } from "./context/SubredditProvider";
import Dashboard from "./views/Dashboard/Dashboard";
import Navbar from "./views/Navbar/Navbar";

const App: Component = () => {
  return (
    <SubredditProvider>
      <div class="flex flex-nowrap">
        <Navbar />
        <Dashboard />
      </div>
    </SubredditProvider>
  );
};

export default App;

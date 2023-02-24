import { Component } from "solid-js";

import { SubredditProvider } from "./context/SubredditProvider";
import RedditDeck from "./views/Dashboard/Dashboard";
import Navbar from "./views/Navbar/Navbar";

const App: Component = () => {
  return (
    <SubredditProvider>
      <Navbar />
      <RedditDeck />
    </SubredditProvider>
  );
};

export default App;

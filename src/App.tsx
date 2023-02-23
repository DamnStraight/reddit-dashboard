import { Component } from "solid-js";

import Navbar from "./components/Navbar";
import { SubredditProvider } from "./context/SubredditProvider";
import RedditDeck from "./views/RedditDeck";

const App: Component = () => {
  return (
    <SubredditProvider>
      <Navbar />
      <RedditDeck />
    </SubredditProvider>
  );
};

export default App;

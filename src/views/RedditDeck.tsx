import { For } from "solid-js";
import SubredditView from "../components/SubredditView";
import { useSubreddits } from "../context/SubredditProvider";

function RedditDeck() {
  const [subreddits, _] = useSubreddits();

  return (
    <div class="h-[calc(100vh_-_56px)] bg-slate-700 flex flex-row space-x-2">
      <For each={subreddits()}>
        {(item) => <SubredditView subreddit={item} />}
      </For>
    </div>
  );
}

export default RedditDeck;

import SubredditLane from "@/components/SubredditLane/SubredditLane";
import { useSubreddits } from "@/context/SubredditProvider";
import { For } from "solid-js";

function Dashboard() {
  const [subreddits, _] = useSubreddits();

  return (
    <div class="z-0 max-h-screen flex-1 flex-grow bg-zinc-800 flex flex-row space-x-2 overflow-y-auto">
      <For each={subreddits()}>
        {(item) => <SubredditLane subreddit={item} />}
      </For>
    </div>
  );
}

export default Dashboard;

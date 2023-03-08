import SubredditLane from "@/components/SubredditLane/SubredditLane";
import { useSubreddits } from "@/context/SubredditProvider";
import { For } from "solid-js";

function Dashboard() {
  const [subreddits, _] = useSubreddits();

  return (
    <div class="h-[calc(100vh_-_56px)] bg-zinc-800 flex flex-row space-x-2 overflow-x-auto">
      <For each={subreddits()}>
        {(item) => <SubredditLane subreddit={item} />}
      </For>
    </div>
  );
}

export default Dashboard;

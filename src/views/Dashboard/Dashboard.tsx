import SubredditLane from "@/components/SubredditLane/SubredditLane";
import { useSubreddits } from "@/context/SubredditProvider";
import { createSignal, For, onMount } from "solid-js";
import { TbLetterK, TbPlus, TbCommand } from "solid-icons/tb";
import { ImCtrl } from "solid-icons/im";

function Dashboard() {
  const [subreddits, _] = useSubreddits();
  const [isMac, setIsMac] = createSignal(false);

  onMount(() => {
    // I'm sure this will fail for some things but good enough
    setIsMac(navigator.userAgent.toLowerCase().includes("mac"));
  });

  return (
    <div class="z-0 max-h-screen flex-1 flex-grow bg-zinc-700 flex flex-row space-x-2 overflow-y-auto">
      {subreddits().length === 0 ? (
        <div class="flex flex-grow bg-red justify-center items-center text-white space-x-1 opacity-60">
          <div class="flex flex-col space-y-4">
            <div class="text-center">Add a Subreddit!</div>
            <div class="flex">
              <div class="rounded-md p-4 border-white border-1 border-[1px]">
                {isMac() ? <TbCommand /> : <ImCtrl />}
              </div>
              <div class="rounded-md p-4 border-white">
                <TbPlus />
              </div>
              <div class="rounded-md p-4 border-white border-1 border-[1px]">
                <TbLetterK />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <For each={subreddits()}>
          {(item) => <SubredditLane subreddit={item} />}
        </For>
      )}
    </div>
  );
}

export default Dashboard;

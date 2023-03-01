import SubredditSearchModal from "@/components/SubredditSearchModal/SubredditSearchModal";
import { useSubreddits } from "@/context/SubredditProvider";
import { createSignal, For, onMount } from "solid-js";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [subreddits, { addSubreddit, addSubreddits }] = useSubreddits();

  onMount(() => {
    const maybeSubreddits = document.cookie
      .split("; ")
      .find((row) => row.startsWith("SUBREDDITS="))
      ?.split("=")[1];

    if (maybeSubreddits) {
      addSubreddits(JSON.parse(maybeSubreddits));
    }
  });

  return (
    <section>
      <SubredditSearchModal
        open={isOpen()}
        onOpenChange={(state: boolean) => {
          setIsOpen(state);
        }}
        onAdd={addSubreddit}
      />
      <div class="relative w-full px-4 py-2 bg-red-300 flex items-center space-x-2">
        <div>Reddeck</div>
        <For each={subreddits()} fallback={null}>
          {(item) => (
            <div class={`${styles["subreddit-icon"]} font-bold text-2xl`}>
              <div class={`${styles["subreddit-icon-overlay"]} text-xl`}>X</div>
              {item.charAt(0).toUpperCase()}
            </div>
          )}
        </For>
        <div
          class={`${styles["btn-add-subreddit"]}`}
          onClick={() => setIsOpen(true)}
        >
          +
        </div>
      </div>
    </section>
  );
}

export default Navbar;

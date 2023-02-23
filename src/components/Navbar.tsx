import { createSignal, For } from "solid-js";
import { useSubreddits } from "../context/SubredditProvider";
import styles from "./Navbar.module.css";
import SubredditSearchModal from "./SubredditSearchModal";

function Navbar() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [subreddits, { addSubreddit, removeSubreddit }] = useSubreddits();

  return (
    <section>
      <SubredditSearchModal
        open={isOpen()}
        onOpenChange={(state: boolean) => {
          setIsOpen(state);
        }}
        onAdd={addSubreddit}
      />
      <div class="absolute w-full px-4 py-2 bg-red-300 flex items-center space-x-2">
        <div>Reddeck</div>
        <For each={subreddits()} fallback={null}>
          {(item) => (
            <div class={`${styles["subreddit-icon"]}`}>
              <div class={`${styles["subreddit-icon-overlay"]}`}>X</div>
              {item}
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

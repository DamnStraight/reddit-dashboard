import { createSignal, For } from "solid-js";
import styles from "./Navbar.module.css";
import SubredditSearchModal from "./SubredditSearchModal";

const TEMP_REDDITS = ["1", "2", "3"];

function Navbar() {
  const [subreddits, setSubreddits] = createSignal<string[]>([...TEMP_REDDITS]);
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <section>
      <SubredditSearchModal
        open={isOpen()}
        onOpenChange={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <div class="absolute w-full px-4 py-2 bg-red-300 flex items-center space-x-2">
        <div>Reddeck</div>
        <For each={subreddits()} fallback={<div>Fetching...</div>}>
          {(item) => (
            <div class={`${styles["subreddit-icon"]}`}>
              <div class={`${styles["subreddit-icon-overlay"]}`}>X</div>
              {item}
            </div>
          )}
        </For>
        <div class={`${styles["btn-add-subreddit"]}`} onClick={() => setIsOpen(true)}>
          +
        </div>
      </div>
    </section>
  );
}

export default Navbar;

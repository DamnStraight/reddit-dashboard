import SubredditSearchModal from "@/components/SubredditSearchModal/SubredditSearchModal";
import { useSubreddits } from "@/context/SubredditProvider";
import { createSignal, For, onMount, Show } from "solid-js";
import useKeyListener from "../../hooks/useKeyListener";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [subreddits, { addSubreddit, addSubreddits, removeSubreddit }] = useSubreddits();

  useKeyListener(handleKeyDown);

  onMount(() => {
    const maybeSubreddits = document.cookie
      .split("; ")
      .find((row) => row.startsWith("SUBREDDITS="))
      ?.split("=")[1];

    if (maybeSubreddits) {
      addSubreddits(JSON.parse(maybeSubreddits));
    }
  });

  function handleKeyDown(event: any) {
    if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <section>
      <Show when={isOpen()} fallback={null}>
        <SubredditSearchModal
          open={isOpen()}
          onOpenChange={(state: boolean) => {
            setIsOpen(state);
          }}
          onAdd={addSubreddit}
        />
      </Show>

      <div class="relative w-full px-4 py-2 bg-zinc-900 flex items-center space-x-2 text-white">
        <div>Reddeck</div>
        <For each={subreddits()} fallback={null}>
          {(item, i) => (
            <div class={`${styles["subreddit-icon"]} font-bold text-2xl`} onClick={() => removeSubreddit(i())}>
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

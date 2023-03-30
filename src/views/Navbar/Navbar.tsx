import SubredditSearchModal from "@/components/SubredditSearchModal/SubredditSearchModal";
import { useSubreddits } from "@/context/SubredditProvider";
import { createSignal, For, onMount, Show } from "solid-js";
import useKeyListener from "../../hooks/useKeyListener";
import styles from "./Navbar.module.css";
import { ImPlus } from "solid-icons/im";
import { FaSolidXmark } from "solid-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [subreddits, { addSubreddit, addSubreddits, removeSubreddit }] =
    useSubreddits();

  useKeyListener(handleKeyDown);

  onMount(() => {
    if (subreddits().length > 0) return;

    const maybeSubreddits = document.cookie
      .split("; ")
      .find((row) => row.startsWith("SUBREDDITS="))
      ?.split("=")[1];

    if (maybeSubreddits) {
      addSubreddits(JSON.parse(maybeSubreddits));
    }
  });

  function handleKeyDown(event: any) {
    if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <section class="flex overflow-auto">
      <Show when={isOpen()} fallback={null}>
        <SubredditSearchModal
          open={isOpen()}
          onOpenChange={(state: boolean) => {
            setIsOpen(state);
          }}
          onAdd={addSubreddit}
        />
      </Show>

      <div class="sticky flex-grow-0 z-10 self-start h-screen w-14 px-10 py-4 bg-zinc-900 flex flex-col items-center space-y-2 text-white">
        <For each={subreddits()} fallback={null}>
          {(item, i) => (
            <div
              class={`${styles["subreddit-icon"]} font-bold text-2xl overflow-hidden`}
              onClick={() => removeSubreddit(i())}
            >
              <div class={`${styles["subreddit-icon-overlay"]} text-xl`}>
                <FaSolidXmark />
              </div>
              <Show
                when={!!item.icon}
                fallback={item.name.charAt(0).toUpperCase()}
              >
                <img src={item.icon} />
              </Show>
            </div>
          )}
        </For>
        <div
          class={`${styles["btn-add-subreddit"]}`}
          onClick={() => setIsOpen(true)}
        >
          <ImPlus />
        </div>
      </div>
    </section>
  );
}

export default Navbar;

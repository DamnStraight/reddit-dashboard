import { debounce } from "@solid-primitives/scheduled";
import {
  createEffect,
  createSignal,
  For,
  JSX,
  ParentProps,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";

type ModalProps = {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onAdd: (subreddit: string) => void;
} & ParentProps;

function SubredditSearchModal(props: ModalProps): JSX.Element {
  const [redditSearch, setRedditSearch] = createSignal<string>("");
  const [subreddits, setSubreddits] = createSignal<string[]>([]);

  let searchInput: HTMLInputElement | undefined;

  createEffect(() => {
    // When open changes to true, set focus to input
    if (props.open) {
      searchInput?.focus();
    }
  });

  const querySubreddits = async () => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURI(
        redditSearch()
      )}&type=sr&include_over_18=true&limit=10`
    );

    const json = await response.json();

    const subreddits = json.data.children.map(
      (item: any) => item.data.display_name
    );

    setSubreddits(subreddits);
  };

  const debounceInput = debounce(querySubreddits, 400);

  const onInputChange = (input: string) => {
    setRedditSearch(input);
    debounceInput();
  };

  const keyHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      props.onOpenChange(false);
    }
  };

  return (
    <Show when={props.open} fallback={null}>
      <Portal>
        <div class="w-[500px] p-2 bg-gray-700 shadow-lg fixed top-[25%] flex flex-col left-[calc(50%_-_250px)] rounded-md overflow-hidden">
          <input
            ref={searchInput}
            class="h-14 rounded-md p-2 font-bold text-xl"
            value={redditSearch()}
            onInput={(e) => onInputChange(e.currentTarget.value)}
            placeholder="Search for subreddit"
            // onFocusOut={() => props.onOpenChange(false)}
            onKeyDown={keyHandler}
          />
          <div class="space-y-2 pt-2:first-child">
            <For each={subreddits()}>
              {(item, index) => (
                <div
                  class="text-lg font-bold px-4 py-2 my-2 rounded-md bg-slate-200 hover:bg-slate-300 cursor-pointer"
                  onClick={() => {
                    props.onAdd(subreddits()[index()]);
                    props.onOpenChange(false);
                  }}
                >
                  {item}
                </div>
              )}
            </For>
          </div>
        </div>
      </Portal>
    </Show>
  );
}

export default SubredditSearchModal;

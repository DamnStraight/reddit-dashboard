import { debounce } from "@solid-primitives/scheduled";
import {
  createEffect,
  createSignal,
  For,
  JSX, ParentProps,
  Show
} from "solid-js";
import { Portal } from "solid-js/web";

type ModalProps = {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onAdd?: () => void;
} & ParentProps;

function SubredditSearchModal(props: ModalProps): JSX.Element {
  let searchInput: HTMLInputElement | undefined;

  const [redditSearch, setRedditSearch] = createSignal<string>("");
  const [subreddits, setSubreddits] = createSignal<string[]>([]);

  createEffect(() => {
    if (props.open) {
      searchInput?.focus();
    }
  });

  const querySubreddits = async () => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${redditSearch()}&type=sr&include_over_18=true`
    );

    const json = await response.json();

    const subreddits = json.data.children
      .slice(0, 10)
      .map((item: any) => item.data.display_name_prefixed);

    setSubreddits(subreddits);
  };

  const debounceInput = debounce(querySubreddits, 400);

  const onInputChange = (input: string) => {
    setRedditSearch(input);
    debounceInput();
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
            onFocusOut={() => props.onOpenChange(false)}
          />
          <div class="space-y-2">
            <For each={subreddits()}>
              {(item) => (
                <div class="text-lg font-bold px-4 py-2 my-2 rounded-sm bg-slate-200">
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

import { debounce } from "@solid-primitives/scheduled";
import {
  createEffect,
  createSignal,
  For,
  JSX,
  onMount,
  ParentProps,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type ModalProps = {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onAdd: (subreddit: string) => void;
} & ParentProps;

function SubredditSearchModal(props: ModalProps): JSX.Element {
  const [redditSearch, setRedditSearch] = createSignal<string>("");
  const [subreddits, setSubreddits] = createSignal<string[]>([]);

  let searchInput: HTMLInputElement | undefined;
  let searchWrapper: HTMLDivElement | undefined;

  onMount(() => {
    // ? ref will be undefined unless we pass it in the mount function
    useOutsideClick(searchWrapper, () => props.onOpenChange(false));
  });

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
      )}&type=sr&include_over_18=false&limit=10`
    );

    const json = await response.json();

    const subreddits = json.data?.children.map((item: any) => {
      return item.data.display_name;
    });

    if (subreddits) {
      setSubreddits(subreddits);
    }
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
    <Portal>
      <div
        ref={searchWrapper}
        class="w-[450px] p-2 bg-zinc-700 shadow-lg fixed top-[25%] flex flex-col left-[calc(50%_-_250px)] rounded-md overflow-hidden border-[1px] border-zinc-500"
      >
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
                class="text-lg font-bold px-4 py-2 my-2 h-14 rounded-md bg-slate-100 hover:bg-slate-300 cursor-pointer flex flex-col justify-center"
                onClick={() => {
                  props.onAdd(subreddits()[index()]);
                  props.onOpenChange(false);
                }}
              >
                {`/r/${item}`}
              </div>
            )}
          </For>
        </div>
      </div>
    </Portal>
  );
}

export default SubredditSearchModal;

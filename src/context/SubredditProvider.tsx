import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  useContext,
} from "solid-js";

type SubredditsContextState = [
  Accessor<string[]>,
  {
    addSubreddit: (subreddit: string) => void;
    removeSubreddit: (index: number) => void;
  }
];

type SubredditProviderProps = {} & ParentProps;

const SubredditContext = createContext<SubredditsContextState>();

export function SubredditProvider(props: SubredditProviderProps) {
  const [subreddits, setSubreddits] = createSignal<string[]>([]);
  const subredditManager = [
    subreddits,
    {
      addSubreddit(subreddit: string) {
        setSubreddits((prev) => [...prev, subreddit]);
      },
      removeSubreddit(index: number) {
        setSubreddits((prev) => [...prev].splice(index, 1));
      },
    },
  ] satisfies SubredditsContextState;

  return (
    <SubredditContext.Provider value={subredditManager}>
      {props.children}
    </SubredditContext.Provider>
  );
}

export function useSubreddits() {
  // FIXME Remove non-null assertion
  return useContext(SubredditContext)!;
}

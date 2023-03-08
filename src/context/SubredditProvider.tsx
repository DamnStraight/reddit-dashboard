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
    addSubreddits: (subreddits: string[]) => void;
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
        setSubreddits((prev) => {
          document.cookie = `SUBREDDITS=${JSON.stringify([...prev, subreddit])}`
          return [...prev, subreddit]
        });
      },
      addSubreddits(subreddits: string[]) {
        setSubreddits((prev) => {
          document.cookie = `SUBREDDITS=${JSON.stringify([...prev, ...subreddits])}`
          return [...prev, ...subreddits]
        });
      },
      removeSubreddit(index: number) {
        setSubreddits((prev) => {
         let result = [...prev];
         result.splice(index, 1);
         document.cookie = `SUBREDDITS=${JSON.stringify(result)}`
         return result;
        });
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

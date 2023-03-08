import {
  Accessor,
  createContext,
  createSignal,
  ParentProps,
  useContext,
} from "solid-js";
import { SubredditData } from "../components/SubredditSearchModal/SubredditSearchModal";

type SubredditsContextState = [
  Accessor<SubredditData[]>,
  {
    addSubreddit: (subreddit: SubredditData) => void;
    addSubreddits: (subreddits: SubredditData[]) => void;
    removeSubreddit: (index: number) => void;
  }
];

type SubredditProviderProps = {} & ParentProps;

const SubredditContext = createContext<SubredditsContextState>();

export function SubredditProvider(props: SubredditProviderProps) {
  const [subreddits, setSubreddits] = createSignal<SubredditData[]>([]);
  const subredditManager = [
    subreddits,
    {
      addSubreddit(subreddit: SubredditData) {
        setSubreddits((prev) => {
          document.cookie = `SUBREDDITS=${JSON.stringify([
            ...prev,
            subreddit,
          ])}`;
          return [...prev, subreddit];
        });
      },
      addSubreddits(subreddits: SubredditData[]) {
        setSubreddits((prev) => {
          document.cookie = `SUBREDDITS=${JSON.stringify([
            ...prev,
            ...subreddits,
          ])}`;
          return [...prev, ...subreddits];
        });
      },
      removeSubreddit(index: number) {
        setSubreddits((prev) => {
          let result = [...prev];
          result.splice(index, 1);
          document.cookie = `SUBREDDITS=${JSON.stringify(result)}`;
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

import { createResource, createSignal, For } from "solid-js";
import { Post, PostRequest } from "../types/Reddit";
import Spinner from "./Spinner";

type SubredditViewProps = {
  subreddit: string;
};

type SortBy = "hot" | "top" | "new";

const shrink = (text: string, limit: number) =>
  `${text.slice(0, limit + 1)}...`;

const fetchPosts = async (subreddit: string) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const json: PostRequest = await response.json();

  if (!json.data) {
    return [];
  }

  return json.data.children.map(({ data }: any) => ({
    title: data.title,
    comments: data["num_comments"],
  }));
};

// TODO Add types for reddit fetch and createResource
function SubredditView(props: SubredditViewProps) {
  const [sortBy, setSortBy] = createSignal<SortBy>("hot");

  const [posts, { mutate, refetch }] = createResource(
    props.subreddit,
    fetchPosts
  );

  return (
    <div class="h-full w-[450px] bg-slate-200 overflow-y-auto space-y-4 p-2">
      <h1>{props.subreddit}</h1>
      {posts.loading && <Spinner />}
      <For each={posts()}>
        {(item: any) => (
          <div class="w-full p-2 shadow-sm bg-slate-400 rounded-md">
            {shrink(item.title, 50)}
            <br />
            {item.comments}
          </div>
        )}
      </For>
    </div>
  );
}

export default SubredditView;

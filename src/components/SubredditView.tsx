import { createResource, createSignal, For } from "solid-js";
import { Post, PostRequest } from "../types/Reddit";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

type SubredditViewProps = {
  subreddit: string;
};

type SortBy = "hot" | "top" | "new";

const fetchPosts = async (subreddit: string) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?raw_json=1`);
  const json: PostRequest = await response.json();

  if (!json.data) {
    return [];
  }

  return json.data.children.map(({ data }) => ({
    ...data,
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
    <div class="h-full min-w-[450px] w-[450px] bg-slate-400 overflow-y-auto space-y-4 p-2">
      <h1>{props.subreddit}</h1>
      {posts.loading && <Spinner />}
      <For each={posts()}>
        {(item) => (
          <PostCard post={item} />
        )}
      </For>
    </div>
  );
}

export default SubredditView;

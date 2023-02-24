import { createResource, createSignal, For } from "solid-js";
import { PostRequest, RedditPost } from "@/types/Reddit";
import Post from "../Post/Post";
import Spinner from "../Spinner/Spinner";

type SubredditLaneProps = {
  subreddit: string;
};

type SortBy = "hot" | "top" | "new";

type FetchPostParams = { subreddit: string; sortBy: SortBy };

const fetchPosts = async ({ subreddit, sortBy }: FetchPostParams) => {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/${sortBy}/.json?raw_json=1`
  );
  const json: PostRequest = await response.json();

  if (!json.data) {
    return { after: "", data: [] };
  }
  const after = json.data.after;
  const data = json.data.children.map(({ data }) => ({
    ...data,
  }));

  return {
    after,
    data,
  };
};

type PostData = { data: RedditPost[]; after: string };

// TODO Add types for reddit fetch and createResource
function SubredditLane(props: SubredditLaneProps) {
  const [sortBy, setSortBy] = createSignal<SortBy>("hot");

  let scrollableDiv: HTMLDivElement | undefined;

  const [posts, { mutate }] = createResource<PostData, FetchPostParams>(
    () => ({ subreddit: props.subreddit, sortBy: sortBy() }),
    fetchPosts
  );

  const scrollHandler = (e: any) => {
    if (scrollableDiv) {
      const { scrollHeight, clientHeight, scrollTop } = scrollableDiv;

      // container is scrolled completely to the bottom
      if (scrollHeight - clientHeight - scrollTop === 0) {
        if (!posts()) return;

        fetchNextPage();
      }
    }
  };

  const fetchNextPage = async () => {
    const currentPosts = posts();

    if (!currentPosts) return;

    const { after } = currentPosts;

    const response = await fetch(
      `https://www.reddit.com/r/${
        props.subreddit
      }/${sortBy()}/.json?raw_json=1&after=${after}`
    );

    const json: PostRequest = await response.json();

    if (!json.data) {
      return [];
    }

    const nextAfter = json.data.after;
    const nextPages = json.data.children.map(({ data }) => ({
      ...data,
    }));

    mutate((prev) => {
      if (!prev) return prev;

      return {
        after: nextAfter,
        data: [...prev.data, ...nextPages],
      };
    });
  };

  return (
    <div class="relative max-h-screen h-full min-w-[450px] w-[450px] bg-slate-400 flex flex-col">
      <div class="w-full bg-slate-600 text-3xl font-bold text-center py-2">
        {`r/${props.subreddit}`}
      </div>
      {posts.loading && <Spinner />}
      <div
        ref={scrollableDiv}
        class=" w-full h-full overflow-y-auto space-y-4 p-2"
        onScroll={scrollHandler}
      >
        <For each={posts()?.data}>{(item) => <Post post={item} />}</For>
      </div>
    </div>
  );
}

export default SubredditLane;

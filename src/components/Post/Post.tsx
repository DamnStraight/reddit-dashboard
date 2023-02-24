import { For } from "solid-js";
import { RedditPost } from "@/types/Reddit";

type PostCardProps = {
  post: RedditPost;
}

function Post(props: PostCardProps) {
  return (
    <div class="w-full bg-slate-200 rounded-md shadow-md p-2">
      <div class="font-bold">{props.post.title}</div>
      <div class="bg-slate-400">Media here</div>
      <div class="flex flex-row justify-end py-2">
        <For each={props.post.all_awardings}>
          {(item) => <img src={item.resized_icons.find((size) => size.width === 16)?.url} />}
        </For>
      </div>
    </div>
  )
}

export default Post;
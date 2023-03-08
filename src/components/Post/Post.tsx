import { For, Show } from "solid-js";
import { RedditPost } from "@/types/Reddit";

type PostCardProps = {
  post: RedditPost;
};

function Post(props: PostCardProps) {
  const hasMedia = !!props.post.preview;
  const isNSFW = props.post.thumbnail === "nsfw";

  return (
    <div class="w-full bg-slate-200 rounded-md shadow-md p-2 space-y-2">
      <div class="font-bold">{props.post.title}</div>
      <Show when={hasMedia} fallback={null}>
        <div class="bg-zinc-500 flex justify-center rounded-md overflow-hidden">
          <img
            class={`object-cover h-48 ${isNSFW ? "blur-md" : ""}`}
            src={props.post.preview.images[0]?.resolutions[0]?.url}
            loading="lazy"
          />
        </div>
      </Show>
      <div class="flex flex-row justify-end py-2">
        <div>{props.post.downs}</div>
        <div>{props.post.ups}</div>
        <For each={props.post.all_awardings}>
          {(item) => (
            <img
              src={item.resized_icons.find((size) => size.width === 16)?.url}
            />
          )}
        </For>
      </div>
    </div>
  );
}

export default Post;

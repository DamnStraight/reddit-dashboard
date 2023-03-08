import { For, Show } from "solid-js";
import { RedditPost } from "@/types/Reddit";
import { FaSolidCircleArrowUp } from "solid-icons/fa";
import { FaSolidCircleArrowDown } from "solid-icons/fa";

type PostCardProps = {
  post: RedditPost;
};

function Post(props: PostCardProps) {
  const hasMedia = props.post.preview !== undefined && props.post.preview.images.length > 0;
  const isNSFW = props.post.thumbnail === "nsfw";
  let src = undefined;

  if (hasMedia) {
    src = props.post.preview.images[0]?.resolutions[0]?.url;
  }

  return (
    <div class="w-full bg-slate-200 rounded-md shadow-md p-2 space-y-2">
      <div class="font-bold">{props.post.title}</div>
      <Show when={hasMedia} fallback={null}>
        <div class="bg-zinc-500 flex justify-center rounded-md overflow-hidden">
          <img
            class={`object-cover h-48 ${isNSFW ? "blur-md" : ""}`}
            src={src}
            loading="lazy"
          />
        </div>
      </Show>
      <div class="flex flex-row pt-2 items-center justify-between">
        <div>
          <For each={props.post.all_awardings}>
            {(item) => (
              <img
                src={item.resized_icons.find((size) => size.width === 16)?.url}
              />
            )}
          </For>
        </div>
        <div class="flex justify-center items-center">
          <FaSolidCircleArrowUp class="inline-block" />
          {` ${props.post.ups}`}
        </div>
      </div>
    </div>
  );
}

export default Post;

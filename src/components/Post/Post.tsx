import { RedditPost } from "@/types/Reddit";
import { FaSolidCircleArrowUp } from "solid-icons/fa";
import { For, Show } from "solid-js";

type PostCardProps = {
  post: RedditPost;
};

function Post(props: PostCardProps) {
  const hasMedia =
    props.post.preview !== undefined && props.post.preview.images.length > 0;
  const isNSFW = props.post.thumbnail === "nsfw";
  let src = undefined;

  if (hasMedia) {
    src = props.post.preview.images[0]?.resolutions[0]?.url;
  }

  return (
    <div
      onClick={() =>
        window.open(`https://old.reddit.com${props.post.permalink}`)
      }
      class="w-full bg-slate-100 hover:bg-slate-200 transition rounded-md shadow-md p-2 space-y-2 border-zinc-900/75 border-[1px] cursor-pointer"
    >
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
          <FaSolidCircleArrowUp class="inline-block mr-1" />
          {` ${props.post.ups}`}
        </div>
      </div>
    </div>
  );
}

export default Post;

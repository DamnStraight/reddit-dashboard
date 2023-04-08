import { RedditPost } from "@/types/Reddit";
import { FaSolidCircleArrowUp } from "solid-icons/fa";
import { For, Show } from "solid-js";
import { FiEyeOff } from "solid-icons/fi";

type PostCardProps = {
  post: RedditPost;
};

function Post(props: PostCardProps) {
  const hasMedia =
    props.post.preview !== undefined && props.post.preview.images.length > 0;
  const isNSFW = props.post.thumbnail === "nsfw";
  let src = undefined;

  if (hasMedia) {
    src = props.post.preview.images[0]?.resolutions[1]?.url;
  }

  return (
    <div
      onClick={() =>
        window.open(`https://old.reddit.com${props.post.permalink}`)
      }
      class="w-full bg-slate-100 hover:bg-slate-200 transition rounded-xl shadow-md p-2 space-y-2 border-zinc-900/75 border-[1px] cursor-pointer"
    >
      <div class="font-bold">{props.post.title}</div>
      <Show when={hasMedia} fallback={null}>
        <div class="relative bg-zinc-700 flex justify-center rounded-xl overflow-hidden">
          <img
            class={`object-cover h-48 ${isNSFW ? "blur-md" : ""}`}
            src={src}
            loading="lazy"
          />
          {isNSFW ? (
            <FiEyeOff
              size={30}
              class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] opacity-25"
            />
          ) : undefined}
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

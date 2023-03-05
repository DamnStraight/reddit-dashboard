import { onCleanup, onMount } from "solid-js";

function useKeyListener(keyHandler: (event: any) => void) {
  onMount(() => {
    document.addEventListener("keydown", keyHandler);

    onCleanup(() => {
      document.addEventListener("keydown", keyHandler);
    })
  });
}

export default useKeyListener;
import { onCleanup, onMount } from "solid-js";

/**
 * Takes a ref to an HTMLElement and runs a function when the user clicks
 * outside the elements dimensions
 * @param ref Target element
 */
export function useOutsideClick(
  ref: HTMLElement | undefined,
  handler: () => void
) {
  const handleClickOutside = (event: any) => {
    if (ref && !ref.contains(event.target)) {
      handler();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  onCleanup(() =>
    document.removeEventListener("mousedown", handleClickOutside)
  );
}

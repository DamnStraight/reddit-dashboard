import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div class="absolute h-full w-full flex justify-center items-center top-0 bottom-0 ">
      <div class={`relative ${styles.loader}`}></div>
    </div>
  )
}

export default Spinner;
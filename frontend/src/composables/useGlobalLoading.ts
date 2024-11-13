import { getCurrentInstance } from "vue";

export default function useGlobalLoading() {
  const instance = getCurrentInstance();

  const start = () => {
    instance?.proxy?.$globalLoading({
      lock: true,
      text: 'Loading...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  };

  const finish = () => {
    instance?.proxy?.$globalLoading().close();
  }

  return {
    start,
    finish
  };
}

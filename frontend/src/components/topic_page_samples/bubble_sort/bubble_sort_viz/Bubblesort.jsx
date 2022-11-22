import { swap } from "./swap";

export function BubbleSort(array) {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
      let flagToStopBubbleSort = false;
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1, animations);
          flagToStopBubbleSort = true;
          animations.push([j, j + 1, true]);
          animations.push([j, j + 1, true]);
        } else {
          animations.push([j, j + 1, false]);
          animations.push([j, j + 1, false]);
        }
      }
  
      if (!flagToStopBubbleSort) {
        break;
      }
    }
    return animations;
}
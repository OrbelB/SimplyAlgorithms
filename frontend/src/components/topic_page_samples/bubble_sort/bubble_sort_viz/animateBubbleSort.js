import Settings from './Settings';
import { CheckIfSorted } from './CheckifSorted';

export function animateBubbleSort(animations, setIsSorted, ARRAY_BARS, populatedArray) {
    Settings.SLIDER[0].disabled = true;
    Settings.BUTTONS[0].disabled = true;
    Settings.BUTTONS[1].disabled = true;
    let swapCount = 0;
    let comparisonCount = 0;
    for (let i = 0; i < animations.length; i++) {
      const [ithBar, jthBar, swap] = animations[i];
      const ithBarStyle = ARRAY_BARS.current[ithBar].style;
      const jthBarStyle = ARRAY_BARS.current[jthBar].style;
      
      if (!swap) {
        setTimeout(() => {
          swapCount = 0;
          if (comparisonCount % 2 === 0) {
            ithBarStyle.background = Settings.POINTER_ONE_COLOR;
            jthBarStyle.background = Settings.POINTER_TWO_COLOR;
            comparisonCount++;
          } else {
            ithBarStyle.background = Settings.NORMAL_COLOR;
            jthBarStyle.background = Settings.NORMAL_COLOR;
            comparisonCount++;
          }
          setIsSorted(CheckIfSorted(ARRAY_BARS.current));
        }, Settings.ANIMATION_DURATION / populatedArray.length * i);
      } else {
        setTimeout(() => {
          comparisonCount = 0;
          if (swapCount % 2 === 0) {
            ithBarStyle.background = Settings.POINTER_ONE_COLOR;
            jthBarStyle.background = Settings.POINTER_TWO_COLOR;
            const ithBarTempStyle = ithBarStyle.height;
            ithBarStyle.height = jthBarStyle.height;
            jthBarStyle.height = ithBarTempStyle;
            swapCount++;
          } else {
            ithBarStyle.background = Settings.NORMAL_COLOR;
            jthBarStyle.background = Settings.NORMAL_COLOR;
            swapCount++;
          }
          setIsSorted(CheckIfSorted(ARRAY_BARS.current));
        }, Settings.ANIMATION_DURATION / populatedArray.length * i);
      }
    }
}
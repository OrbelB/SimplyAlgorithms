export function CheckIfSorted(bars) {
    let flag = true;
    for (let i = 0; i < bars.length-1; i++) {
        if(parseFloat(bars[i].style.height) > parseFloat(bars[i+1].style.height)){
            flag = false;
            break;
        }
    }

    return flag;
}

/**
 * 验证回文字符串
 * 回文串：一个字符串从左往右读和从右往左读都是一样的，比如："racecar"、"level"、"deified"等等。忽略大小写，空格，非字母数字等符号。
 * @param {*} s 
 * @returns 
 */



function isPalindrome(s) {
    const isValide = s=>/^[a-zA-Z0-9\w]+$/.test(s);
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if(!isValide(s[i])){
            i++;
            continue;
        }
        if(!isValide(s[j])){
            j--;
            continue;
        }
        if (s[i].toLowerCase()!== s[j].toLowerCase()) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome("0P")); // false 
console.log(isPalindrome("race e   car")); // false
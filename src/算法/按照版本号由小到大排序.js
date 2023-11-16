// 【代码题】按照版本号由小到大排序
// 样例输入：versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
// 输出：['0.1.1', '0.302.1', '2.3.3','4.2', '4.3.4.5', '4.3.5']



function versionCompare(a, b) {
  const v1 = a.split('.');
  const v2 = b.split('.');
  let i = 0;
  while (i < v1.length && i < v2.length) {
    const part1 = parseInt(v1[i]);
    const part2 = parseInt(v2[i]);
    if (part1 !== part2) {
      return part1 - part2;
    }
    i++;
  }
  if (v1.length !== v2.length) {
    return v1.length - v2.length;
  }
  return 0;
}
function compareVersions(versions){
  versions.sort(versionCompare);
}
const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];
compareVersions(versionCompare);
console.log(versions);
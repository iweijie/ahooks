// 将HTML转义为实体
export function escape(html) {
  var elem = document.createElement('div');
  var txt = document.createTextNode(html);
  elem.appendChild(txt);
  return elem.innerHTML;
}
// 将实体转回为HTML
export function unescape(str) {
  var elem = document.createElement('div');
  elem.innerHTML = str;
  return elem.innerText || elem.textContent;
}

export function getUrlVars() {
  var vars: { [key: string]: string } = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = decodeURI(value);
    return '';
  });
  return vars;
}

export function createWebsiteURLWithData(key: string, data: string) {
  return encodeURI(window.location.href + `/?${key}=${data}`);
}

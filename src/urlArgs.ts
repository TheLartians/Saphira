
export function getUrlVars() {
  var vars: {[key: string]: string} = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
      return "";
  });
  return vars;
}

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken ,contentType: "application/json; charset=utf-8", };
  } else {
    return {};
  }
}

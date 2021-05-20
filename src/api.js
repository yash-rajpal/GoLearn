const baseurl = "https://tarp-golearn.herokuapp.com";

const url = {
  token_createUser: "/accounts/token/createuser",
  token_loginUser: "/accounts/token/login",
  student_createUser: "/student/createuser",
};

export const tokenCreateUser = async (obj) => {
  var resultvar;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var raw = JSON.stringify(obj);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(baseurl + url.token_createUser, requestOptions)
    .then((response) => response.text())
    .then((result) => (resultvar = result))
    .catch((error) => console.log("error", error));
  console.log("result = ", resultvar);
  return resultvar;
};

export const tokenLogin = async (obj) => {
  let result = "";
  const headers = {
    "Content-Type": "application/json",
  };
  let res = await fetch(baseurl + url.token_loginUser, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  let json = await res.json();
  console.log("token in api = ", json);
  return json ? json.token : false;
};

export const studentCreateUser = async (obj, token) => {
  let result = "";
  const headers = {
    "Content-Type": "application/json",
    // Accept: "application/json",
    Authorization: token, //`token ${token}`,
  };
  let res = await fetch(baseurl + url.student_createUser, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  let json = await res.json();
  console.log("token in api = ", json);
  return json ? true : false;
};

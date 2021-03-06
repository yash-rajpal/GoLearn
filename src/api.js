/**
 *
 * Login email : abc@gmail.com
 * password:12345
 */

// const baseurl = "https://tarp-golearn.herokuapp.com";
const baseurl = "https://a82ef1a38e5e.ngrok.io";

const url = {
  token_createUser: "/accounts/token/createuser",
  token_loginUser: "/accounts/token/login",
  student_createUser: "/student/createuser",
  start_quiz: "/student/starttest/",
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
    Authorization: `token ${token}`,
  };
  let res = await fetch(baseurl + url.student_createUser, {
    method: "POST",
    headers,
    body: JSON.stringify(obj),
  });
  let json = await res.json();
  console.log("student created = ", json);
  return json ? true : false;
};

export const startQuiz = async (obj, token) => {
  let result = "";
  // token = "bb8c3b567bce1910e2b64c12352b6c2432c2ccc4";
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `token ${token}`,
    Accept: "*/*",
  };

  var formdata = new FormData();
  formdata.append("name", obj.name);
  formdata.append("desc", obj.desc);
  formdata.append("text", obj.text);
  formdata.append("perquestion", "30");
  let res = await fetch(baseurl + url.start_quiz, {
    method: "POST",
    headers,
    body: formdata,
    redirect: "follow",
  });
  let json = await res.json();
  console.log("quiz start response = ", json);
  return json ? json : false;
};

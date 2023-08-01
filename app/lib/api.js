export const register = async (payload) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const { first_name, last_name, email, password } = payload;

  var raw = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/user/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const login = async (payload) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const { email, password } = payload;

  var raw = JSON.stringify({
    email,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/user/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const getProfile = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/user/profile`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const getAllWorkspace = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/workspace`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const getOneWorkspace = async (id, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/workspace/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const updateProfile = async (payload, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  const { first_name, last_name, profile_image } = payload;

  var raw = JSON.stringify({
    first_name,
    last_name,
    profile_image,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/user/profile`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const updateProfileImage = async (file, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var formdata = new FormData();
  formdata.append("file", file, file.name);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/user/profile/image`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const updateProfileWorkspace = async (payload, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  const { id, name, profile_image } = payload;

  var raw = JSON.stringify({
    name,
    profile_image,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/workspace/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const updateProfileImageWorkspace = async (payload, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  const { id, file } = payload;

  var formdata = new FormData();
  formdata.append("file", file, file.name);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(
    `${window.ENV.API_URL}/workspace/image/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const addWorkspace = async (payload, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  const { name } = payload;

  var raw = JSON.stringify({
    name,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(`${window.ENV.API_URL}/workspace`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const getAllAttribute = async (type, workspace_id, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    `${window.ENV.API_URL}/task/attribute/${type}/${workspace_id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const updateAttribute = async (payload, type, workspace_id, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  var raw = JSON.stringify(payload);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(
    `${window.ENV.API_URL}/task/attribute/${type}/${workspace_id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

export const addAttribute = async (payload, type, workspace_id, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  var raw = JSON.stringify({
    ...payload,
    ...{
      workspace_id,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(
    `${window.ENV.API_URL}/task/attribute/${type}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

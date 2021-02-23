export const format_errors = (errors) => {
  let error_object = {}
  errors.forEach(
    ({field, errors}) => {
      error_object[field] = errors
    }
  )
  return error_object
}

export const login = ({accessToken}, redirectUrl) => {
  window.localStorage.setItem("access_token", accessToken);
  if (!redirectUrl)
    window.location = "/"
  else
    window.location = redirectUrl
};

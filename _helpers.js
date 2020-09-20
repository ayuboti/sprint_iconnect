export const format_errors = (errors) => {
  let error_object = {}
  errors.forEach(
    ({field, errors}) => {
      error_object[field] = errors
    }
  )
  return error_object
}


function isNumber (variable) {
  return typeof variable === 'number'
}

export function add (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left + right
  }
}
export function sub (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left - right
  }
}
export function mul (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left * right
  }
}
export function div (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left / right
  }
}

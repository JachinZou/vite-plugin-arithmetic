
function isNumber (variable) {
  return typeof variable === 'number'
}

export function add (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left + right
  } else if (Number.isInteger(left) || Number.isInteger(right)) {
    return left + right
  } else {
    // 需要替换为高精度计算
    return left + right
  }
}
export function sub (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left - right
  } else if (Number.isInteger(left) || Number.isInteger(right)) {
    return left - right
  } else {
    // 需要替换为高精度计算
    return left - right
  }
}
export function mul (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left * right
  } else if (Number.isInteger(left) || Number.isInteger(right)) {
    return left * right
  } else {
    // 需要替换为高精度计算
    return left * right
  }
}
export function div (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left / right
  } else if (Number.isInteger(left) || Number.isInteger(right)) {
    return left / right
  } else {
    // 需要替换为高精度计算
    return left / right
  }
}

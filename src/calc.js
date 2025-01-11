
function isNumber (variable) {
  return typeof variable === 'number'
}

function insertString (str, index, insertStr) {
  return str.slice(0, index) + insertStr + str.slice(index);
}

function formatResult (res, decimalLen) {
  if (decimalLen === 0) return res
  const isNagitive = res < 0
  let str = Math.abs(res).toString()
  decimalLen += str.split('.')[1]?.length || 0
  str = str.replace('.', '')
  if (decimalLen > str.length) {
    str = '0'.repeat(decimalLen - str.length) + str
  }
  if (decimalLen > 0) {
    return Number((isNagitive ? '-' : '') + insertString(str, -decimalLen, '.'))
  } else {
    return Number((isNagitive ? '-' : '') + str + '0'.repeat(-decimalLen))
  }
}

function parseCalculateNumber (left, right, decimalAlign = false) {
  const leftStr = left.toString()
  const rightStr = right.toString()
  const leftDecimalLength = leftStr.split('.')[1]?.length || 0
  const rightDecimalLength = rightStr.split('.')[1]?.length || 0
  const maxDecimalLength = Math.max(leftDecimalLength, rightDecimalLength)
  const totalDecimalLength = leftDecimalLength + rightDecimalLength
  const diffDecimalLength = leftDecimalLength - rightDecimalLength
  const leftInt = Number(leftStr.replace('.', '') + (decimalAlign ? '0'.repeat(maxDecimalLength - leftDecimalLength) : ''))
  const rightInt = Number(rightStr.replace('.', '') + (decimalAlign ? '0'.repeat(maxDecimalLength - rightDecimalLength) : ''))
  return {
    leftInt,
    rightInt,
    maxDecimalLength,
    totalDecimalLength,
    diffDecimalLength,
  }
}

export function add (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left + right
  } else if (Number.isInteger(left) || Number.isInteger(right)) {
    return left + right
  } else {
    const {
      leftInt,
      rightInt,
      maxDecimalLength,
    } = parseCalculateNumber(left, right, true)
    return formatResult(leftInt + rightInt, maxDecimalLength)
  }
}
export function sub (left, right) {
  return add(left, -right)
}

export function mul (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left * right
  } else if (Number.isInteger(left) && Number.isInteger(right)) {
    return left * right
  } else {
    const {
      leftInt,
      rightInt,
      totalDecimalLength,
    } = parseCalculateNumber(left, right)
    return formatResult(leftInt * rightInt, totalDecimalLength)
  }
}
export function div (left, right) {
  if (!isNumber(left) || !isNumber(right)) {
    return left / right
  } else if (Number.isInteger(left) && Number.isInteger(right)) {
    return left / right
  } else {
    const {
      leftInt,
      rightInt,
      diffDecimalLength,
    } = parseCalculateNumber(left, right)
    return formatResult(leftInt / rightInt, diffDecimalLength)
  }
}

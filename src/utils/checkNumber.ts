export function removeDuplicateNumbers(input: string): string {
  // Tạo một mảng để lưu trữ các số không lặp lại
  let nonRepeatingDigits: string[] = [];

  // Duyệt qua từng ký tự trong chuỗi đầu vào
  for (let i = 0; i < input.length; i++) {
    let currentChar = input[i];

    // Nếu ký tự hiện tại là một chữ số và không nằm trong mảng nonRepeatingDigits
    if (
      !isNaN(parseInt(currentChar)) &&
      nonRepeatingDigits.indexOf(currentChar) === -1
    ) {
      // Kiểm tra xem ký tự này có lặp lại trong chuỗi không
      if (input.indexOf(currentChar, i + 1) !== -1) {
        // Nếu có, thêm vào mảng nonRepeatingDigits
        nonRepeatingDigits.push(currentChar);
      }
    }
  }

  // Tạo một chuỗi mới từ mảng nonRepeatingDigits
  let result = nonRepeatingDigits.join("");

  // Loại bỏ số 0 nếu nó ở đầu tiên của chuỗi kết quả
  if (result[0] === "0") {
    result = result.slice(1);
  }

  return result;
}

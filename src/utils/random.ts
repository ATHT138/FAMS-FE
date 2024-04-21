// File: utils/randomUtils.ts

export function randomDate(): Date {
  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Sinh ngẫu nhiên một số nguyên trong khoảng từ 0 đến 365 (hoặc bất kỳ khoảng thời gian nào khác)
  const randomDays = Math.floor(Math.random() * 365);

  // Tính toán ngày ngẫu nhiên bằng cách trừ randomDays từ ngày hiện tại
  const randomDate = new Date(
    currentDate.getTime() - randomDays * 24 * 60 * 60 * 1000
  );

  return randomDate;
}

export function randomID(length: number = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
export function randomNumber(min: number, max: number) {
  // Ensure that the provided values are numbers
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Both parameters must be numbers");
  }

  // Ensure that min is less than or equal to max
  if (min > max) {
    throw new Error("Min must be less than or equal to max");
  }

  // Calculate the random number within the specified range
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

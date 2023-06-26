

function returnMess(username, text) {
  // Lấy ngày và giờ hiện tại
  const today = new Date();

  // Lấy giờ hiện tại (24 giờ)
  let hours = today.getHours();

  // Xác định AM hoặc PM
  const amPm = hours >= 12 ? "pm" : "am";

  // Chuyển đổi sang định dạng 12 giờ
  if (hours > 12) {
    hours -= 12;
  }
  return {
    username: username,
    text: text,
    time: `${today.getHours()}:${today.getMinutes()} ${amPm}`,
  };
}
export default returnMess;

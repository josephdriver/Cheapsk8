export default function errorMessage(error) {
  if (error) {
    let message = "Unable to Log In at this time";
    const errorCode = error.replace(" ", "$").split("$", 2)[0];
    if (errorCode === "[auth/invalid-credential]") {
      message = "Invalid email or password";
    }
    return message;
  }
  return "";
}

export default function errorMessage(error) {
  if (error) {
    const message = "Unable to Log In at this time";
    if (error.code) {
      if (error.code === "auth/requires-recent-login") {
        return "This action requires re-authentication, please log in again.";
      }
    }
    const errorCode = error.replace(" ", "$").split("$", 2)[0];
    if (errorCode === "[auth/invalid-credential]") {
      return "Invalid email or password";
    }
    return message;
  }
  return "";
}

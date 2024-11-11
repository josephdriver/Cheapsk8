export const emailValidator = (email) => {
	const re = /\S+@\S+\.\S+/;
	if (!email) return "Email can't be empty.";
	if (!re.test(email)) return "Ooops! We need a valid email address.";
	return "";
};

export const passwordValidator = (password) => {
	if (!password) return "Password can't be empty.";
	if (!password.match(/(?=.*[0-9a-zA-Z]).{6,}/g))
		return "Password must be at least 6 characters long.";
	return "";
};

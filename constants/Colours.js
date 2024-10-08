const shadeColor = (color, percent) => {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt((R * (100 + percent)) / 100, 10);
	G = parseInt((G * (100 + percent)) / 100, 10);
	B = parseInt((B * (100 + percent)) / 100, 10);

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	R = Math.round(R);
	G = Math.round(G);
	B = Math.round(B);

	const RR =
		R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
	const GG =
		G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
	const BB =
		B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

	return `#${RR}${GG}${BB}`;
};

export const PRIMARY = "#F95738";
export const PRIMARY_DISABLED = shadeColor(PRIMARY, -40);
export const SECONDARY = "#003566";
export const BACKGROUND_PRIMARY = "#000e1e";
export const DANGER = "#1E441E";

export const DISCOUNT = PRIMARY;
export const FAVOURITE = "#F5E960";

export const TEXT_INACTIVE = "#babbbc";
export const TEXT_DARK = "#3f3f3f";
export const INACTIVE = "#8c6d67";

export const WHITE = "white";

export const METACRITIC_SCORES = {
	GOOD: "#66CC33",
	AVERAGE: "#FFCC33",
	BAD: "#FF3333",
};

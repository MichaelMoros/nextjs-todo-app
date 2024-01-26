function capitalizeFirstLetter(val: string) {
	if (typeof val !== 'string') return val;
	if (val.length === 0) return val;
	return val.charAt(0).toUpperCase() + val.slice(1);
}

function formatDate(inputDateTimeString: string) {
	try {
		const dateTime = new Date(inputDateTimeString);
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const dateFormatter = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: userTimeZone,
		});

		return dateFormatter?.format(dateTime);
	} catch (error) {
		return 'Invalid Date';
	}
}

function formatDateTime(inputDateTimeString: string) {
	try {
		const dateTime = new Date(inputDateTimeString);
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			timeZone: userTimeZone
		});
		return dateTimeFormatter?.format(dateTime);
	} catch {
		return 'Invalid Time'
	}
}

const getLogUpdateStatus = (s: string) => {
	const twoDays = 86400000 * 2;
	const nextTouch = new Date(s).getTime()
	const currentTime = new Date().getTime()
	const nextTouchPlusTwoDays = new Date(s).getTime() + twoDays

	if (currentTime < nextTouch) return "Not Ready For Update"
	if (currentTime > nextTouch && currentTime > nextTouchPlusTwoDays) return "Past Due"
	if (currentTime > nextTouch && currentTime < nextTouchPlusTwoDays) return "Ready for Update"
};


export {
	capitalizeFirstLetter,
	formatDate,
	formatDateTime,
	getLogUpdateStatus
}
import Axios from "axios";
export const upload = async (file, uri) => {
	try {
		return await Axios.put(uri, file, {
			headers: {
				"Content-Type": file.type,
			},
		});
	} catch (error) {
		throw error;
	}
};

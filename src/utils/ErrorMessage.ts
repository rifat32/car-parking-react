import { toast } from "react-toastify";
export const ErrMessage = (status: number, message: string) => {
	if (status === 409 || status === 404 || status === 400) {
		toast.error(message);
	}
};

import { toast } from 'react-toastify';
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS, TOAST_WARN } from '../../config';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainer = (type, content ) => {
	switch (type)
	{
		case TOAST_SUCCESS:
			toast.success(content, {
				position : toast.POSITION.TOP_RIGHT
			});
			break;
		case TOAST_ERROR:
			toast.error(content, {
				position : toast.POSITION.TOP_RIGHT
			});
			break;
		case  TOAST_INFO:
			toast.info(content, {
				position : toast.POSITION.TOP_RIGHT
			});
			break;
		case TOAST_WARN:
			toast.warn(content, {
				position : toast.POSITION.TOP_RIGHT
			});
			break;
	}

}

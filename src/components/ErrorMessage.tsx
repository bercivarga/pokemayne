import { FiAlertCircle } from 'react-icons/fi';

export default function ErrorMessage() {
	return (
		<div className="flex flex-row items-center mt-8 p-12 border-red-600 border-8 rounded-lg">
			<FiAlertCircle className="text-red-600 w-8 h-8" />
			<h2 className="ml-4 text-2xl text-red-600">We encountered a 404 error. Please try again.</h2>
		</div>
	);
}

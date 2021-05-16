import React from 'react';

export default function LoadingSpinner(): JSX.Element {
	const circleSharedClass = 'h-2.5 w-2.5 bg-current rounded-full';

	return (
		<div className="flex">
			<div className={`${circleSharedClass} mr-1 animate-bounce`} />
			<div className={`${circleSharedClass} mr-1 animate-bounce200`} />
			<div className={`${circleSharedClass} animate-bounce400`} />
		</div>
	);
}

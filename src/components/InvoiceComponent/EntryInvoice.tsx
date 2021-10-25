import React, { useState } from "react";

type Props = {
	componentToPrint: any;
};

export const TodoList = (props: Props) => {
	const { componentToPrint } = props;

	return <div ref={(el) => (componentToPrint.current = el)}>hello</div>;
};

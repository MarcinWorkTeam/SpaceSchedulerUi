import { useEffect } from "react";


export default function StartPage(setItem) {

	 useEffect(() => {
		setItem.setItem('')
	 })

	return (
        <h1>Witaj na stronie!</h1>
	);
}

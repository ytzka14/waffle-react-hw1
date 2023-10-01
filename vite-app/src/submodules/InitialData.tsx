const InitialData = () => {
	const neoguri = (
		<>
			<div className="imageBox">
				<img src="https://image.nongshim.com/non/pro/1598000561204.jpg" alt="얼큰한 너구리" className="snackImage"/>
			</div>
			<br/>
			<span className="snackNameText">얼큰한 너구리</span>
			<span className="greyText">/</span>
			<span className="rateSpan">★5</span>
			<br/>
			<p>오동통통한 면과 동봉된 다시마가 맛있습니다</p>
		</>
	);
	const mccol = (
		<>
			<div className="imageBox">
				<img src="https://img.danawa.com/prod_img/500000/350/174/img/3174350_1.jpg?shrink=330:*&_v=20220421104604" alt="맥콜" className="snackImage"/>
			</div>
			<br/>
			<span className="snackNameText">맥콜</span>
			<span className="greyText">/</span>
			<span className="rateSpan">★4</span>
			<br/>
			<p>보리차와 콜라가 반반 섞인 듯한 맛이 독특합니다.</p>
		</>
	);	
	const data: [number, JSX.Element][] = [[101, neoguri], [103, mccol]];
	return data;
};

export default InitialData;




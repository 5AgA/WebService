import React from 'react';
import './top5.css';

export default function Top5Listings({ name, images, onClickImage }) {
	console.log('==> Top5Listings render');
	return (
		<div id="top5-listings">
			<h2>{name}'s Top5 CD List</h2>
			<Top5 images={images}  /*onClickImage={onClickImage}/> */ />
		</div>
	);
}

function Top5({ images, onClickImage }) {
	console.log('==> Top5 render');

	const imgTags = images.map(
		(image, i) => (
			<span key={image.id}>
				<span className="rank">{i + 1}</span>
				<img src={image.src} className="cover" alt=""
					/* onClick={ ... } */		
				/>
			</span>
		)
	);
	
	return (
		<div id="top5">
			{imgTags}
		</div>
	);
}


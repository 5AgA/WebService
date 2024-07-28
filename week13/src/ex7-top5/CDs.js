import './top5.css';

export default function CDs({ images, onClickImage }) {
	console.log('==> CDs render');

	var imgTags = images.map(image =>
		<img key={image.id} src={image.src} className="cover" alt=""
			onClick={e => {
				console.log(e);
				//e.preventDefault();
				onClickImage(image);
			}}
		/>
	);

	return (
		<div id="cds">
			{imgTags}
		</div>
	);
}

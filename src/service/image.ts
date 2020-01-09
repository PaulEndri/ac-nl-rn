const getImageUrl = (root: string, name: string) =>
	`https://ac-companion.s3.us-east-2.amazonaws.com/images/${root}/${name}.png`;

const ImageService = {
	getImageUrl
};

export default ImageService;

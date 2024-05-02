import React, { useState, useEffect } from 'react';
import './App.css';
import { deleteImage, editImage, fetchImages, ImagesData, uploadImage } from './service/api';

function App() {
	const [images, setImages] = useState<ImagesData[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [imagesPerPage, setImagesPerPage] = useState(6);
	const [showPopup, setShowPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	// upload form variables
	const [titleUpload, setTitleUpload] = useState('');
	const [link, setLink] = useState('');
	const [descriptionUpload, setDescriptionUpload] = useState('');
	
	// edit form variables
	const [id, setId] = useState(0);
	const [titleEdit, setTitleEdit] = useState('');
	const [descriptionEdit, setDescriptionEdit] = useState('');

	const handleDeleteImage = async (id: number) => {
		const wasDeleted = await deleteImage(id);

		if (wasDeleted) {
			const updatedImages = images.filter((image) => image.id !== id);
			setImages(updatedImages);
			setShowPopup(true);
		} else {
			setShowErrorPopup(true);
		}
	};

	const handleUpload = async (link: string, title: string, description: string) => {
		const wasUploaded = await uploadImage(link, title, description);

		if (wasUploaded) {
			const updatedImages = images.filter((image) => image.id !== id);
			setImages(updatedImages);
			setShowPopup(true);
		} else {
			setShowErrorPopup(true);
		}
	};

	const handleEdit= async (id: number, title: string, description: string) => {
		const wasEdited = await editImage(id, title, description);

		if (wasEdited) {
			const updatedImages = images.filter((image) => image.id !== id);
			setImages(updatedImages);
			setShowPopup(true);
		} else {
			setShowErrorPopup(true);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchImages();
			setImages(data);
		};

		fetchData();
	}, []);

	const indexOfLastImage = currentPage * imagesPerPage;
	const indexOfFirstImage = indexOfLastImage - imagesPerPage;
	const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="header">
				<h1>Photo Gallery</h1>
			</div>

			<div className="upload">
				<form onSubmit={handleSubmit}>
					<h2> UPLOAD IMAGE </h2>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						value={titleUpload}
						onChange={(event) => setTitleUpload(event.target.value)}
					/>
					<label htmlFor="link">Link:</label>
					<input
						type="text"
						id="link"
						value={link}
						onChange={(event) => setLink(event.target.value)}
					/>
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						value={descriptionUpload}
						onChange={(event) => setDescriptionUpload(event.target.value)}
					/>
					<button type="submit" onClick={() => handleUpload(link, titleUpload, descriptionUpload)}>Upload</button>
				</form>
			</div>

			<div className="edit">
				<form onSubmit={handleSubmit}>
					<h2> EDIT IMAGE </h2>
					<label htmlFor="id">id:</label>
					<input
						type="number"
						id="id"
						value={id}
						onChange={(event) => setId(parseInt(event.target.value, 10))}
					/>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						value={titleEdit}
						onChange={(event) => setTitleEdit(event.target.value)}
					/>
					<label htmlFor="description">Description:</label>
					<textarea
						id="description"
						value={descriptionEdit}
						onChange={(event) => setDescriptionEdit(event.target.value)}
					/>
					<button type="submit" onClick={() => handleEdit(id, titleEdit, descriptionEdit)}>Edit</button>
				</form>
			</div>

			<div className="gallery">
				{currentImages.map((image, index) => (
					<div className="image" key={image.id}>
						<img src={image.link} alt={`image ${index}`} />
						<p>id: {image.id}</p>
						<p>title: {image.title}</p>
						<p>description: {image.description}</p>
						<button className="delete-button" onClick={() => handleDeleteImage(image.id)}>Delete</button>
					</div>
				))}
			</div>

			{showPopup && (
				<div className="popup">
					<p>Request was successful</p>
					<button onClick={() => setShowPopup(false)}>Close</button>
				</div>
			)}

			{showErrorPopup && (
				<div className="popup">
					<p>Request failed</p>
					<button onClick={() => setShowErrorPopup(false)}>Close</button>
				</div>
			)}

			<div className="pagination">
				{Array(Math.ceil(images.length / imagesPerPage))
					.fill(0)
					.map((_, i) => (
						<button key={i} onClick={() => paginate(i + 1)}>
							{i + 1}
						</button>
					))}
			</div>

			<div className="footer"></div>
		</>
	);
}

export default App;
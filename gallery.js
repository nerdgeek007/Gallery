function Gallery(myGallery) {
	if (!myGallery) {
		throw new Error('no gallery found');
	}
	// select the elements
	const images = Array.from(myGallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal');
	const prevButton = modal.querySelector('.prev');
	const nextButton = modal.querySelector('.next');
	let currentImage;

	// open the modal
	function openModal() {
		// if modal is already open
		if (modal.matches('.open')) {
			console.log('modal already open');
			return;
		}
		modal.classList.add('open');
		//add event listner after open the modal
		window.addEventListener('keyup', handleKeyUp);
		nextButton.addEventListener('click', showNextItem);
		prevButton.addEventListener('click', showPrevItem);
	}

	// close the modal
	function closeModal() {
		modal.classList.remove('open');
		window.removeEventListener('keyup', handleKeyUp);
		nextButton.removeEventListener('click', showNextItem);
		prevButton.removeEventListener('click', showPrevItem);
	}

	// function for handle outside click
	function handleOutsideClick(e) {
		if (e.target === e.currentTarget) closeModal();
	}

	// for next item
	function showNextItem() {
		showImage(currentImage.nextElementSibling || myGallery.firstElementChild);
	}

	// for previous item
	function showPrevItem() {
		showImage(
			currentImage.previousElementSibling || myGallery.lastElementChild
		);
	}

	//function for handle key
	function handleKeyUp(e) {
		if (e.key === 'Escape') return closeModal();
		if (e.key === 'ArrowRight') return showNextItem();
		if (e.key === 'ArrowLeft') return showPrevItem();
	}
	// show the image
	function showImage(img) {
		if (!img) {
			console.info('no image found');
			return;
		}

		//update the image info
		modal.querySelector('img').src = img.src;
		modal.querySelector('h2').textContent = img.title;
		modal.querySelector('p').textContent = img.dataset.description;
		currentImage = img;
		openModal();
	}

	//all event listners

	//event listner for listen click on images
	images.forEach(image =>
		image.addEventListener('click', e => showImage(e.currentTarget))
	);

	//event listner for listen enter key on images
	images.forEach(image =>
		image.addEventListener('keyup', e => {
			if (e.key === 'Enter') showImage(e.currentTarget);
		})
	);

	//event listner for handle outside click
	modal.addEventListener('click', handleOutsideClick);
}

// use Gallery() function for every gallery individually
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

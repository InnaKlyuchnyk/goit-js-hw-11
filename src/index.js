import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/news-api-service';
import { refs } from './js/get-refs';
import { createGaleryMarkup } from './js/create-gallery-markup';

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreButtonClick);
refs.loadMoreBtn.classList.add('is-hidden');

const newsApiService = new NewsApiService();

function onSubmitButtonClick(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;

  if (newsApiService.query.trim() === '') {
    cleanGalleryContainer();
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info("Sorry! The window can't be empty.");
    return;
  }

  newsApiService.resetPage();
  newsApiService.getSearchingImages().then(data => {
    const images = data.hits;
    cleanGalleryContainer();
    noMatchesFound(images);
    renderMarkup(images);
    largeImgShow();
    // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}

function onLoadMoreButtonClick() {
  newsApiService.getSearchingImages().then(data => {
    const images = data.hits;
    renderMarkup(images);
    largeImgShow();
  });
}

function noMatchesFound(images) {
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
}

function renderMarkup(images) {
  const markup = images.map(image => createGaleryMarkup(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function cleanGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function largeImgShow() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('show.simpleLightbox');
  lightbox.refresh();
}

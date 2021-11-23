import Notiflix from 'notiflix';
import NewsApiService from './js/news-api-service';
import { refs } from './js/get-refs';
import { createGaleryMarkup } from './js/create-gallery-markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreButtonClick);
refs.loadMoreBtn.classList.add('is-hidden');

const newsApiService = new NewsApiService();
const pageSize = 40;

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
  fetchImages();
}

function fetchImages() {
  newsApiService.getSearchingImages().then(data => {
    const images = data.hits;
    refs.loadMoreBtn.classList.remove('is-hidden');

    cleanGalleryContainer();
    renderMarkup(images);
    lightbox.refresh();
    foundMatchas(images, data);
    if (data.totalHits <= pageSize) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    noMatchesFound(images);
  });
}

function onLoadMoreButtonClick() {
  newsApiService.getSearchingImages().then(data => {
    const totalPages = data.totalHits / pageSize;
    if (newsApiService.currentPage > totalPages) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    const images = data.hits;
    renderMarkup(images);
    lightbox.refresh();
  });
}

function noMatchesFound(images) {
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

function foundMatchas(images, data) {
  if (images.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
}

function renderMarkup(images) {
  const markup = images.map(image => createGaleryMarkup(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function cleanGalleryContainer() {
  refs.gallery.innerHTML = '';
}

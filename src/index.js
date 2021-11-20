import NewsApiService from './js/news-api-service';
import { refs } from './js/get-refs';

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreButtonClick);

const newsApiService = new NewsApiService();

function onSubmitButtonClick(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.getSearchingImages().then(images => console.log(images));
}

function onLoadMoreButtonClick() {
  newsApiService.getSearchingImages().then(images => console.log(images));
}

import NewsApiService from './js/news-api-service';
import { refs } from './js/get-refs';

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreButtonClick);

const newsApiService = new NewsApiService();

function onSubmitButtonClick(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  newsApiService.getSearchingImages().then(response => {
    console.log(response.data);
  });
  //   refs.form.reset();
}

function onLoadMoreButtonClick() {
  newsApiService.getSearchingImages();
}

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function largeImgShow() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('show.simpleLightbox');
  lightbox.refresh();
}

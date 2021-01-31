import $ from 'jquery';
import './simplePagination';

export function addPaginator({ elementRef, totalResults, perPage, loadPage }) {
  $(elementRef).pagination('destroy');

  $(elementRef).pagination({
    items: totalResults,
    itemsOnPage: perPage,
    cssStyle: 'light-theme',
    onPageClick: function (page, event) {
      loadPage(page);
    },
  });
}

export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize }) {
  /*
    Rewrite the logic here to map out the pagination to be displayed

   1. We first calculate the number of pages base on total blogs and size of the pages.
   2. Base on the current page we formulate the pagination array that will be return and display.
    
  */
  //1. Calculating total pages and account for decimal places and rounding.
  let totalPages = totalCount / pageSize;
  if (totalPages % 1 !== 0) {
    totalPages = Math.floor(totalPages + 1);
  }
  //2. Making sure the current page always has a two siblings and where the DOTS will appear.

  //No ellipses when there is only one page available.
  if (totalPages === 1) {
    return [currentPage];
  }
  if (currentPage === 1) {
    return [currentPage, currentPage + 1, currentPage + 2, DOTS, totalPages];
  } else if (currentPage > 1 && currentPage < 3) {
    return [1, currentPage, currentPage + 1, DOTS, totalPages];
  } else if (currentPage >= 3 && totalPages - 1 > currentPage) {
    return [
      1,
      DOTS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      DOTS,
      totalPages,
    ];
  } else if (currentPage === totalPages - 1) {
    return [1, DOTS, currentPage - 1, currentPage, currentPage + 1];
  } else if (currentPage === totalPages) {
    return [1, DOTS, currentPage - 2, currentPage - 1, currentPage];
  }

  return [1 + DOTS, currentPage - 1, currentPage, totalPages];
}

export default usePagination;

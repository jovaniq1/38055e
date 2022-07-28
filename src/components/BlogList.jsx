import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState, useEffect } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // ternary operation to calculate the next blogs to display base on page size and current page.
  const currentPaginationData =
    CurrentPage === 1
      ? blogs.posts.slice(0, pageSize)
      : blogs.posts.slice(
          pageSize * CurrentPage - pageSize,
          pageSize * CurrentPage
        );

  // This helps incase the user selects a bigger page size, when the current page is bigger then the total pages.
  let totalPages = blogs?.posts?.length / pageSize;
  if (totalPages % 1 !== 0) {
    totalPages = Math.floor(totalPages + 1);
  }

  // This helps incase user selects bigger page size when current page is bigger then the total new total pages.
  if (CurrentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  // changing page size
  const updateRowsPerPage = (size) => {
    setPageSize(size);
  };
  // changing page
  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        currentPage={CurrentPage}
        totalCount={blogs.posts.length}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;

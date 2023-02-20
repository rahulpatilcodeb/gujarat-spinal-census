import _ from "lodash";
const Pagination = ({ items, pageSize, currentPage, onPageChange }: any) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      <nav>
        <ul className="pagination">
          {pages.map((page: any) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => onPageChange(page)}
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
 
      </nav>
    </>
  );
};

export default Pagination;
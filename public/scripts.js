const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

// MEMBER | INSTRUCTOR DELETE

const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit", (e) => {
  const confirmation = confirm("Deseja realmente deletar?");
  if (!confirmation) {
    e.preventDefault();
  }
});

// PAGINAÇÃO

let totalPages = 20,
  selectedPage = 12;
pages = [];
oldPage;

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
  const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
  const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

  if (firstAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
    if (oldPage && currentPage - oldPage > 2) {
      pages.push("...");
    }

    if (oldPage && currentPage - oldPage == 2) {
      pages.push(oldPage + 1);
    }

    pages.push(currentPage);

    oldPage = currentPage;
  }
}

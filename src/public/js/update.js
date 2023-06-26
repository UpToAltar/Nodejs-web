
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const overlay = $(".overlay");
const addBtn = $(".add-user-btn");

const formAdd = $(".form-add");
const clodeBtnAdd = $(".form-icon-x");

// Click hiện form add
addBtn.onclick = () => {
  overlay.classList.toggle("display-none");
  formAdd.classList.toggle("display-none");
};

clodeBtnAdd.onclick = () => {
  overlay.classList.toggle("display-none");
  formAdd.classList.toggle("display-none");
};
const deleteForm = document.getElementsByClassName("form-edit-icon");
let btnEdit = document.getElementsByClassName("btn-edit");

// Xử lí sự kiện click vào edit ẩn hiện form
for (let i = 0; i < btnEdit.length; i++) {
  btnEdit[i].onclick = function () {
    let formEdit = document.querySelector(
      `.edit-form-${this.getAttribute("data")}`
    );
    overlay.classList.toggle("display-none");
    formEdit.classList.toggle("display-none");
  };
}

// Sự kiện tắt form khi click delete
for (let i = 0; i < deleteForm.length; i++) {
  deleteForm[i].onclick = function () {
    let formEdit = document.querySelector(
      `.edit-form-${this.getAttribute("data")}`
    );
    overlay.classList.toggle("display-none");
    formEdit.classList.toggle("display-none");
  };
}

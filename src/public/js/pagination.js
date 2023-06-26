const next = document.querySelector('.pagination-next')
const pre = document.querySelector(".pagination-pre");
const pag = document.querySelector(".pagination-layout")
function nextPage(that){
    const link = that.parentElement.querySelector('.active').getAttribute('value')
    window.location.href = link
}
function prePage(that){
    const link = that.parentElement.querySelector('.active').getAttribute('value1')
    window.location.href = link
}
var number = 0;
function genNumber() {
    number = Math.floor(Math.random() * 100);
}
function getNumber() {
    return number;
}
export { genNumber, getNumber };
function onOff() {
  document.querySelector("#modal").classList.toggle("hide");

  document.querySelector("body").classList.toggle("hideScroll");

  document.querySelector("#modal").classList.toggle("AddScroll");
}

function checkFields(event) {
  const fieldsToCheck = [
    "title",
    "category",
    "img_url",
    "description",
    "idea_url"
  ];

  fieldsToCheck.forEach(field => {
    const fieldSelected = event.target[field];
    const span = fieldSelected.parentElement.lastElementChild;

    const isString = typeof fieldSelected.value === "string";

    const isEmpty = fieldSelected.value.trim() === "";

    if (isString && !isEmpty) {
      fieldSelected.classList.remove("error");
      span.classList.remove("error");
    } else {
      event.preventDefault();

      fieldSelected.classList.add("error");

      span.classList.add("error");
    }
  });
}

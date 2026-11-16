export function NavPagination(text, className) {
  const span = document.createElement("span");
  span.textContent = text;
  span.className = className;
  return span;
}

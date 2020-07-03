export const parseFormToObject = (event) => {
  const form = event.currentTarget;
  const data = new FormData(form);
  let request = {};
  for (let name of data.keys()) {
    const input = form.elements[name];
    request[name] = input.value;
  }
  return request;
};

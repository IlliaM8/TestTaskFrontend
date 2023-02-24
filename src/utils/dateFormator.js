export const dateFormator = (dt) => {
  const date = new Date(dt);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const year = date.getFullYear();
  let h = date.getHours();
  const min = date.getMinutes();

  const tr = transform([d, m, h, min]);
  return `${tr[0]}/${tr[1]}/${year} ${tr[2]}:${tr[3]}`;
};

const transform = (values) => {
  return values.map((val) => {
    if (val > 0 && val < 10) {
      return "0" + val;
    }
    return val;
  });
};

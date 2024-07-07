module.exports = (temp, product, templateFields) => {
  let output = temp;
  for (const key in templateFields) {
    const regExpStr = "{%" + key + "%}";
    const val = templateFields[key];
    output = output.replace(RegExp(regExpStr, "g"), product[val]);
  }
  if (!product.organic) {
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  }
  return output;
};

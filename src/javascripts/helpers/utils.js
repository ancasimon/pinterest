const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
};

const getRadioVal = () => {
  let val;
  Array.from($('.board-radio-btn')).forEach((item) => {
    if (item.checked) {
      val = item.id;
    }
  });
  return val;
};

export default { printToDom, getRadioVal };

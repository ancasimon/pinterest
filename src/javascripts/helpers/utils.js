const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
};

export default { printToDom };

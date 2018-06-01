$(document).ready(() => {

  const alert: any = $(".alert");
  if (alert.length > 0) {
    window.setTimeout(() => {
      alert.alert("close");
    }, 3000);
  }

  const navListItems = $("div.setup-panel div a"),
    allWells = $(".setup-content"),
    allNextBtn = $(".nextBtn");

  allWells.hide();

  navListItems.click((e) => {
    e.preventDefault();
    const $target = $($(this).attr("href")),
      $item = $(this);

    if (!$item.hasClass("disabled")) {
      navListItems.removeClass("btn-success").addClass("btn-default");
      $item.addClass("btn-success");
      allWells.hide();
      $target.show();
      $target.find("input:eq(0)").focus();
    }
  });

  allNextBtn.click(function () {
    const curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      nextStepWizard = $("div.setup-panel div a[href=\"#" + curStepBtn + "\"]").parent().next().children("a"),
      curInputs: any = curStep.find("input[type=\"text\"],input[type=\"url\"]");
    let isValid = true;

    $(".form-group").removeClass("has-error");
    for (let i = 0; i < curInputs.length; i++) {
      if (!curInputs[i].validity.valid) {
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
    }

    if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");
  });

  $("div.setup-panel div a.btn-success").trigger("click");
});

const getPackages = () => {

};

const registerPackage = () => {

};

const getPackageDetail = () => {

};

const generateLicenseCode = () => {

};
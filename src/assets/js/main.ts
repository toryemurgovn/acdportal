$(document).ready(() => {

  // const alert: any = $(".alert");
  // if (alert.length > 0) {
  //   window.setTimeout(() => {
  //     alert.alert("close");
  //   }, 5000);
  // }

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

  $(".jRequestPackage").on("click", function (event) {
    event.preventDefault();
    const data = {
      id: $(this).data("id"),
      action: $(this).data("action")
    };

    $.ajax({
      url: "/api/admin/package-status",
      method: "POST",
      dataType: "json",
      data: { package: data }
    }).done((data) => {
      console.log(data);
      location.reload();
    });
  });
});

const getPackages = () => {
  $.ajax({
    url: "/api/packages"
  }).done((data) => {
    console.log(data);
  });
};

const registerPackage = () => {
  const quantity: any = $("#inputQuantity").val();
  const course_id = $("#inputCourse").val();
  if (quantity) {
    $.ajax({
      url: "/api/packages",
      method: "POST",
      dataType: "json",
      data: {
        quantity: parseInt(quantity),
        course_id: course_id
      }
    }).done((data) => {
      // console.log(data);
      // const modalPopup: any = $("#registerPackageModel");
      // modalPopup.modal("hide");
      location.reload();
    });
  } else {

  }
};

const getPackageDetail = (id) => {
  $.ajax({
    url: `/api/packages/${id}`
  }).done((data) => {
    console.log(data);
  });
};

const generateLicenseCode = () => {
  // url: `/api/packages/${id}`,
  const packageId = $("#packageId").val();
  const email = $("#inputEmail").val();
  if (!packageId) {
    return;
  }
  $.ajax({
    url: `/api/packages/${packageId}/generate-code`,
    method: "POST",
    dataType: "json",
    data: { email: email }
  }).done((data) => {
    alert(data.message);
    location.reload();
  }).fail((data) => {
    location.reload();
  });
};

const importListEmails = () => {
  const packageId = $("#packageId").val();
  if (!packageId) {
    return;
  }
  const data = new FormData();
  const inputFile: any = document.getElementById("inputFile");
  if (inputFile.files[0]) {
    data.append("file", inputFile.files[0]);
  } else {
    return;
  }
  $.ajax({
    url: `/api/packages/${packageId}/import-list`,
    method: "POST",
    dataType: "json",
    processData: false,
    contentType: false,
    data: data
  }).done((data) => {
    location.reload();
  }).fail((data) => {
    // location.reload();
  });
};

(function () {
  const inputFile: any = document.getElementById("inputFile");
  if (!inputFile) {
    return;
  }
  inputFile.onchange = function () {
    if (this.files[0]) {
      console.log("Selected file: " + this.files[0].name);
      this.placeholder = this.files[0].name;
      $("label[for='inputFile']").text(this.files[0].name);
    } else {
      this.placeholder = "Choose file";
      $("label[for='inputFile']").text("Choose file");
    }
  };
})();

const inputLicenseCode = () => {
  const licenseCode = $("#inputCode").val();
  if (!licenseCode) {
    return;
  }
  $.ajax({
    url: "/apply-code",
    method: "POST",
    dataType: "json",
    data: { code: licenseCode }
  }).done((data) => {
    if (data.code) {
      if (data.code == 100) {
        // error
        alert(data.msg);
      }
    }
    location.reload();
  }).fail((data) => {
    // location.reload();
  });
};

$(document).ready(function () {
  const jAssignment1 = $("#jsubmit1");
  const jAssignment2 = $("#jsubmit2");
  const jAssignment3 = $("#jsubmit3");
  const jAssignment4 = $("#jsubmit4");
  const jAssignment5 = $("#jsubmit5");
  const jAssignment6 = $("#jsubmit6");
  const jAssignment7 = $("#jsubmit7");
  const jAssignment8 = $("#jsubmit8");
  const jAssignment9 = $("#jsubmit9");

  jAssignment1.on("click", (event) => {
    event.preventDefault();
    const data = {
      name: $("input[name=trs1_name]").val(),
      amount: $("input[name=trs1_amount]").val()
    };

    $.ajax({
      url: "transaction/1",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jtrs1name").text(jdata[1]);
        $(".jtrs1amount").text(jdata[3]);
        $(".jtrs1hash").text(jdata[5]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  jAssignment2.on("click", (event) => {
    event.preventDefault();
    const data = {
      passphrase: $("input[name=trs2Passphrase]").val()
    };

    $.ajax({
      url: "transaction/2",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jtrs2prikey").text(jdata[1]);
        $(".jtrs2pubkey").text(jdata[3]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  $(".jcopytrs2prikey").on("click", (event) => {
    $("#trs3prkey").val($(".jtrs2prikey").text());
  });

  jAssignment3.on("click", (event) => {
    event.preventDefault();
    const data = {
      name: $("input[name=trs3name]").val(),
      amount: $("input[name=trs3amount]").val(),
      prikey: $("input[name=trs3prkey]").val()
    };

    $.ajax({
      url: "transaction/3",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jtrs3name").text(jdata[1]);
        $(".jtrs3amount").text(jdata[3]);
        $(".jtrs3hash").text(jdata[5]);
        $(".jtrs3signature").text(jdata[9]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  $(".jcopytrs3sign").on("click", (event) => {
    $("#trs4sign").val($(".jtrs3signature").text());
  });

  jAssignment4.on("click", (event) => {
    event.preventDefault();
    const data = {
      name: $("input[name=trs4name]").val(),
      amount: $("input[name=trs4amount]").val(),
      pubkey: $("input[name=trs4pubkey]").val(),
      sign: $("input[name=trs4sign]").val()
    };

    $.ajax({
      url: "transaction/4",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jtrs4name").text(jdata[1]);
        $(".jtrs4amount").text(jdata[3]);
        $(".jtrs4hash").text(jdata[5]);
        $(".jtrs4valid").text(jdata[11]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  jAssignment5.on("click", (event) => {
    event.preventDefault();
    $.ajax({
      url: "transaction/5",
      method: "POST",
      data: {},
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jblock1info").text(jdata[1]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  jAssignment6.on("click", (event) => {
    event.preventDefault();
    $.ajax({
      url: "transaction/6",
      method: "POST",
      data: {},
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jblock2info").text(jdata[1]);
        $(".jblock2hash").text(jdata[2]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  jAssignment7.on("click", (event) => {
    event.preventDefault();
    const data = {
      nonce: $("input[name=block3nonce]").val()
    };

    $.ajax({
      url: "transaction/7",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jblock3info").text(jdata[1]);
        $(".jblock3hash").text(jdata[2]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  jAssignment8.on("click", (event) => {
    event.preventDefault();
    const data = {
      name: $("input[name=block4name]").val(),
      amount: $("input[name=block4amount]").val(),
      difficult: $("input[name=block4difficult]").val(),
    };

    $.ajax({
      url: "transaction/8",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jblock4time").text(jdata[0]);
        $(".jblock4info").text(jdata[1]);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });


  jAssignment9.on("click", (event) => {
    event.preventDefault();
    const data = <any>{};
    $(".input-data").each(function () {
      data[$(this).attr("name")] = $(this).val();
    });

    $.ajax({
      url: "transaction/9",
      method: "POST",
      data: data,
      cache: false,
      success: function (resData) {
        const jdata = parseData(resData);
        $(".jbock5data").text(resData);
      },
      error: function (xhr, status, err) {
        showErrorMessage();
        console.error(status, err.toString());
      }
    });
    return false;
  });

  const parseData = (resData: any) => {
    return resData.replace(/\r\n/g, "\r").replace(/\n/g, "\r").replace(/['"]+/g, "").split(/\r/).map(s => s.trim()).filter(Boolean)
      ;
  };

  const showErrorMessage = () => {
    (<any>$("#jerrormodal")).modal({
      show: true,
      keyboard: false
    });
  };
});
let textDom = document.getElementById("j-text"),
  downloadDOM = document.getElementById("j-download"),
  copyDOM = document.getElementById("j-copy"),
  sizeDOM = document.getElementById("j-size"),
  sizeCurrentDOM = document.querySelector("#j-size-current"),
  tipDOM = document.querySelector("#j-tip");

sizeDOM.addEventListener("input", function () {
  textDom.style.fontSize = this.value + "px";
  sizeCurrentDOM.textContent = this.value + "px";
});

function j_change_font(item) {
  textDom.style.fontFamily = item.value;
  tipDOM.style.fontFamily = item.value;
}

function downloadImg() {
  window.htmlToImage.toPng(textDom).then((dataUrl) => {
    download(dataUrl, "logo.png");
  });
}

function copyImg() {
  console.log("copy<<<<");
  copyDOM.textContent = "复制中...";
  copyDOM.disabled = true;

  window.htmlToImage
    .toPng(textDom)
    .then((dataUrl) => {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
          const dataItem = new window.ClipboardItem({ "image/png": blob });

          navigator.clipboard
            .write([dataItem])
            .then(function () {
              console.log("Image copied to clipboard");
            })
            .catch(function (err) {
              console.error("Failed to copy image to clipboard:", err);
            });
        }, "image/png");

        copyDOM.textContent = "复制";
        copyDOM.disabled = false;
      };

      img.src = dataUrl;
    })
    .catch(function (error) {
      console.error("Error while converting to PNG", error);
    });
}

downloadDOM.addEventListener("click", downloadImg, false);
copyDOM.addEventListener("click", copyImg, false);

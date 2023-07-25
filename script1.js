let sourcesHTML = '';
let i = 0;
let currentImage = null;
const inputField = document.getElementById('input-field');
inputField.value=parseFloat(0);
let elements=[];

//add file listner
document.getElementById('image-input').addEventListener('change', function (event) {
  const files = event.target.files;

  if (files.length > 0) {
    const imagesContainer = document.querySelector('.js-images-grid');
    

    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        sourcesHTML += `
          <div class="grid-item">
            <img id="image${i}" src="${reader.result}" width="100%" height="100%" style="display: none;">
            <canvas id="Cimage${i}" class="canvasListen"></canvas>
          </div>
        `;
       
          imagesContainer.innerHTML = sourcesHTML;
        
     
      imgElement = document.getElementById(`image${i}`);
      show='Cimage'+i;
      elements.push(imgElement);

      imgElement.onload = function() {

        let mat = cv.imread(imgElement);
        cv.imshow(show, mat);
        mat.delete();

        elements.forEach(
          function(imgElement1, index) {
            
            let mat = cv.imread(imgElement1);
            cv.imshow('Cimage'+index, mat);
            mat.delete();
        
        
            });

            var canvasListeners = document.getElementsByClassName('canvasListen');
            for (const canvas of canvasListeners) {
                canvas.addEventListener('click', clickCanvas);
            }
          
          
       };

       i++;
    });

    reader.readAsDataURL(file);
  }
}
});

//we remember which canvas we clicked
function clickCanvas(event) {
  var clickedCanvas = event.target;
  var canvasId = clickedCanvas.id;
  currentImage=canvasId;
}
   


//turn left function
function turnLEFT() {
  
  var inputValueAsString = inputField.value;
  var inputValue = parseFloat(inputValueAsString);

  let src = cv.imread(currentImage);
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.rows, src.cols);
  let center = new cv.Point(src.cols / 2, src.rows / 2);
  let M = cv.getRotationMatrix2D(center, inputValue, 1);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow(currentImage, dst);
  src.delete(); dst.delete(); M.delete();

}

//turn right function
function turnRIGHT() {
  
  var inputValueAsString = inputField.value;
  var inputValue = parseFloat(inputValueAsString);

  let src = cv.imread(currentImage);
  let dst = new cv.Mat();
  let dsize = new cv.Size(src.rows, src.cols);
  let center = new cv.Point(src.cols / 2, src.rows / 2);
  let M = cv.getRotationMatrix2D(center, inputValue*-1, 1);
  cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
  cv.imshow(currentImage, dst);
  src.delete(); dst.delete(); M.delete();

}




let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成，可選擇顯示訊息
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 先畫第一組藍色線
    stroke(0, 0, 255); // 藍色
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 再畫第二組藍色線並填滿橙色
    stroke(0, 0, 255); // 藍色
    strokeWeight(2);
    fill(255, 165, 0, 200); // 半透明橙色
    beginShape();
    for (let i = 0; i < indices2.length; i++) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 在第一組與第二組之間充滿紫色
    fill(128, 0, 128, 150); // 半透明紫色
    noStroke();
    beginShape();
    // 先畫第一組
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 再畫第二組（反向，避免交錯）
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 新增連線功能（第一組陣列）
    const newIndices1 = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112];
    stroke("#e78f8e"); // 粉紅色
    strokeWeight(15); // 線條粗細
    for (let i = 0; i < newIndices1.length - 1; i++) {
      const idx1 = newIndices1[i];
      const idx2 = newIndices1[i + 1];
      const [x1, y1] = keypoints[idx1];
      const [x2, y2] = keypoints[idx2];
      line(x1, y1, x2, y2);
    }

    // 新增連線功能（第二組陣列）
    const newIndices2 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
    stroke("#e78f8e"); // 粉紅色
    strokeWeight(15); // 線條粗細
    for (let i = 0; i < newIndices2.length - 1; i++) {
      const idx1 = newIndices2[i];
      const idx2 = newIndices2[i + 1];
      const [x1, y1] = keypoints[idx1];
      const [x2, y2] = keypoints[idx2];
      line(x1, y1, x2, y2);
    }

    // 新增連線功能（第三組陣列）
    const newIndices3 = [359, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255];
    stroke("#e78f8e"); // 粉紅色
    strokeWeight(15); // 線條粗細
    for (let i = 0; i < newIndices3.length - 1; i++) {
      const idx1 = newIndices3[i];
      const idx2 = newIndices3[i + 1];
      const [x1, y1] = keypoints[idx1];
      const [x2, y2] = keypoints[idx2];
      line(x1, y1, x2, y2);
    }

    // 新增連線功能（第四組陣列）
    const newIndices4 = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];
    stroke("#e78f8e"); // 粉紅色
    strokeWeight(15); // 線條粗細
    for (let i = 0; i < newIndices4.length - 1; i++) {
      const idx1 = newIndices4[i];
      const idx2 = newIndices4[i + 1];
      const [x1, y1] = keypoints[idx1];
      const [x2, y2] = keypoints[idx2];
      line(x1, y1, x2, y2);
    }
  }
}

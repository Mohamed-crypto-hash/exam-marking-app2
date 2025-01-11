document.getElementById("processImage").addEventListener("click", () => {
    const fileInput = document.getElementById("imageUpload");
    const feedback = document.getElementById("feedback");
  
    if (fileInput.files.length === 0) {
      feedback.textContent = "Please upload an image first.";
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('examImage', file);
  
    // Send image to the server for OCR processing and grading
    fetch('/process-exam', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      feedback.innerHTML = `
        <strong>Exam Processed!</strong><br>
        Mock Result: ${data.resultScore}/100<br>
        Feedback: ${data.feedback}
      `;
    })
    .catch(error => {
      feedback.textContent = 'Error processing exam paper.';
    });
  });
  
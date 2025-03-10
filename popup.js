document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("drop-zone");
    const saveBtn = document.getElementById("save-btn");
    let imageUrl = "";

    // Prevent default behavior for drag-and-drop
    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.style.borderColor = "#28a745";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "#007bff";
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.style.borderColor = "#007bff";

        let imageFile = event.dataTransfer.files[0];

        if (imageFile && imageFile.type.startsWith("image/")) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;
                dropZone.innerHTML = `<img src="${imageUrl}" alt="Product Image" style="max-width: 100%; max-height: 80px;">`;
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert("Please drop a valid image file.");
        }
    });

    saveBtn.addEventListener("click", () => {
        const productName = document.getElementById("product-name").value;
        const brandName = document.getElementById("brand-name").value;

        if (!imageUrl || !productName || !brandName) {
            alert("Please complete all fields before saving.");
            return;
        }

        generatePDF(productName, brandName, imageUrl);
    });

    function generatePDF(product, brand, imageSrc) {
        const { jsPDF } = window.jspdf;
        const doc

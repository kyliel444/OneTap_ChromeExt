document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("drop-zone");
    const saveBtn = document.getElementById("save-btn");
    let imageUrl = "";

    // Prevent default behavior for drag-and-drop
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.style.borderColor = "#28a745";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "#007bff";
    });

    // Handle dropped image
    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.style.borderColor = "#007bff";

        let imageFile = event.dataTransfer.files[0];

        if (imageFile && imageFile.type.startsWith("image/")) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;
                dropZone.innerHTML = `<img src="${imageUrl}" alt="Product Image">`;
            };
            reader.readAsDataURL(imageFile);
        }
    });

    // Save data as PDF
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
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Product Information", 15, 20);

        doc.setFontSize(12);
        doc.text(`Product Name: ${product}`, 15, 40);
        doc.text(`Brand: ${brand}`, 15, 50);

        let img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            doc.addImage(img, "JPEG", 15, 60, 100, 100);
            doc.save("product-info.pdf");
        };
    }
});

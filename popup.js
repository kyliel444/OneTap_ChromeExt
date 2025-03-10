document.addEventListener("DOMContentLoaded", function () {
    const pasteZone = document.getElementById("paste-zone");
    const saveBtn = document.getElementById("save-btn");
    let imageUrl = "";

    // Handle image paste
    pasteZone.addEventListener("paste", (event) => {
        event.preventDefault();
        
        let items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.type.indexOf("image") === 0) {
                let blob = item.getAsFile();
                let reader = new FileReader();

                reader.onload = function (e) {
                    imageUrl = e.target.result;
                    pasteZone.innerHTML = `<img src="${imageUrl}" alt="Product Image">`;
                };
                
                reader.readAsDataURL(blob);
                break;
            }
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
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [250, 400] // Adjusted to fit content
        });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Product Information", 20, 30);

        doc.setFontSize(12);
        doc.text(`Product Name: ${product}`, 20, 60);
        doc.text(`Brand: ${brand}`, 20, 80);

        let img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            doc.addImage(img, "JPEG", 20, 100, 210, 210); // Adjusted size to fit properly
            doc.save("product-info.pdf");
        };
    }
});

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
                    pasteZone.innerHTML = `<img src="${imageUrl}" alt="Product Image" style="max-width: 100%; max-height: 80px;">`;
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

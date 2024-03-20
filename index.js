// Define your products and prices here, accessible globally
const products = [
    { name: "Silenus Sauvignon Blanc 75cl", price:  500},
    { name: "Silenus Chardonnay 75cl", price: 500 },
    { name: "Silenus Fume Blanc 75cl", price: 530 },
    { name: "Datça Blush 75cl", price: 460 },
    { name: "Blend Barik 75cl", price: 460 },
    { name: "Cnidus Syrah 75cl", price: 550 },
    { name: "Cnidus Cabernet Sauvignon 75cl", price: 550 },
    { name: "Cnidus Ök-Boğ 75cl", price: 550 },
    { name: "Cnidus Merlot 75cl", price: 550 },
    { name: "Cnidus Boğazkere 75cl", price: 550 },
    { name: "Cnidus Öküzgözü 75cl", price: 550 },
    { name: "Kaldı 75cl", price: 680 },
    { name: "Grand Reserve 75cl", price: 920 },
    { name: "Yarı Tatlı 75cl", price: 425 },
    { name: "Sauv. Blanc 37.5cl (Yarı miktar yazılacak)", price: 270 },
    { name: "Blend Barik 37.5cl (Yarı miktar yazılacak)", price: 250 },
    { name: "Datça Blush 37.5cl (Yarı miktar yazılacak)", price: 250 },

    // Add more products as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.products');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const label = document.createElement('label');
        label.setAttribute('for', `product${index}`);
        label.textContent = `${product.name}: `;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `product${index}`;
        input.name = `product${index}`;
        input.min = 0;
        input.value = 0;

        productDiv.appendChild(label);
        productDiv.appendChild(input);
        productsContainer.appendChild(productDiv);
    });
});

function calculateDiscount() {
    let totalQuantity = 0;
    let totalDiscount = 0;
    let totalPriceBeforeDiscount = 0;

    let discountThresholds = [60, 180, 300, 420, 540]; // Thresholds at which discount rates change
    let discountRates = [0.20, 0.24, 0.28, 0.33, 0.38, 0.4]; // Discount rates for each threshold

    // Track the remaining quantity for the current discount tier
    let remainingQuantityForCurrentDiscount = discountThresholds[0];
    let currentDiscountIndex = 0;

    products.forEach((product, index) => {
        let quantity = parseInt(document.getElementById(`product${index}`).value, 10) || 0;
        let productTotalPrice = quantity * product.price;
        totalPriceBeforeDiscount += productTotalPrice;

        while (quantity > 0) {
            if (quantity <= remainingQuantityForCurrentDiscount) {
                totalDiscount += quantity * product.price * discountRates[currentDiscountIndex];
                remainingQuantityForCurrentDiscount -= quantity;
                break; // Move to next product
            } else {
                totalDiscount += remainingQuantityForCurrentDiscount * product.price * discountRates[currentDiscountIndex];
                quantity -= remainingQuantityForCurrentDiscount;

                // Move to the next discount tier
                currentDiscountIndex++;
                if (currentDiscountIndex < discountThresholds.length) {
                    remainingQuantityForCurrentDiscount = discountThresholds[currentDiscountIndex] - discountThresholds[currentDiscountIndex - 1];
                } else {
                    remainingQuantityForCurrentDiscount = Infinity; // Last tier
                }
            }
        }
        totalQuantity += parseInt(document.getElementById(`product${index}`).value, 10) || 0;
    });

    let totalPriceAfterDiscount = totalPriceBeforeDiscount - totalDiscount;
    let averageDiscountRate = (totalDiscount / totalPriceBeforeDiscount) * 100;

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Toplam miktar: ${totalQuantity}</p>
        <p>İndirim öncesi fiyat: TRY ${totalPriceBeforeDiscount.toFixed(2)}</p>
        <p>Toplam indirim: TRY ${totalDiscount.toFixed(2)}</p>
        <p>İndirim sonrası KDV HARİÇ fiyat: TRY ${totalPriceAfterDiscount.toFixed(2)}</p>
        <p>Ortalama İndirim: ${averageDiscountRate.toFixed(2)}%</p>
    `;
}
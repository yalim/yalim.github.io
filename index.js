function calculateDiscount() {
    const form = document.getElementById('orderForm');
    const resultsDiv = document.getElementById('results');
    let totalQuantity = 0;
    let totalWithoutDiscount = 0;
    const prices = [460, 550]; // Example prices for each product. Update as needed.

    // Ensure you have the correct number of products; adjust the loop as necessary
    for (let i = 1; i <= 14; i++) {
        const qtyInput = form['product' + i];
        const qty = qtyInput && !isNaN(qtyInput.value) ? parseInt(qtyInput.value, 10) : 0;
        totalQuantity += qty;
        // Ensure you cycle through your prices array correctly
        totalWithoutDiscount += qty * prices[(i - 1) % prices.length]; // Adjust based on actual product price
    }

    // Calculate discount based on totalQuantity
    let discount = 0;
    if (totalQuantity <= 60) {
        discount = totalWithoutDiscount * 0.20;
    } else if (totalQuantity <= 120) {
        discount = (60 * 0.20 * prices[0]) + ((totalQuantity - 60) * 0.24 * prices[0]); // Example adjustment
    } else {
        discount = (60 * 0.20 * prices[0]) + (60 * 0.24 * prices[0]) + ((totalQuantity - 120) * 0.28 * prices[0]); // Example adjustment
    }

    const totalWithDiscount = totalWithoutDiscount - discount;
    const averageDiscountRate = (discount / totalWithoutDiscount) * 100;

    // Display results
    resultsDiv.innerHTML = `
        <p>Total Quantity: ${totalQuantity}</p>
        <p>Total Without Discount: TRY ${totalWithoutDiscount.toFixed(2)}</p>
        <p>Discount: TRY ${discount.toFixed(2)}</p>
        <p>Total With Discount: TRY ${totalWithDiscount.toFixed(2)}</p>
        <p>Average Discount Rate: ${averageDiscountRate.toFixed(2)}%</p>
    `;
}

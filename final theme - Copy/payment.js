document.addEventListener("DOMContentLoaded", () => {
  const booking = JSON.parse(localStorage.getItem("bookingData"));
  const selectBtns = document.querySelectorAll(".select-package");
  const summary = document.getElementById("summary");
  const summaryDetails = document.getElementById("summaryDetails");
  const confirmPay = document.getElementById("confirmPay");
  let selectedPackage = null;
  let paymentMethod = null;

  selectBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".package-card");
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const total = price * booking.members;
      const gst = total * 0.1;
      const final = total + gst;

      selectedPackage = { name, price, total, gst, final };

      summary.classList.remove("hidden");
      summaryDetails.innerHTML = `
        <p><strong>Name:</strong> ${booking.fullName}</p>
        <p><strong>Park:</strong> ${booking.park}</p>
        <p><strong>Package:</strong> ${name}</p>
        <p><strong>Members:</strong> ${booking.members}</p>
        <p><strong>Base Price:</strong> ₹${price} per person</p>
        <p><strong>GST (10%):</strong> ₹${gst.toFixed(2)}</p>
        <p><strong>Total:</strong> ₹${final.toFixed(2)}</p>
      `;

      window.scrollTo({ top: summary.offsetTop, behavior: "smooth" });
    });
  });

  // Payment method selection
  document.querySelectorAll(".payment-options img").forEach(img => {
    img.addEventListener("click", () => {
      document.querySelectorAll(".payment-options img").forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      paymentMethod = img.dataset.method;
    });
  });

  confirmPay.addEventListener("click", () => {
    if (!selectedPackage || !paymentMethod) {
      alert("Please select both a package and a payment method!");
      return;
    }

    alert(`🎉 Thank you ${booking.fullName}! Your ${selectedPackage.name} booking is confirmed.
Enjoy your rides with pleasantness!`);

    console.log("Booking confirmed:", { booking, selectedPackage, paymentMethod });
    localStorage.clear();
    window.location.href = "index.html";
  });
});

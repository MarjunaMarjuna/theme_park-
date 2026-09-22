bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const bookingData = {
    fullName: data.get("fullName"),
    email: data.get("email"),
    phone: data.get("phone"),
    members: parseInt(data.get("members")),
    park: data.get("parkSelect"),
  };

  // Save booking data to localStorage
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  // Go to next page
  window.location.href = "payment.html";
});

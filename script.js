function addProduct() {
  const type = document.getElementById('productType').value;
  const id = document.getElementById('productId').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseFloat(document.getElementById('price').value);
  if (!type || !id || isNaN(qty) || isNaN(price)) return;

  const total = qty * price;
  const table = document.getElementById('productTable').querySelector('tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${type}</td>
    <td>${id}</td>
    <td>${qty}</td>
    <td>Rs ${price.toFixed(2)}</td>
    <td>Rs ${total.toFixed(2)}</td>
  `;
  table.appendChild(row);

  updateTotal();
  document.getElementById('productId').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('price').value = '';
}

function updateTotal() {
  const rows = document.querySelectorAll('#productTable tbody tr');
  let grandTotal = 0;
  rows.forEach(row => {
    const total = parseFloat(row.cells[4].innerText.replace('Rs ', ''));
    grandTotal += total;
  });
  document.getElementById('totalCell').innerText = `Rs ${grandTotal.toFixed(2)}`;
}

function startScanner() {
  const html5QrCode = new Html5Qrcode("scanner");
  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      document.getElementById("productId").value = decodedText;
      html5QrCode.stop();
    },
    (errorMessage) => {
      // ignore scan errors
    }
  ).catch(err => {
    console.error("Unable to start scanning.", err);
  });
}

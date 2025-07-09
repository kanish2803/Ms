function addProduct() {
  const type = document.getElementById('productType').value;
  const id = document.getElementById('productId').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = parseFloat(document.getElementById('price').value);
  if (!type || (type === 'Mobile' && !id) || isNaN(qty) || isNaN(price)) return;

  const total = qty * price;
  const table = document.getElementById('productTable').querySelector('tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${type}</td>
    <td>${type === 'Mobile' ? id : '-'}</td>
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

function startBarcodeScanner() {
  const container = document.getElementById("barcode-scanner-container");
  const scannerDiv = document.getElementById("barcode-scanner");
  scannerDiv.innerHTML = "";
  container.style.display = "block";

  Quagga.init({
    inputStream: {
      type: "LiveStream",
      target: scannerDiv,
      constraints: {
        facingMode: "environment"
      }
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader"]
    }
  }, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function(result) {
    const code = result.codeResult.code;
    document.getElementById("productId").value = code;
    stopBarcodeScanner();
  });
}

function stopBarcodeScanner() {
  const container = document.getElementById("barcode-scanner-container");
  const scannerDiv = document.getElementById("barcode-scanner");
  try {
    Quagga.stop();
  } catch (e) {}
  scannerDiv.innerHTML = "";
  container.style.display = "none";
}

document.getElementById('productType').addEventListener('change', function () {
  const productIdField = document.getElementById('productId');
  if (this.value === 'Mobile') {
    productIdField.style.display = 'inline';
  } else {
    productIdField.style.display = 'none';
  }
});

function generateBill() {
  window.print();
}

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
  let total = 0;
  rows.forEach(row => {
    const val = parseFloat(row.cells[4].innerText.replace('Rs ', ''));
    total += val;
  });
  document.getElementById('totalCell').innerText = `Rs ${total.toFixed(2)}`;
}

function generateBill() {
  window.print();
}

document.getElementById('productType').addEventListener('change', function () {
  document.getElementById('productId').style.display = (this.value === 'Mobile') ? 'inline-block' : 'none';
});

// SCANNER FUNCTIONS
function startScanner() {
  const container = document.getElementById("scannerContainer");
  const scannerDiv = document.getElementById("scanner");
  container.style.display = "block";
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: scannerDiv,
      constraints: {
        facingMode: "environment"
      }
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader"]
    },
    locate: true
  }, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function(result) {
    if (result.codeResult && result.codeResult.code) {
      document.getElementById("productId").value = result.codeResult.code;
      stopScanner();
    }
  });
}

function stopScanner() {
  Quagga.stop();
  document.getElementById("scannerContainer").style.display = "none";
  document.getElementById("scanner").innerHTML = "";
}

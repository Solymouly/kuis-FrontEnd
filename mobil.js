document.getElementById("mobilForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let harga = parseFloat(document.getElementById("harga").value);
  let tahun = parseInt(document.getElementById("tahun").value);

  let usiaMobil = new Date().getFullYear() - tahun;
  let premi = 0;

  if (usiaMobil >= 0 && usiaMobil <= 3) {
    premi = harga * 0.025;
  } else if (usiaMobil > 3 && usiaMobil <= 5) {
    if (harga < 200000000) premi = harga * 0.04;
    else premi = harga * 0.03;
  } else {
    premi = harga * 0.05;
  }

  localStorage.setItem("premiMobil", premi);
  localStorage.setItem("merkMobil", document.getElementById("merk").value);
  localStorage.setItem("jenisMobil", document.getElementById("jenis").value);

  document.getElementById("hasil").innerHTML = `
    <div class="result-box">
      <h3>💡 Hasil Perhitungan Premi</h3>
      <p>Usia Mobil: <b>${usiaMobil} tahun</b></p>
      <p>Total Premi Per Tahun: <b>Rp ${premi.toLocaleString("id-ID")}</b></p>
      <button id="checkoutBtn" class="btn">👉 Checkout</button>
    </div>
  `;

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});

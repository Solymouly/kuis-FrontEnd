const premi = localStorage.getItem("premiMobil");
const merk = localStorage.getItem("merkMobil");
const jenis = localStorage.getItem("jenisMobil");

document.getElementById("checkoutMerk").textContent = merk || "-";
document.getElementById("checkoutJenis").textContent = jenis || "-";
document.getElementById("checkoutPremi").textContent = premi
  ? "Rp " + parseFloat(premi).toLocaleString("id-ID")
  : "Rp 0";

document.getElementById("btnBayar").addEventListener("click", function () {
  const metode = document.getElementById("payMethod").value;

  const pembayaran = {
    nama: "Asuransi Mobil",
    jenis: `${merk || "-"} - ${jenis || "-"}`,
    tanggal: new Date().toLocaleString("id-ID"),
    harga: parseFloat(premi) || 0,
    status: "Lunas",
    metode: metode, 
  };

  let histori = JSON.parse(localStorage.getItem("weHealth_histori")) || [];
  histori.push(pembayaran);
  localStorage.setItem("weHealth_histori", JSON.stringify(histori));

  alert("Pembayaran berhasil via " + metode + " ✅");
  window.location.href = "index.html";
});

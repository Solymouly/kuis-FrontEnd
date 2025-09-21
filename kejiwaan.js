document.getElementById("jiwaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const lahir = new Date(document.getElementById("lahir").value);
  const today = new Date();
  let umur = today.getFullYear() - lahir.getFullYear();
  if (
    today.getMonth() < lahir.getMonth() ||
    (today.getMonth() === lahir.getMonth() && today.getDate() < lahir.getDate())
  ) {
    umur--;
  }

  const pertanggungan = parseInt(
    document.getElementById("pertanggungan").value
  );

  let m = 0;
  if (umur <= 30) m = 0.002;
  else if (umur <= 50) m = 0.004;
  else m = 0.01;

  const premi = m * pertanggungan;

  document.getElementById("result").innerHTML = `
    <p><b>Umur:</b> ${umur} tahun</p>
    <p><b>Premi per bulan:</b> Rp${premi.toLocaleString()}</p>
  `;

  document.getElementById("checkoutBtn").style.display = "block";
});

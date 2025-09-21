const kesehatanForm = $("#kesehatanForm");
if (kesehatanForm) {
  if (!requireLogin()) {
  }
  kesehatanForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#namaKesehatan").value.trim();
    const dob = $("#lahirKesehatan").value;
    const pekerjaan = $("#pekerjaan").value.trim();
    const smoking = parseInt($("#merokok").value);
    const hipertensi = parseInt($("#hipertensi").value);
    const diabetes = parseInt($("#diabetes").value);
    const msgEl = $("#kesehatanMessage");
    const resultBox = $("#kesehatanResult");

    if (!name || !dob || !pekerjaan)
      return showMessage(msgEl, "Semua field wajib.", "red");
    if (!/^[A-Za-z\s]{3,32}$/.test(name))
      return showMessage(msgEl, "Nama tidak valid.", "red");

    const umur = getAgeFromDate(dob);
    if (umur < 0 || umur > 120)
      return showMessage(msgEl, "Tanggal lahir tidak valid.", "red");

    const P = 2000000;
    let m = 0;
    if (umur <= 20) m = 0.1;
    else if (umur <= 35) m = 0.2;
    else if (umur <= 50) m = 0.25;
    else m = 0.4;

    const faktorUsia = m * P;
    const faktorSmoking = smoking * 0.5 * P;
    const faktorHipertensi = hipertensi * 0.4 * P;
    const faktorDiabetes = diabetes * 0.5 * P;
    const premi =
      P + faktorUsia + faktorSmoking + faktorHipertensi + faktorDiabetes;

    resultBox.innerHTML = `
      <h3>Detail Perhitungan Premi</h3>
      <p><b>Nama:</b> ${name}</p>
      <p><b>Umur:</b> ${umur} tahun</p>
      <p><b>Pekerjaan:</b> ${pekerjaan}</p>
      <p><b>Dasar Premi:</b> ${formatIDR(P)}</p>
      <p><b>Tambahan Usia:</b> ${formatIDR(faktorUsia)}</p>
      <p><b>Tambahan Merokok:</b> ${formatIDR(faktorSmoking)}</p>
      <p><b>Tambahan Hipertensi:</b> ${formatIDR(faktorHipertensi)}</p>
      <p><b>Tambahan Diabetes:</b> ${formatIDR(faktorDiabetes)}</p>
      <h4>Total Premi: ${formatIDR(premi)}</h4>
      <button id="btnCheckout" class="btnCheckout">Checkout</button>
    `;
    localStorage.setItem(
      "weHealth_lastPremi",
      JSON.stringify({
        type: "kesehatan",
        amount: premi,
        details: {
          name,
          umur,
          pekerjaan,
          faktorUsia,
          faktorSmoking,
          faktorHipertensi,
          faktorDiabetes,
        },
      })
    );

    showMessage(msgEl, "Premi berhasil dihitung. Silakan Checkout.", "green");

    $("#btnCheckout").addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  });
}

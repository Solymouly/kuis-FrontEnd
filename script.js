// Update header login/logout
(function updateHeader() {
  const authNav = document.getElementById("auth-nav");
  if (!authNav) return;

  const isLogin = localStorage.getItem("weHealth_isLogin") === "true";
  const userRaw = localStorage.getItem("weHealth_user");

  if (isLogin && userRaw) {
    const user = JSON.parse(userRaw);
    authNav.innerHTML = `
      <span style="margin-right:12px;font-weight:700">
        <i class='bx bx-user'></i> Hi, ${user.name}
      </span>
      <a href="#" id="logoutBtn">
        <i class='bx bx-log-out'></i> Logout
      </a>`;

    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("weHealth_isLogin");
      alert("Anda berhasil logout.");
      window.location.href = "index.html";
    });
  } else {
    authNav.innerHTML = `
      <a href="login.html"><i class='bx bx-log-in'></i> Login</a>
      <a href="signup.html"><i class='bx bx-user-plus'></i> Sign Up</a>`;
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const historyBody = document.getElementById("history-body");
  if (!historyBody) return;

  const histori = JSON.parse(localStorage.getItem("weHealth_histori")) || [];

  if (histori.length === 0) {
    historyBody.innerHTML = `<tr><td colspan="5" style="text-align:center">Belum ada histori pembelian</td></tr>`;
  } else {
    historyBody.innerHTML = histori
      .map(
        (item) => `
        <tr>
          <td data-label="Nama Produk">${item.nama}</td>
          <td data-label="Jenis">${item.jenis}</td>
          <td data-label="Tanggal">${item.tanggal}</td>
          <td data-label="Harga">Rp ${item.harga.toLocaleString("id-ID")}</td>
          <td data-label="Status">
            <span class="status ${item.status === "Lunas" ? "lunas" : "belum"}">
              ${item.status}
            </span>
          </td>
        </tr>
      `
      )
      .join("");
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
});
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

let currentUser = null;
const csvPath = 'senarai_pengguna.csv';

function navigateTo(sectionId) {
  document.querySelectorAll('.content-section, #menu-utama').forEach(el => el.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function logout() {
  currentUser = null;
  document.getElementById('login-popup').classList.remove('hidden');
  document.getElementById('menu-utama').classList.add('hidden');
  document.getElementById('logout-btn').classList.add('hidden');
}

function validateLogin() {
  const nama = document.getElementById('input-nama').value.trim();
  const password = document.getElementById('input-password').value.trim();
  fetch(senarai_pengguna.csv)
    .then(res => res.text())
    .then(data => {
      const rows = data.split('\n').slice(1);
      let valid = false;
      rows.forEach(row => {
        const [namaPenuh, username, pass, status] = row.split(',');
        if (username === nama && pass === password && status.trim() === 'true') {
          valid = true;
          currentUser = namaPenuh;
        }
      });
      if (valid) {
        document.getElementById('login-popup').classList.add('hidden');
        document.getElementById('menu-utama').classList.remove('hidden');
        document.getElementById('logout-btn').classList.remove('hidden');
        document.getElementById('login-error').classList.add('hidden');
      } else {
        document.getElementById('login-error').classList.remove('hidden');
      }
    });
}

const kategori = [
  { nama: 'Kata Sapaan & Perkenalan Diri', video: 'https://www.youtube.com/embed/dummy1', nota: 'https://www.canva.com/design/dummy1', permainan: ['Aneka Pilihan', 'Padankan', 'Gariskan', 'Isi Tempat Kosong', 'Rait/Pangkah', 'Bonus'] },
  { nama: 'Perkataan Bertema', video: 'https://www.youtube.com/embed/dummy2', nota: 'https://www.canva.com/design/dummy2', permainan: ['Aneka Pilihan', 'Padankan', 'Gariskan', 'Isi Tempat Kosong', 'Rait/Pangkah', 'Bonus'] },
  { nama: 'Nombor & Jam', video: 'https://www.youtube.com/embed/dummy3', nota: 'https://www.canva.com/design/dummy3', permainan: ['Aneka Pilihan', 'Padankan', 'Gariskan', 'Isi Tempat Kosong', 'Rait/Pangkah', 'Bonus'] },
  { nama: 'Kata Ganti Nama & Kata Kerja', video: 'https://www.youtube.com/embed/dummy4', nota: 'https://www.canva.com/design/dummy4', permainan: ['Aneka Pilihan', 'Padankan', 'Gariskan', 'Isi Tempat Kosong', 'Rait/Pangkah', 'Bonus'] },
  { nama: 'Kata Sendi & Kata Arah', video: 'https://www.youtube.com/embed/dummy5', nota: 'https://www.canva.com/design/dummy5', permainan: ['Aneka Pilihan', 'Padankan', 'Gariskan', 'Isi Tempat Kosong', 'Rait/Pangkah', 'Bonus'] }
];

function renderBelajar() {
  const container = document.getElementById('kategori-belajar');
  kategori.forEach((k, i) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3 class="text-md font-semibold text-emerald-700 mb-2">${k.nama}</h3>
      <div class="tab-container">
        <button class="tab-btn" onclick="switchTab(this, 'video-${i}')">Video</button>
        <button class="tab-btn" onclick="switchTab(this, 'nota-${i}')">Nota</button>
      </div>
      <div id="video-${i}" class="tab-content">
        <div class="embed-container"><iframe src="${k.video}" allowfullscreen></iframe></div>
      </div>
      <div id="nota-${i}" class="tab-content">
        <div class="embed-container"><iframe src="${k.nota}" allowfullscreen></iframe></div>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderPermainan() {
  const container = document.getElementById('kategori-permainan');
  kategori.forEach((k, i) => {
    const div = document.createElement('div');
    div.className = 'card';
    const buttons = k.permainan.map((p) =>
      `<button class="subcategory-button" onclick="alert('Main: ${p} dalam ${k.nama}')">${p}</button>`
    ).join('');
    div.innerHTML = `<h3 class="text-md font-semibold text-emerald-700 mb-3">${k.nama}</h3>${buttons}`;
    container.appendChild(div);
  });
}

function switchTab(btn, targetId) {
  const container = btn.closest('.card');
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  container.querySelector(`#${targetId}`).classList.add('active');
}

window.onload = () => {
  renderBelajar();
  renderPermainan();
};
```
let dataUser = { nama: "", npm: "", kelas: "" };
const bankSoal = [];

// PROSES LOGIN
function prosesLogin() {
    const nama = document.getElementById('input-nama').value.trim();
    const npm = document.getElementById('input-npm').value.trim();
    const kelas = document.getElementById('input-kelas').value.trim();

    if (nama === "" || npm === "" || kelas === "") {
        alert("Semua data login wajib diisi!");
        return;
    }

    dataUser = { nama, npm, kelas };
    document.getElementById('user-info').innerText = `Logged In: ${nama} (${npm}) - ${kelas}`;
    
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('main-page').classList.remove('hidden');
    generate50Soal();
}

// NAVIGASI TAB
function switchTab(tab) {
    const btnKalkulator = document.querySelectorAll('.tab-btn')[0];
    const btnKuis = document.querySelectorAll('.tab-btn')[1];
    
    if (tab === 'kalkulator') {
        document.getElementById('tab-kalkulator').classList.remove('hidden');
        document.getElementById('tab-kuis').classList.add('hidden');
        btnKalkulator.classList.add('active');
        btnKuis.classList.remove('active');
    } else {
        document.getElementById('tab-kalkulator').classList.add('hidden');
        document.getElementById('tab-kuis').classList.remove('hidden');
        btnKalkulator.classList.remove('active');
        btnKuis.classList.add('active');
    }
}

// KALKULATOR FUNGSI
function ubahFormKalkulator() {
    const tipe = document.getElementById('tipe-limit').value;
    const formSub = document.getElementById('form-substitusi');
    if (tipe === 'substitusi') {
        formSub.classList.remove('hidden');
    } else {
        formSub.classList.add('hidden');
    }
}

function hitungLimit() {
    const tipe = document.getElementById('tipe-limit').value;
    const c = parseFloat(document.getElementById('calc-c').value);
    const hasilDiv = document.getElementById('hasil-kalkulator');
    hasilDiv.style.border = "1px solid #00D2FF";

    if (tipe === 'substitusi') {
        const a = parseFloat(document.getElementById('calc-a').value);
        const b = parseFloat(document.getElementById('calc-b').value);
        const hasil = (a * c) + b;
        hasilDiv.innerHTML = `Hasil: lim<sub>(x → ${c})</sub> (${a}x + ${b}) = ${hasil}`;
    } else {
        const hasil = 2 * c;
        hasilDiv.innerHTML = `Hasil: lim<sub>(x → ${c})</sub> (x² - ${c*c}) / (x - ${c}) = ${hasil}`;
    }
}

// GENERATE 50 SOAL SECARA DINAMIS
function generate50Soal() {
    const container = document.getElementById('container-soal');
    container.innerHTML = "";
    
    for (let i = 1; i <= 50; i++) {
        let tanya = "", opsi = [], kunci = "";
        
        if (i % 3 === 1) {
            let c = (i % 5) + 1;
            let hasil = 2 * c + 4;
            tanya = `Soal ${i}: Tentukan nilai dari lim <sub>(x → ${c})</sub> (2x + 4)`;
            opsi = [hasil, hasil + 2, fieldMinus(hasil), hasil * 2];
            kunci = hasil.toString();
        } else if (i % 3 === 2) {
            let c = (i % 4) + 2;
            let hasil = 2 * c;
            tanya = `Soal ${i}: Tentukan nilai dari lim <sub>(x → ${c})</sub> (x² - ${c*c}) / (x - ${c})`;
            opsi = [hasil - 1, hasil, hasil + 2, 0];
            kunci = hasil.toString();
        } else {
            let atas = (i % 3) + 2;
            let bawah = (i % 2) + 2;
            tanya = `Soal ${i}: Berapakah nilai dari lim <sub>(x → ∞)</sub> (${atas}x² + 2x) / (${bawah}x² - 1)?`;
            opsi = [`${atas}/${bawah}`, "0", "∞", `${bawah}/${atas}`];
            kunci = `${atas}/${bawah}`;
        }

        opsi.sort();
        bankSoal.push({ kunci });

        let soalHtml = `
            <div class="soal-card">
                <p><b>${tanya}</b></p>
        `;
        opsi.forEach((opt, oIdx) => {
            soalHtml += `
                <label class="opsi-label">
                    <input type="radio" name="soal-${i}" value="${opt}"> ${String.fromCharCode(65 + oIdx)}. ${opt}
                </label>
            `;
        });
        soalHtml += `</div>`;
        container.innerHTML += soalHtml;
    }
}

function fieldMinus(val) {
    return val - 2 < 0 ? val + 5 : val - 2;
}

// HITUNG SKOR KUIS
function hitungSkorKuis() {
    let skor = 0;
    for (let i = 1; i <= 50; i++) {
        const dipilih = document.querySelector(`input[name="soal-${i}"]:checked`);
        if (dipilih && dipilih.value === bankSoal[i-1].kunci) {
            skor++;
        }
    }
    const nilaiAkhir = (skor / 50) * 100;
    document.getElementById('hasil-kuis').innerHTML = `Kuis Selesai!<br>Skor: ${skor} / 50<br>Nilai Akhir: ${nilaiAkhir.toFixed(1)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
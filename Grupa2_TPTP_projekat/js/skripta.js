document.addEventListener('DOMContentLoaded', () => {
    // SRCE - FAVORITI
    const hearts = document.querySelectorAll('.srce');
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.classList.toggle('liked');
            this.innerHTML = this.classList.contains('liked') ? '❤️' : '♡';
            this.style.color = this.classList.contains('liked') ? '#ff3b30' : '#d2d2d7';
        });
    });

    // FILTERI
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.kartica');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.innerText;
            items.forEach(item => {
                if (category === 'Svi proizvodi' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
   

    // 3. FUNKCIJA ZA DUGME "DODAJ U KORPU"
    const korpaDugmad = document.querySelectorAll('.dodaj-btn');

    korpaDugmad.forEach(dugme => {
        dugme.addEventListener('click', function() {

            const originalniSadrzaj = this.innerHTML;
            
            // Efekat klika: promijeni tekst i boju
            this.innerHTML = "✅ Dodano!";
            this.style.backgroundColor = "#28a745"; // Zelena
            this.style.transform = "scale(0.95)"; // Malo se "stisne" dugme
            
            // Vrati na staro nakon 1.5 sekunde
            setTimeout(() => {
                this.innerHTML = originalniSadrzaj;
                this.style.backgroundColor = ""; // Vraća na tvoju narandžastu iz CSS-a
                this.style.transform = "scale(1)";
            }, 1500);
            
            console.log("Proizvod dodan!");
        });
    });
});


// =========================================================
// ADEMOV DIO - DARK MODE I ZAJEDNIČKA KORPA
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- TAMNI MOD (Kriterij 8) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Provjera memore (LocalStorage)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.innerText = '☀️';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerText = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerText = '🌙';
            }
        });
    }

    // --- FUNKCIONALNA KORPA SA LOCALSTORAGE  ---
    let korpa = JSON.parse(localStorage.getItem('shared_korpa')) || [];
    
    const stavkeKontejner = document.getElementById('korpa-stavke');
    const brojacEl = document.getElementById('korpa-brojac');
    const ukupnoEl = document.getElementById('korpa-ukupno');
    const isprazniBtn = document.getElementById('isprazni-korpu-btn');

    // Crtanje korpe
    function osveziPrikazKorpe() {
        if (!stavkeKontejner) return; // Ako nismo na index.html, preskoči prikaz

        if (korpa.length === 0) {
            stavkeKontejner.innerHTML = '<p style="color: var(--text-sivi); text-align: center; font-size: 14px; margin: 15px 0;">Korpa je prazna.</p>';
            if (brojacEl) brojacEl.innerText = '0';
            if (ukupnoEl) ukupnoEl.innerText = '0 KM';
            return;
        }

        stavkeKontejner.innerHTML = '';
        let ukupnaCijena = 0;

        korpa.forEach(proizvod => {
            const stavkaDiv = document.createElement('div');
            stavkaDiv.className = 'korpa-stavka';
            stavkaDiv.innerHTML = `
                <span style="font-weight: 600; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${proizvod.naziv}</span>
                <span style="color: var(--primarna); font-weight: 700;">${proizvod.cijena} KM</span>
            `;
            stavkeKontejner.appendChild(stavkaDiv);
            ukupnaCijena += proizvod.cijena;
        });

        if (brojacEl) brojacEl.innerText = korpa.length;
        if (ukupnoEl) ukupnoEl.innerText = ukupnaCijena + ' KM';
    }

    // Hvatanje klikova na dodavanje u korpu (Radi i na Zlatinoj i Ademovoj stranici)
    const svaDugmadZaKorpu = document.querySelectorAll('.dodaj-btn');
    svaDugmadZaKorpu.forEach(dugme => {
        dugme.addEventListener('click', function() {
            // Izvlačenje podataka o proizvodu iz Zlatine HTML strukture kartice
            const kartica = this.closest('.kartica');
            const nazivProizvoda = kartica.querySelector('h3').innerText;
            const cijenaTekst = kartica.querySelector('.cijena').innerText;
            const cistaCijena = parseInt(cijenaTekst.replace(/[^0-9]/g, '')); // Briše "KM" i ostavlja samo broj

            // Dodavanje u memoriju
            korpa.push({ naziv: nazivProizvoda, cijena: cistaCijena });
            localStorage.setItem('shared_korpa', JSON.stringify(korpa));
            
            // Osvježavanje UI-a na stranici
            osveziPrikazKorpe();
        });
    });

    // Brisanje korpe
    if (isprazniBtn) {
        isprazniBtn.addEventListener('click', () => {
            korpa = [];
            localStorage.setItem('shared_korpa', JSON.stringify(korpa));
            osveziPrikazKorpe();
        });
    }

    // Inicijalno učitavanje kada se otvori stranica
    osveziPrikazKorpe();
});
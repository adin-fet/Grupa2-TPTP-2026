


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


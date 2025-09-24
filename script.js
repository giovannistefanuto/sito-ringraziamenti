document.addEventListener('DOMContentLoaded', () => {
    // Inizializza la libreria per le animazioni
    AOS.init();

    const loginForm = document.getElementById('login-form');
    const parolaInput = document.getElementById('parola-segreta');
    const errorMessage = document.getElementById('error-message');

    const loginSection = document.getElementById('login-section');
    const ringraziamentoSection = document.getElementById('ringraziamento-section');

    const fotoPersona = document.getElementById('foto-persona');
    const nomePersona = document.getElementById('nome-persona');
    const testoRingraziamento = document.getElementById('testo-ringraziamento');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        errorMessage.textContent = '';

        const parolaInserita = parolaInput.value.trim().toLowerCase();

        if (window.ringraziamenti[parolaInserita]) {
            const dati = window.ringraziamenti[parolaInserita];

            // Riempie la card personalizzata con i dati trovati
            fotoPersona.src = dati.foto;
            fotoPersona.alt = `Foto per ${dati.nome}`;
            nomePersona.textContent = dati.nome;
            testoRingraziamento.textContent = dati.testo;

            // Nasconde la sezione di login
            loginSection.classList.add('hidden');

            // Mostra la sezione ringraziamento
            ringraziamentoSection.classList.remove('hidden');
            
            // MODIFICA QUI: La riga che aggiungeva 'data-aos' è stata rimossa.
            // Questa riga è ancora necessaria e ora funzionerà correttamente.
            AOS.refresh();
            
        } else {
            errorMessage.textContent = 'Parola segreta non valida. Riprova!';
            
            // Feedback visivo semplice (shake via CSS)
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }

        parolaInput.value = '';
    });
// --- Logica per il gioco a premi ---
    const pulsantePremio = document.getElementById('pulsante-premio');
    const risultatoPremio = document.getElementById('risultato-premio');

    const frasiSconfitta = [
        'Mi dispiace, hai perso.',
        'Sei stato sfortunato, hai perso.',
        'Niente caffè oggi, ritenta!',
        'La fortuna è cieca, ma oggi ci vede benissimo.',
        'Nope. Niente da fare.',
        'Il server dice "hai perso". Non prendertela con me.',
        'Hai perso. Ma hey, almeno ci hai provato!'
    ];

    pulsantePremio.addEventListener('click', () => {
        // Pulisce le classi precedenti
        risultatoPremio.classList.remove('vittoria', 'sconfitta');

        const numeroCasuale = Math.random(); // Genera un numero tra 0 e 1

        if (numeroCasuale < 0.01) { // Probabilità dell'1%
            risultatoPremio.textContent = 'INCREDIBILE! HAI VINTO UN CAFFÈ OFFERTO DA GIO!';
            risultatoPremio.classList.add('vittoria');
        } else {
            const fraseCasuale = frasiSconfitta[Math.floor(Math.random() * frasiSconfitta.length)];
            risultatoPremio.textContent = fraseCasuale;
            risultatoPremio.classList.add('sconfitta');
        }
    });
});
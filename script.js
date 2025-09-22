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
});
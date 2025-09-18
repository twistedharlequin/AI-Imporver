// Peringatan: API key ini terlihat di browser. Gunakan hanya untuk pengujian.
const API_KEY = 'AIzaSyD1-WlWzJ1xbixQ0soBI4eZxEC2i35y-a0'; 
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// Logika untuk ganti tema (dark/light)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});

// Logika untuk memproses prompt dan animasi
document.getElementById('enhanceBtn').addEventListener('click', async function() {
    const promptInput = document.getElementById('promptInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const suggestionP = document.getElementById('suggestion');

    if (promptInput === "") {
        // Tampilkan hasil secara langsung tanpa fade jika kosong
        suggestionP.textContent = "Silakan masukkan prompt terlebih dahulu.";
        resultsDiv.classList.add('visible');
        return;
    }

    // Animasi fade out
    resultsDiv.classList.remove('visible');

    suggestionP.textContent = "Sedang memproses, mohon tunggu...";
    
    // Memberi sedikit jeda agar animasi fade out terlihat
    setTimeout(async () => {
        try {
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `Berikut adalah prompt yang perlu diperbaiki: "${promptInput}". Berikan saran yang singkat dan jelas untuk membuatnya lebih spesifik, efektif, dan lebih baik. Jangan berikan prompt yang sudah diperbaiki, hanya saran saja.`
                            }
                        ]
                    }
                ]
            };
    
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                throw new Error(`Gagal memanggil API: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            const enhancedPrompt = data.candidates[0].content.parts[0].text;
            
            suggestionP.textContent = enhancedPrompt;
    
        } catch (error) {
            console.error('Error:', error);
            suggestionP.textContent = `Maaf, terjadi kesalahan saat memproses prompt. Silakan coba lagi. (${error.message})`;
        }
        
        // Animasi fade in
        resultsDiv.classList.add('visible');
    }, 500); // 500ms atau 0.5 detik
});

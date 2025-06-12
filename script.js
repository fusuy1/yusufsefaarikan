// Animasyon kütüphanesini başlat
AOS.init({
    duration: 1200,
    once: true
});

// Menüde tıklanan linke animasyon
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Form gönderimini engelle ve animasyon göster
const form = document.querySelector('.contact-form');
if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.reset();
        form.querySelector('button').textContent = 'Gönderildi!';
        setTimeout(() => {
            form.querySelector('button').textContent = 'Gönder';
        }, 2000);
    });
}

// Scroll animasyonu için smooth scroll
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Mouse parıltı efekti
const mouseGlow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', function(e) {
    if (mouseGlow) {
        mouseGlow.style.transform = `translate(${e.clientX - 90}px, ${e.clientY - 90}px)`;
    }
});

// Gece modu durumu localStorage ile tüm sayfalarda ortak tutulacak
function setNightMode(active) {
    if (active) {
        document.body.classList.add('night-mode');
        localStorage.setItem('nightMode', 'on');
    } else {
        document.body.classList.remove('night-mode');
        localStorage.setItem('nightMode', 'off');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Sadece index.html'de lamba var
    var lamp = document.getElementById('lamp-toggle');
    // Sayfa açılışında localStorage'a göre gece modunu uygula
    var nightMode = localStorage.getItem('nightMode');
    setNightMode(nightMode === 'on');
    if (lamp) {
        // Lambanın görünümünü localStorage'a göre ayarla
        if (nightMode === 'on') {
            lamp.classList.remove('lamp-on');
            lamp.classList.add('lamp-off');
        } else {
            lamp.classList.remove('lamp-off');
            lamp.classList.add('lamp-on');
        }
        lamp.onclick = function() {
            var isOn = lamp.classList.contains('lamp-on');
            setNightMode(isOn);
            lamp.classList.toggle('lamp-on');
            lamp.classList.toggle('lamp-off');
        };
    }
});

// Basit yapay zeka chatbox (gelişmiş, daha kaliteli ve doğal cevaplar)
const aiForm = document.getElementById('ai-chat-form');
const aiInput = document.getElementById('ai-chat-input');
const aiMessages = document.getElementById('ai-chat-messages');

if (aiForm && aiInput && aiMessages) {
    aiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = aiInput.value.trim();
        if (!userMsg) return;
        aiMessages.innerHTML += `<div style='margin-bottom:6px;'><b>Sen:</b> ${userMsg}</div>`;
        aiInput.value = '';
        aiMessages.scrollTop = aiMessages.scrollHeight;
        setTimeout(() => {
            aiMessages.innerHTML += `<div style='margin-bottom:10px;'><b>Asistan:</b> ${aiBotReplyV2(userMsg)}</div>`;
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 700);
    });
}

function aiBotReplyV2(msg) {
    msg = msg.toLowerCase().trim();
    // Selamlaşma
    if(/\b(merhaba|selam|günaydın|iyi akşamlar|iyi geceler|hey|hi|hello)\b/.test(msg))
        return 'Merhaba! Sana nasıl yardımcı olabilirim?';
    // Ad
    if(/(adın|ismin|sen kimsin|kimsin|adın ne|kim|adın nedir)/.test(msg))
        return 'Ben Yusuf Sefa Arıkan web sitesinin akıllı asistanıyım.';
    // İletişim
    if(/(iletişim|mail|e-?posta|email|ulaş|sana nasıl ulaşırım)/.test(msg))
        return 'Bana iletişim formundan veya sosyal medya hesaplarımdan ulaşabilirsin.';
    // Proje
    if(/(proje|projelerin|çalışma|yazılım|neler yaptın|hangi projeler)/.test(msg))
        return 'Projelerim bölümünde yaptığım çalışmaları detaylıca görebilirsin!';
    // Hobi
    if(/(hobin|hobi|ilgi alanı|ilgi alanların|nelerden hoşlanırsın)/.test(msg))
        return 'Yusuf Sefa Arıkan; yazılım, müzik ve sporla ilgileniyor.';
    // Okul
    if(/(okul|eğitim|nerede okuyorsun|hangi okul|hangi lise)/.test(msg))
        return 'Şu an Gazi Meslek Lisesi’nde eğitim görüyorum.';
    // Staj
    if(/(staj|stajyer|nerede staj|staj yapıyor musun)/.test(msg))
        return 'Stajımı T.C. Cumhurbaşkanlığı’nda yapıyorum.';
    // Diller
    if(/(html|css|javascript|js|c\+\+|hangi diller|hangi programlama|hangi yazılım)/.test(msg))
        return 'HTML, CSS, JavaScript ve C++ dillerini aktif olarak kullanıyorum!';
    // Teşekkür
    if(/(teşekkür|sağ ol|thanks|thank you|teşekkürler)/.test(msg))
        return 'Rica ederim! Yardımcı olabildiysem ne mutlu.';
    // Veda
    if(/(görüşürüz|hoşça kal|bye|bay bay|güle güle)/.test(msg))
        return 'Görüşmek üzere! Kendine iyi bak.';
    // Yaş
    if(/(yaş|kaç yaşındasın)/.test(msg))
        return 'Ben bir yapay zeka asistanıyım, yaşım yok :)';
    // Site
    if(/(site|web sitesi|tasarım|tema|bu siteyi kim yaptı)/.test(msg))
        return 'Bu site Yusuf Sefa Arıkan için özel olarak tasarlandı.';
    // Yardım
    if(/(yardım|sorun|problem|destek|yardımcı olur musun)/.test(msg))
        return 'Her türlü sorunuz için buradayım!';
    // Favori renk
    if(/(favori renk|renk|color|en sevdiğin renk)/.test(msg))
        return 'Canlı renkleri ve gece modunu seviyorum!';
    // Daha doğal cevaplar
    if(msg.endsWith('?')) return 'Bu konuda sana yardımcı olabilmem için biraz daha detay verebilir misin?';
    if(msg.length < 8) return 'Sorunu biraz daha ayrıntılı yazabilir misin?';
    // Genel fallback
    return 'Bunu anlayamadım, lütfen daha açık bir şekilde sorar mısın?';
}

// AI Chatbox açma/kapama fonksiyonu
const aiFab = document.getElementById('ai-chat-fab');
const aiOpen = document.getElementById('ai-chat-open');
const aiPanel = document.getElementById('ai-chatbox-panel');
const aiClose = document.getElementById('ai-chat-close');

if (aiFab && aiOpen && aiPanel && aiClose) {
    aiOpen.addEventListener('click', () => {
        aiPanel.style.display = 'block';
        aiOpen.style.display = 'none';
    });
    aiClose.addEventListener('click', () => {
        aiPanel.style.display = 'none';
        aiOpen.style.display = 'flex';
    });
    // Panel dışında bir yere tıklanınca kapansın
    document.addEventListener('mousedown', function(e) {
        if (aiPanel.style.display === 'block' && !aiPanel.contains(e.target) && !aiOpen.contains(e.target)) {
            aiPanel.style.display = 'none';
            aiOpen.style.display = 'flex';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const dotsContainer = document.getElementById('dotsContainer');
    const numButtons = document.querySelectorAll('.num-btn');
    const clearButton = document.getElementById('clearBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // تم تغيير العدد هنا إلى 7
    const MAX_LENGTH = 7; 
    const CORRECT_PASSCODE = "1182024"; // كلمة السر من 7 أرقام
    const NEXT_PAGE_URL = "page1.html";

    let currentPasscode = "";

    // تحديث النقاط تلقائياً بناءً على عدد عناصر .dot الموجودة
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index < currentPasscode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (errorMessage) errorMessage.style.display = "none";

            if (currentPasscode.length < MAX_LENGTH) {
                const num = this.getAttribute('data-num');
                currentPasscode += num;
                updateDots();

                // التحقق فقط عند الوصول إلى 7 أرقام
                if (currentPasscode.length === MAX_LENGTH) {
                    setTimeout(checkPasscode, 200);
                }
            }
        });
    });

    clearButton.addEventListener('click', function() {
        if (currentPasscode.length > 0) {
            currentPasscode = currentPasscode.slice(0, -1);
            if (errorMessage) errorMessage.style.display = "none";
            updateDots();
        }
    });

    function checkPasscode() {
        if (currentPasscode === CORRECT_PASSCODE) {
            window.location.href = NEXT_PAGE_URL;
        } else {
            if (errorMessage) errorMessage.style.display = "block";
            currentPasscode = "";
            updateDots();
        }
    }
});
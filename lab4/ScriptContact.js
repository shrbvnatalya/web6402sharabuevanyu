document.getElementById("contactForm").addEventListener("submit", ContactForm);
async function ContactForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let town = document.getElementById("town").value;
    let errorModal = document.getElementById("errorModal");
    let errorMessagesDiv = document.getElementById("error-messages");
    let successModal = document.getElementById("successModal");
    let successMessageDiv = document.getElementById("success-message");

    errorMessagesDiv.innerHTML = '';
    let error = false;

    // Проверка имени
    if (name.trim() === "" || name.length <= 2 || !/^[a-zA-Zа-яА-Я\s-]+$/.test(name)) {
        errorMessagesDiv.innerHTML += "<p>Введите корректное имя. Длина имени должна быть больше двух букв, нельзя использовать цифры, можно использовать дефис и пробел.</p>";
        error = true;
    }
    // Проверка email
    if (email.trim() === "" || /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errorMessagesDiv.innerHTML += "<p>Введен некорректный адрес электронной почты.</p>";
        error = true;
    }
    // Проверка телефона
    if (tel.trim() === "" || !/^(?:\+?\d{11})$/.test(tel)) {
        errorMessagesDiv.innerHTML += "<p>Форма номера телефона введена неверно. Убедитесь, что вы ввели 11 цифр, без пробелов и дефисов. Поддерживается формат записи, начинающийся с 8 и +7.</p>";
        error = true;
    }

    if (town.trim() === "" || town.length <= 2 || !/^[a-zA-Zа-яА-Я\s-]+$/.test(town)) {
        errorMessagesDiv.innerHTML += "<p>Введите корректное название города. Длина слова должна быть больше двух, нельзя использовать цифры, можно использовать дефис и пробел.</p>";
        error = true;
    }

    if (error) {
        errorModal.style.display = 'block';
        return false;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, tel, town })
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        // Успешное сообщение
        successMessageDiv.innerHTML = "Ваш запрос отправлен! Мы обязательно обработаем вашу заявку в ближайшее время и свяжемся с вами.";
        successModal.style.display = 'block';
        // Очистка полей после успешной отправки
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("tel").value = "";
        return true;

    } catch (error) {
        console.error('Ошибка:', error);
        errorMessagesDiv.innerHTML += "Запрос не отправлен!";
        errorModal.style.display = 'block';
        return false;
    }
}
// Закрытие модального окна для ошибок
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById("errorModal").style.display = 'none';
});

// Закрытие модального окна для успешного сообщения
document.querySelector('.close-button-success').addEventListener('click', function() {
    document.getElementById("successModal").style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const errorModal = document.getElementById("errorModal");
    const successModal = document.getElementById("successModal");

    if (event.target === errorModal) {
        errorModal.style.display = 'none';
    }

    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});
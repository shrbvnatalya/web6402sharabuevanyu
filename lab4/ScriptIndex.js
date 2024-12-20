const showClinicsButton = document.getElementById('all_tour');
showClinicsButton.addEventListener('click', TableTour);

async function TableTour() {
    const tour_row = document.getElementById('tour_row');
    const table_tour = document.getElementById('table_tour');

    try {
        const response = await fetch('http://127.0.0.1:8000/tour');
        if (!response.ok) {
            const message = `Ошибка HTTP! Статус: ${response.status} ${await response.text()}`;
            throw new Error(message);
        }
        const TourData = await response.json();

        // Проверка, что данные являются массивом
        if (Array.isArray(TourData)) {
            tour_row.innerHTML = '';

            // Фильтрация некорректных объектов
            const validTours = TourData.filter(tour =>
                tour.city && tour.description && tour.date && tour.price
            );

            validTours.forEach(tour => {
                const row = tour_row.insertRow();
                row.insertCell().textContent = tour.city;
                row.insertCell().textContent = tour.description;
                row.insertCell().textContent = tour.date;
                row.insertCell().textContent = tour.price;
            });

            // Проверка, если есть валидные туры
            if (validTours.length > 0) {
                table_tour.style.display = 'block';
            } else {
                console.warn("Нет доступных туров для отображения.");
                table_tour.style.display = 'none';
            }
        } else {
            throw new Error("Полученные данные имеют неверный формат");
        }
    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
        alert('Ошибка загрузки данных о турах: ${error.message}');
    }
}
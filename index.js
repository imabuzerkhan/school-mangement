document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inputForm');
    const dataContainer = document.getElementById('data');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedClass = document.getElementById('Class').value;
        const facultyName = document.getElementById('facultyName').value;

        const newData = createDataItem(selectedClass, facultyName);
        dataContainer.appendChild(newData);

        saveDataToLocalStorage();
        form.reset();
    });

    dataContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('deleteButton')) {
            if (confirm('Are you sure you want to delete this item?')) {
                target.closest('.data-item').remove();
                saveDataToLocalStorage();
            }
        } else if (target.classList.contains('editButton')) {
            const currentItem = target.closest('.data-item');
            const classValue = currentItem.querySelector('div:nth-child(1)').textContent;
            const facultyValue = currentItem.querySelector('div:nth-child(2)').textContent;

            document.getElementById('Class').value = classValue;
            document.getElementById('facultyName').value = facultyValue;
        }
    });

    function createDataItem(classValue, facultyValue) {
        const newData = document.createElement('div');
        newData.classList.add('data-item');
        newData.innerHTML = `
            <div>${classValue}</div>
            <div>${facultyValue}</div>
            <div>
                <button class="editButton">🖊️</button>
                <button class="deleteButton">❌</button>
            </div>
        `;
        return newData;
    }

    function saveDataToLocalStorage() {
        const dataItems = Array.from(dataContainer.querySelectorAll('.data-item'));
        const data = dataItems.map(item => ({
            class: item.querySelector('div:nth-child(1)').textContent,
            faculty: item.querySelector('div:nth-child(2)').textContent
        }));

        localStorage.setItem('savedData', JSON.stringify(data));
    }

    function loadDataFromLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        savedData.forEach(item => {
            const { class: classValue, faculty } = item;
            const newData = createDataItem(classValue, faculty);
            dataContainer.appendChild(newData);
        });
    }

    loadDataFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', function () {
    const dataContainer = document.getElementById('data');
    const editModal = document.getElementById('editModal');
    let currentItemToEdit = null;

    dataContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('editButton')) {
            currentItemToEdit = event.target.closest('.data-item');
            const classValue = currentItemToEdit.querySelector('div:nth-child(1)').textContent;
            const facultyValue = currentItemToEdit.querySelector('div:nth-child(2)').textContent;

            document.getElementById('editClass').value = classValue;
            document.getElementById('editFaculty').value = facultyValue;

            editModal.style.display = 'block';
        }
    });

    document.getElementById('confirmEditBtn').addEventListener('click', function () {
        if (currentItemToEdit) {
            const editedClass = document.getElementById('editClass').value;
            const editedFaculty = document.getElementById('editFaculty').value;

            currentItemToEdit.querySelector('div:nth-child(1)').textContent = editedClass;
            currentItemToEdit.querySelector('div:nth-child(2)').textContent = editedFaculty;

            saveDataToLocalStorage();
            editModal.style.display = 'none';
            currentItemToEdit = null;
        }
    });

    document.getElementById('cancelEditBtn').addEventListener('click', function () {
        editModal.style.display = 'none';
        currentItemToEdit = null;
    });

    function saveDataToLocalStorage() {
        // Your existing logic to save data to local storage
        // ...
    }

    // ... Other existing code
});

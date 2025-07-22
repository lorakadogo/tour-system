document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const contentSections = document.querySelectorAll('.content-section');
    const tourTableBody = document.querySelector('#tourTable tbody');
    const tourStatusSelect = document.getElementById('tourStatus');
    const mainIcon = document.getElementById('mainIcon');
    const noteField = document.getElementById('noteField');
    const autosaveMsg = document.getElementById('autosaveMsg');
    const checkItineraryBtn = document.getElementById('checkItineraryBtn');
    const itineraryModal = document.getElementById('itineraryModal');
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const itineraryItemsDiv = document.getElementById('itineraryItems');
    const backupItemsDiv = document.getElementById('backupItems');
    const emergencyItemsDiv = document.getElementById('emergencyItems');

    // --- Navigation Functionality ---
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove active class from all links
            sidebarLinks.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show the corresponding content section
            const targetSectionId = this.dataset.section;
            document.getElementById(targetSectionId).classList.add('active');
        });
    });

    // --- Schedule Section: Populate Table with Data ---
    const tourData = [
        {
            date: '2025-07-20',
            time: '09:00',
            tourName: 'Nairobi City Walk',
            typeDuration: 'Walking, 2h',
            conflict: '-',
            groupSize: 10,
            ageGroups: '18-60',
            requests: 'None',
            languages: 'English, Swahili',
            addToCalendar: true
        },
        {
            date: '2025-07-22',
            time: '14:00',
            tourName: 'Safari Park Tour',
            typeDuration: 'Bus Tour, 4h',
            conflict: 'Overbooked',
            groupSize: 15,
            ageGroups: 'All ages',
            requests: 'Wheelchair access',
            languages: 'English, German',
            addToCalendar: false
        },
        {
            date: '2025-07-25',
            time: '08:30',
            tourName: 'Museum & Market Excursion',
            typeDuration: 'Walking, 3h',
            conflict: '-',
            groupSize: 8,
            ageGroups: '25-70',
            requests: 'Vegetarian lunch',
            languages: 'English, French',
            addToCalendar: true
        }
    ];

    function populateTourTable() {
        tourTableBody.innerHTML = ''; // Clear existing rows
        tourData.forEach(tour => {
            const row = tourTableBody.insertRow();
            row.insertCell().textContent = tour.date;
            row.insertCell().textContent = tour.time;
            row.insertCell().textContent = tour.tourName;
            row.insertCell().textContent = tour.typeDuration;
            row.insertCell().textContent = tour.conflict;
            row.insertCell().textContent = tour.groupSize;
            row.insertCell().textContent = tour.ageGroups;
            row.insertCell().textContent = tour.requests;
            row.insertCell().textContent = tour.languages;

            const calendarCell = row.insertCell();
            if (tour.addToCalendar) {
                const button = document.createElement('button');
                button.textContent = '➕';
                button.title = 'Add to Calendar';
                button.classList.add('add-calendar-btn');
                button.onclick = () => alert(`Adding "${tour.tourName}" to calendar!`); // Placeholder action
                calendarCell.appendChild(button);
            } else {
                calendarCell.textContent = '-';
            }
        });
    }
    populateTourTable();

    // --- Tour Status Section Functionality ---

    // Update status indicator based on select value
    tourStatusSelect.addEventListener('change', (event) => {
        const status = event.target.value;
        mainIcon.classList.remove('not-started', 'in-progress', 'completed');
        mainIcon.classList.add(status);

        if (status === 'not-started') {
            mainIcon.textContent = '🟠';
        } else if (status === 'in-progress') {
            mainIcon.textContent = '🔵';
        } else if (status === 'completed') {
            mainIcon.textContent = '🟢';
        }
    });

    // Simulate autosave for note field
    let autosaveTimeout;
    noteField.addEventListener('input', () => {
        clearTimeout(autosaveTimeout);
        autosaveMsg.style.display = 'none';
        autosaveTimeout = setTimeout(() => {
            // In a real app, you'd send this data to a server
            console.log('Note autosaved:', noteField.value);
            autosaveMsg.style.display = 'block';
        }, 1500); // Save after 1.5 seconds of no typing
    });

    // Handle stop buttons (simple toggle for demonstration)
    document.getElementById('stop1').addEventListener('click', function() {
        this.classList.toggle('active-stop');
        this.textContent = this.classList.contains('active-stop') ? '✅ Arrived at Stop 1' : '🟡 Arrived at Stop 1';
        alert('Stop 1 status updated!');
    });
    document.getElementById('stop2').addEventListener('click', function() {
        this.classList.toggle('active-stop');
        this.textContent = this.classList.contains('active-stop') ? '✅ Departed Stop 1' : '🟡 Departed Stop 1';
        alert('Stop 2 status updated!');
    });
    document.getElementById('stop3').addEventListener('click', function() {
        this.classList.toggle('active-stop');
        this.textContent = this.classList.contains('active-stop') ? '✅ Arrived at Stop 2' : '🟡 Arrived at Stop 2';
        alert('Stop 3 status updated!');
    });

    document.getElementById('submitFeedback').addEventListener('click', () => {
        alert('Feedback submitted! (Note: In a real app, this would send data to the server.)');
        // Clear fields after submission
        noteField.value = '';
        document.getElementById('photoUpload').value = '';
        document.getElementById('delayReason').value = '';
        autosaveMsg.style.display = 'none';
    });

    // --- Modals Functionality ---

    // Global function to open any modal
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = 'flex'; // Use flex to center
    };

    // Global function to close any modal
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
    };

    // Close modal when clicking outside of modal-content
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Itinerary Modal (Instructions Section)
    const itineraryData = {
        itinerary: [
            "Meet guests at hotel lobby at 08:45 AM.",
            "Depart for National Museum at 09:00 AM.",
            "Explore Museum (1.5 hours).",
            "Lunch at local restaurant (12:00 PM).",
            "Visit local market for souvenirs (1.5 hours).",
            "Return to hotel by 04:00 PM."
        ],
        backup: [
            "In case of rain, visit Railway Museum instead of market.",
            "If National Museum is closed, visit Snake Park."
        ],
        emergency: [
            "Contact emergency services: 999",
            "Contact tour operator support: +254 7XX XXX XXX",
            "Nearest hospital: Nairobi Hospital"
        ],
        logistical: {
            pickup: "Hotel Lobby, Main Street",
            transportation: "Minibus (License Plate: KAA 123B)",
            equipment: "Walkie-talkie, First-aid kit"
        }
    };

    function renderItineraryView() {
        let html = '<h4>Current Itinerary</h4>';
        itineraryData.itinerary.forEach(item => {
            html += `<p>${item}</p>`;
        });

        html += '<h4>Backup Plans</h4>';
        itineraryData.backup.forEach(item => {
            html += `<p>${item}</p>`;
        });

        html += '<h4>Logistical Details</h4>';
        html += `<p><strong>Pickup:</strong> ${itineraryData.logistical.pickup}</p>`;
        html += `<p><strong>Transportation:</strong> ${itineraryData.logistical.transportation}</p>`;
        html += `<p><strong>Equipment:</strong> ${itineraryData.logistical.equipment}</p>`;

        html += '<h4>Emergency Procedures</h4>';
        itineraryData.emergency.forEach(item => {
            html += `<p>${item}</p>`;
        });
        viewMode.innerHTML = html;
    }

    function renderItineraryEditForm() {
        // Itinerary Items
        itineraryItemsDiv.innerHTML = '';
        itineraryData.itinerary.forEach((item, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `itinerary-${index}`;
            input.value = item;
            itineraryItemsDiv.appendChild(input);
        });
        // Add a button to add new itinerary items
        const addItineraryBtn = document.createElement('button');
        addItineraryBtn.type = 'button';
        addItineraryBtn.textContent = 'Add Itinerary Item';
        addItineraryBtn.onclick = () => {
            const newItemInput = document.createElement('input');
            newItemInput.type = 'text';
            newItemInput.name = `itinerary-new-${Date.now()}`; // Unique name
            newItemInput.placeholder = 'New itinerary item';
            itineraryItemsDiv.appendChild(newItemInput);
        };
        itineraryItemsDiv.appendChild(addItineraryBtn);

        // Backup Items
        backupItemsDiv.innerHTML = '';
        itineraryData.backup.forEach((item, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `backup-${index}`;
            input.value = item;
            backupItemsDiv.appendChild(input);
        });
         const addBackupBtn = document.createElement('button');
        addBackupBtn.type = 'button';
        addBackupBtn.textContent = 'Add Backup Item';
        addBackupBtn.onclick = () => {
            const newItemInput = document.createElement('input');
            newItemInput.type = 'text';
            newItemInput.name = `backup-new-${Date.now()}`;
            newItemInput.placeholder = 'New backup item';
            backupItemsDiv.appendChild(newItemInput);
        };
        backupItemsDiv.appendChild(addBackupBtn);

        // Emergency Items
        emergencyItemsDiv.innerHTML = '';
        itineraryData.emergency.forEach((item, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `emergency-${index}`;
            input.value = item;
            emergencyItemsDiv.appendChild(input);
        });
         const addEmergencyBtn = document.createElement('button');
        addEmergencyBtn.type = 'button';
        addEmergencyBtn.textContent = 'Add Emergency Item';
        addEmergencyBtn.onclick = () => {
            const newItemInput = document.createElement('input');
            newItemInput.type = 'text';
            newItemInput.name = `emergency-new-${Date.now()}`;
            newItemInput.placeholder = 'New emergency item';
            emergencyItemsDiv.appendChild(newItemInput);
        };
        emergencyItemsDiv.appendChild(addEmergencyBtn);

        // Logistical Details
        editMode.querySelector('[name="pickup"]').value = itineraryData.logistical.pickup;
        editMode.querySelector('[name="transportation"]').value = itineraryData.logistical.transportation;
        editMode.querySelector('[name="equipment"]').value = itineraryData.logistical.equipment;
    }

    window.openEditMode = function() {
        viewMode.classList.add('hidden');
        document.getElementById('viewFooter').classList.add('hidden');
        editMode.classList.remove('hidden');
        renderItineraryEditForm(); // Populate form fields
    };

    window.cancelEdit = function() {
        editMode.classList.add('hidden');
        viewMode.classList.remove('hidden');
        document.getElementById('viewFooter').classList.remove('hidden');
    };

    window.saveEdits = function() {
        const form = document.getElementById('editForm');
        const formData = new FormData(form);

        // Clear existing data before populating with new
        itineraryData.itinerary = [];
        itineraryData.backup = [];
        itineraryData.emergency = [];

        for (let pair of formData.entries()) {
            const [name, value] = pair;
            if (value.trim() === '') continue; // Skip empty fields

            if (name.startsWith('itinerary-')) {
                itineraryData.itinerary.push(value);
            } else if (name.startsWith('backup-')) {
                itineraryData.backup.push(value);
            } else if (name.startsWith('emergency-')) {
                itineraryData.emergency.push(value);
            } else if (name in itineraryData.logistical) {
                itineraryData.logistical[name] = value;
            }
        }
        alert('Itinerary and instructions saved!');
        renderItineraryView(); // Re-render view with new data
        cancelEdit(); // Go back to view mode
    };

    checkItineraryBtn.addEventListener('click', () => {
        renderItineraryView();
        openModal('itineraryModal');
    });

    // Report Modals (Placeholder functions)
    window.submitTourReport = function() {
        const form = document.getElementById('tourReportForm');
        const formData = new FormData(form);
        console.log('Tour Report Submitted:', Object.fromEntries(formData.entries()));
        alert('Tour Report Submitted Successfully!');
        closeModal('tourReportModal');
        form.reset();
    };

    window.uploadFeedback = function() {
        const form = document.getElementById('feedbackForm');
        const files = form.querySelector('input[type="file"]').files;
        if (files.length > 0) {
            console.log('Uploading feedback files:', files);
            alert(`${files.length} feedback file(s) uploaded!`);
            closeModal('feedbackModal');
            form.reset();
        } else {
            alert('Please select files to upload.');
        }
    };

    window.submitIncidentReport = function() {
        const form = document.getElementById('incidentReportForm');
        const formData = new FormData(form);
        console.log('Incident Report Submitted:', Object.fromEntries(formData.entries()));
        alert('Incident Report Submitted Successfully!');
        closeModal('incidentReportModal');
        form.reset();
    };

    window.generateMediaGallery = function() {
        const form = document.getElementById('mediaGalleryForm');
        const galleryName = form.querySelector('[name="galleryName"]').value;
        const files = form.querySelector('[name="mediaFiles"]').files;
        const galleryPreview = document.getElementById('galleryPreview');

        if (files.length > 0) {
            let previewHtml = `<h3>Gallery: ${galleryName}</h3><div style="display:flex; flex-wrap:wrap; gap:10px;">`;
            Array.from(files).forEach(file => {
                const fileURL = URL.createObjectURL(file);
                if (file.type.startsWith('image/')) {
                    previewHtml += `<img src="${fileURL}" alt="${file.name}" style="width:100px; height:100px; object-fit:cover; border-radius:5px;">`;
                } else if (file.type.startsWith('video/')) {
                    previewHtml += `<video src="${fileURL}" controls style="width:100px; height:100px; object-fit:cover; border-radius:5px;"></video>`;
                }
            });
            previewHtml += '</div>';
            galleryPreview.innerHTML = previewHtml;
            alert('Media Gallery Generated! (Preview below)');
            // In a real application, you'd upload these files and link to the generated gallery
        } else {
            alert('Please select media files to generate a gallery.');
        }
    };
});
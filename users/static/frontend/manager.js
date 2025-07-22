let bookings = [
            { id: 'BK001', customer: 'John Smith', tour: 'Diani Beach Paradise' , date: '2025-08-15', status: 'pending' },
            { id: 'BK002', customer: 'Sarah Johnson', tour: 'Mount Kenya Climbing Expedition ', date: '2025-08-20', status: 'approved' },
            { id: 'BK003', customer: 'Mike Wilson', tour: 'Maasai Village Cultural Experience', date: '2025-08-25', status: 'approved' },
            { id: 'BK004', customer: 'Emma Davis', tour: 'Tsavo East & West Safari', date: '2025-08-30', status: 'pending' }
        ];

        let tours = [
            { id: 'TR001', name: 'Diani Beach Paradise', category: 'Beach & Coastal', price: 250, duration: '2 days', availability: 'available' },
            { id: 'TR002', name: 'Mount Kenya Climbing Expedition ', category: 'Mountain Hiking', price: 450, duration: '4 days', availability: 'available' },
            { id: 'TR003', name: 'Maasai Village Cultural Experience', category: 'Cultural Tours', price: 180, duration: '1 day', availability: 'available' },
            { id: 'TR004', name: 'Tsavo East & West Safari', category: 'Wildlife Experience', price: 380, duration: '3 days', availability: 'available' },
            { id: 'TR005', name: 'Lamu Island Cultural Retreat', category: 'Beach & Coastal', price: 320, duration: '3 days', availability: 'available' },
            { id: 'TR006', name: 'Aberdare National Park Wildlife Safari', category: 'Mountain Hiking', price: 290, duration: '2 days', availability: 'available' }
        ];

        let payments = [
            { id: 'PAY001', booking: 'BK001', customer: 'John Smith', amount: 250, status: 'pending' },
            { id: 'PAY002', booking: 'BK002', customer: 'Sarah Johnson', amount: 450, status: 'paid' },
            { id: 'PAY003', booking: 'BK003', customer: 'Mike Wilson', amount: 180, status: 'paid' },
            { id: 'PAY004', booking: 'BK004', customer: 'Emma Davis', amount: 380, status: 'pending' }
        ];

        let assignments = [
            { id: 'AS001', tour: 'Diani Beach Paradise', guide: 'Mike Johnson', transport: 'Beach Bus #1', date: '2025-08-15' },
            { id: 'AS002', tour: 'Mount Kenya Climbing Expedition', guide: 'Sarah Wilson', transport: '4WD Vehicle #2', date: '2025-08-20' },
            { id: 'AS003', tour: 'Maasai Village Cultural Experience', guide: 'David Brown', transport: 'Safari Vehicle #1', date: '2025-08-25' },
            { id: 'AS004', tour: 'Tsavo East & West Safari', guide: 'Lisa Anderson', transport: 'Safari Vehicle #3', date: '2025-08-30' }
        ];

        // Tab switching functionality
        function showTab(tabName) {
            const tabs = document.querySelectorAll('.tab-content');
            const navTabs = document.querySelectorAll('.nav-tab');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            navTabs.forEach(tab => tab.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
            
            // Update tables when switching tabs
            if (tabName === 'bookings') updateBookingsTable();
            if (tabName === 'tours') updateToursTable();
            if (tabName === 'payments') updatePaymentsTable();
            if (tabName === 'assignments') updateAssignmentsTable();
        }

        // Booking management functions
        function approveBooking(bookingId) {
            const booking = bookings.find(b => b.id === bookingId);
            if (booking) {
                booking.status = 'approved';
                showAlert('Booking approved successfully!', 'success');
                updateBookingsTable();
                updateDashboard();
            }
        }

        function rejectBooking(bookingId) {
            const booking = bookings.find(b => b.id === bookingId);
            if (booking) {
                booking.status = 'rejected';
                showAlert('Booking rejected successfully!', 'success');
                updateBookingsTable();
                updateDashboard();
            }
        }

        function editBooking(bookingId) {
            showAlert('Edit booking functionality would open a modal here', 'success');
        }

        function cancelBooking(bookingId) {
            if (confirm('Are you sure you want to cancel this booking?')) {
                const index = bookings.findIndex(b => b.id === bookingId);
                if (index > -1) {
                    bookings.splice(index, 1);
                    showAlert('Booking cancelled successfully!', 'success');
                    updateBookingsTable();
                    updateDashboard();
                }
            }
        }

        // Tour management functions
        function showAddTourModal() {
            document.getElementById('tourModal').style.display = 'block';
            document.getElementById('tourForm').reset();
        }

        function closeTourModal() {
            document.getElementById('tourModal').style.display = 'none';
        }

        function editTour(tourId) {
            const tour = tours.find(t => t.id === tourId);
            if (tour) {
                document.getElementById('tourName').value = tour.name;
                document.getElementById('tourPrice').value = tour.price;
                document.getElementById('tourDuration').value = tour.duration;
                document.getElementById('tourAvailability').value = tour.availability;
                showAddTourModal();
            }
        }

        function deleteTour(tourId) {
            if (confirm('Are you sure you want to delete this tour?')) {
                const index = tours.findIndex(t => t.id === tourId);
                if (index > -1) {
                    tours.splice(index, 1);
                    showAlert('Tour deleted successfully!', 'success');
                    updateToursTable();
                }
            }
        }

        // Payment management functions
        function processPayment(paymentId) {
            const payment = payments.find(p => p.id === paymentId);
            if (payment) {
                payment.status = 'paid';
                showAlert('Payment processed successfully!', 'success');
                updatePaymentsTable();
                updateDashboard();
            }
        }

        function refundPayment(paymentId) {
            if (confirm('Are you sure you want to refund this payment?')) {
                const payment = payments.find(p => p.id === paymentId);
                if (payment) {
                    payment.status = 'refunded';
                    showAlert('Payment refunded successfully!', 'success');
                    updatePaymentsTable();
                    updateDashboard();
                }
            }
        }

        function issueRefund(paymentId) {
            if (confirm('Are you sure you want to issue a refund?')) {
                const payment = payments.find(p => p.id === paymentId);
                if (payment) {
                    payment.status = 'refunded';
                    showAlert('Refund issued successfully!', 'success');
                    updatePaymentsTable();
                    updateDashboard();
                }
            }
        }

        function resolvePayment(paymentId) {
            showAlert('Payment dispute resolution panel would open here', 'success');
        }

        // Assignment management functions
        function showAssignmentModal() {
            document.getElementById('assignmentModal').style.display = 'block';
            document.getElementById('assignmentForm').reset();
        }

        function closeAssignmentModal() {
            document.getElementById('assignmentModal').style.display = 'none';
        }

        function editAssignment(assignmentId) {
            showAlert('Edit assignment functionality would open a modal here', 'success');
        }

        function deleteAssignment(assignmentId) {
            if (confirm('Are you sure you want to delete this assignment?')) {
                const index = assignments.findIndex(a => a.id === assignmentId);
                if (index > -1) {
                    assignments.splice(index, 1);
                    showAlert('Assignment deleted successfully!', 'success');
                    updateAssignmentsTable();
                }
            }
        }

        // Report generation functions
        function generateReport(type) {
            showAlert(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`, 'success');
        }

        function generateCustomReport() {
            const startDate = document.getElementById('reportStartDate').value;
            const endDate = document.getElementById('reportEndDate').value;
            
            if (!startDate || !endDate) {
                showAlert('Please select both start and end dates', 'danger');
                return;
            }
            
            showAlert('Custom report generated successfully!', 'success');
        }

        // Utility functions
        function showAlert(message, type) {
            const alertContainer = document.getElementById('alertContainer');
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.textContent = message;
            alert.style.position = 'fixed';
            alert.style.top = '20px';
            alert.style.right = '20px';
            alert.style.zIndex = '9999';
            alert.style.minWidth = '300px';
            alert.style.animation = 'slideIn 0.3s ease-out';
            
            alertContainer.appendChild(alert);
            
            setTimeout(() => {
                alert.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    alertContainer.removeChild(alert);
                }, 300);
            }, 3000);
        }

        // Table update functions
        function updateBookingsTable() {
            const tbody = document.getElementById('bookingsTable');
            tbody.innerHTML = '';
            
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                const statusClass = `status-${booking.status}`;
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.customer}</td>
                    <td>${booking.tour}</td>
                    <td>${booking.date}</td>
                    <td><span class="status-badge ${statusClass}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
                    <td>
                        ${booking.status === 'pending' ? 
                            `<button class="btn btn-success" onclick="approveBooking('${booking.id}')">Approve</button>
                             <button class="btn btn-danger" onclick="rejectBooking('${booking.id}')">Reject</button>` :
                            `<button class="btn btn-primary" onclick="editBooking('${booking.id}')">Edit</button>
                             <button class="btn btn-danger" onclick="cancelBooking('${booking.id}')">Cancel</button>`
                        }
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function updateToursTable() {
            const tbody = document.getElementById('toursTable');
            tbody.innerHTML = '';
            
            tours.forEach(tour => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${tour.id}</td>
                    <td>${tour.name}</td>
                    <td>${tour.price}</td>
                    <td>${tour.duration}</td>
                    <td>${tour.availability.charAt(0).toUpperCase() + tour.availability.slice(1)}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editTour('${tour.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTour('${tour.id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function updatePaymentsTable() {
            const tbody = document.getElementById('paymentsTable');
            tbody.innerHTML = '';
            
            payments.forEach(payment => {
                const row = document.createElement('tr');
                const statusClass = `status-${payment.status}`;
                row.innerHTML = `
                    <td>${payment.id}</td>
                    <td>${payment.booking}</td>
                    <td>${payment.customer}</td>
                    <td>${payment.amount}</td>
                    <td><span class="status-badge ${statusClass}">${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span></td>
                    <td>
                        ${payment.status === 'pending' ? 
                            `<button class="btn btn-success" onclick="processPayment('${payment.id}')">Process</button>
                             <button class="btn btn-danger" onclick="refundPayment('${payment.id}')">Refund</button>` :
                            `<button class="btn btn-warning" onclick="issueRefund('${payment.id}')">Issue Refund</button>`
                        }
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function updateAssignmentsTable() {
            const tbody = document.getElementById('assignmentsTable');
            tbody.innerHTML = '';
            
            assignments.forEach(assignment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${assignment.id}</td>
                    <td>${assignment.tour}</td>
                    <td>${assignment.guide}</td>
                    <td>${assignment.transport}</td>
                    <td>${assignment.date}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editAssignment('${assignment.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteAssignment('${assignment.id}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function updateDashboard() {
            document.getElementById('totalBookings').textContent = bookings.length;
            document.getElementById('pendingApprovals').textContent = bookings.filter(b => b.status === 'pending').length;
            
            const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
            document.getElementById('totalRevenue').textContent = `${totalRevenue.toLocaleString()}`;
            
            document.getElementById('activeGuides').textContent = assignments.length;
        }

        // Form submission handlers
        document.getElementById('tourForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const tourData = {
                id: 'TR' + String(tours.length + 1).padStart(3, '0'),
                name: document.getElementById('tourName').value,
                price: parseInt(document.getElementById('tourPrice').value),
                duration: document.getElementById('tourDuration').value,
                availability: document.getElementById('tourAvailability').value
            };
            
            tours.push(tourData);
            showAlert('Tour added successfully!', 'success');
            updateToursTable();
            closeTourModal();
        });

        document.getElementById('assignmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const assignmentData = {
                id: 'AS' + String(assignments.length + 1).padStart(3, '0'),
                tour: document.getElementById('assignmentTour').options[document.getElementById('assignmentTour').selectedIndex].text,
                guide: document.getElementById('assignmentGuide').value,
                transport: document.getElementById('assignmentTransport').value,
                date: document.getElementById('assignmentDate').value
            };
            
            assignments.push(assignmentData);
            showAlert('Assignment created successfully!', 'success');
            updateAssignmentsTable();
            closeAssignmentModal();
        });

        // Initialize charts (simple canvas drawing for demonstration)
        function initializeCharts() {
            const revenueCanvas = document.getElementById('revenueChart');
            const bookingCanvas = document.getElementById('bookingChart');
            
            if (revenueCanvas && bookingCanvas) {
                const revenueCtx = revenueCanvas.getContext('2d');
                const bookingCtx = bookingCanvas.getContext('2d');
                
                // Simple revenue chart
                revenueCtx.fillStyle = '#667eea';
                revenueCtx.fillRect(50, 50, 100, 120);
                revenueCtx.fillRect(200, 70, 100, 100);
                revenueCtx.fillRect(350, 30, 100, 140);
                
                revenueCtx.fillStyle = '#333';
                revenueCtx.font = '14px Arial';
                revenueCtx.fillText('Jan', 75, 185);
                revenueCtx.fillText('Feb', 225, 185);
                revenueCtx.fillText('Mar', 375, 185);
                
                // Simple booking chart
                bookingCtx.fillStyle = '#764ba2';
                bookingCtx.fillRect(50, 80, 80, 90);
                bookingCtx.fillRect(180, 60, 80, 110);
                bookingCtx.fillRect(310, 40, 80, 130);
                
                bookingCtx.fillStyle = '#333';
                bookingCtx.font = '14px Arial';
                bookingCtx.fillText('Week 1', 60, 185);
                bookingCtx.fillText('Week 2', 190, 185);
                bookingCtx.fillText('Week 3', 320, 185);
            }
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            const tourModal = document.getElementById('tourModal');
            const assignmentModal = document.getElementById('assignmentModal');
            
            if (event.target === tourModal) {
                closeTourModal();
            }
            if (event.target === assignmentModal) {
                closeAssignmentModal();
            }
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            updateDashboard();
            updateBookingsTable();
            updateToursTable();
            updatePaymentsTable();
            updateAssignmentsTable();
            initializeCharts();
        });

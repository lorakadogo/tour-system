document.addEventListener('DOMContentLoaded', () => {
    //
    // 1. Navigation Helpers
    //
    function navigateTo(pageId) {
      // Hide all pages
      document.querySelectorAll('.page')
              .forEach(p => p.classList.remove('active'));

      // Show target page
      const target = document.getElementById(pageId);
      if (target) target.classList.add('active');

      // Update nav-item active state
      document.querySelectorAll('.nav-item')
              .forEach(item => {
                item.classList.toggle(
                  'active',
                  item.dataset.page === pageId
                );
              });
    }

    // Expose showtours() for your inline onclick
    window.showtours = () => navigateTo('tourspage');

    // Attach nav-item clicks
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navigateTo(item.dataset.page);
      });
    });

    // “Explore Tours” button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        navigateTo('tourspage');
      });
    }

    //
    // 2. Contact Form
    //
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name    = contactForm.name.value;
        const email   = contactForm.email.value;
        const subject = contactForm.subject.value;
        const message = contactForm.message.value;

        console.log({ name, email, subject, message });
        alert(`Thanks ${name}! Your message has been sent.`);
        contactForm.reset();
      });
    }

    //
    // 3. Tours Data & State
const allTours = [
    {
        id: 1,
        title: "Maasai Mara Safari Adventure",
        description: "Experience the Great Migration and witness the Big Five in Kenya's most famous game reserve.",
        location: "Maasai Mara",
        duration: "4 days",
        price: 450,
        availableDate: "2025-08-15",
        maxCapacity: 12,
        bookedSlots: 0, // Added to track booked slots
        category: "safari adventures", // Corrected case for consistency
        
    },
    {
        id: 2,
        title: "Diani Beach Paradise",
        description: "Relax on pristine white sandy beaches and enjoy water sports in the Indian Ocean.",
        location: "Diani Beach",
        duration: "3 days",
        price: 280,
        availableDate: "2025-07-20",
        maxCapacity: 20,
        bookedSlots: 0, // Added to track booked slots
        category: "beach & coastal", // Corrected case for consistency
        
    },
    {
        id: 3,
        title: "Mount Kenya Climbing Expedition",
        description: "Challenge yourself with a climb to Point Lenana, Africa's second highest peak.",
        location: "Mount Kenya",
        duration: "5 days",
        price: 650,
        availableDate: "2025-09-10",
        maxCapacity: 8,
         bookedSlots: 0,
        category: "mountain hiking", // Corrected case for consistency
       
    },
    {
        id: 4,
        title: "Nairobi Cultural Heritage Tour",
        description: "Explore Kenya's capital city, visit museums, markets, and experience local culture.",
        location: "Nairobi",
        duration: "2 days",
        price: 150,
        availableDate: "2025-07-25",
        maxCapacity: 25,
         bookedSlots: 0,
        category: "cultural tours", // Corrected case for consistency
       
    },
    {
        id: 5,
        title: "Samburu Wildlife Experience",
        description: "Discover unique wildlife species in the semi-arid landscapes of Samburu.",
        location: "Samburu",
        duration: "3 days",
        price: 380,
        availableDate: "2025-08-05",
        maxCapacity: 15,
        bookedSlots: 0,
        category: "wildlife experience", // Corrected case for consistency
       
    },
    {
        id: 6,
        title: "Amboseli National Park Safari",
        description: "Get up close with elephants against the backdrop of Mount Kilimanjaro.",
        location: "Amboseli",
        duration: "3 days",
        price: 420,
        availableDate: "2025-08-20",
        maxCapacity: 18,
         bookedSlots: 0,
        category: "safari adventures", // Corrected case for consistency
       
    },
    {
        id: 7,
        title: "Malindi Historical Sites",
        description: "Explore ancient Swahili culture and Portuguese colonial history on the coast.",
        location: "Malindi",
        duration: "2 days",
        price: 200,
        availableDate: "2025-07-30",
        maxCapacity: 22,
         bookedSlots: 0,
        category: "cultural tours", // Corrected case for consistency
       
    },
    {
        id: 8,
        title: "Lake Nakuru Flamingo & Rhino Safari",
        description: "A scenic safari in Lake Nakuru National Park, known for its large flocks of flamingos, endangered rhinos, and diverse bird species.",
        location: "Lake Nakuru National Park Rift Valley",
        duration: "1 day",
        price: 150,
        availableDate: "2025-08-01",
        maxCapacity: 30,
         bookedSlots: 0,
        category: "wildlife experience", // Corrected case for consistency
       
    },
    {
        id: 9,
        title: "Tsavo East & West Safari",
        description: "Explore the vast savannahs of Tsavo, home to large herds of elephants and diverse wildlife.",
        location: "Tsavo National Park",
        duration: "5 days",
        price: 600,
        availableDate: "2025-09-20",
        maxCapacity: 15,
         bookedSlots: 0,
        category: "safari adventures", // Corrected case for consistency
       
    },
    {
        id: 10,
        title: "Lamu Island Cultural Retreat",
        description: "Experience the rich Swahili culture, architecture, and serene beaches of Lamu Island.",
        location: "Lamu Island",
        duration: "4 days",
        price: 400,
        availableDate: "2025-08-25",
        maxCapacity: 20,
        bookedSlots: 0,
        category: "cultural tours", // Corrected case for consistency
        
    },
    {
        id: 11,
        title: "Naivasha and Hell's Gate National Park Adventure",
        description: "Enjoy boat rides, cycling, and hiking in Hell’s Gate’s dramatic gorges, plus a visit to geothermal spas.",
        location: "Naivasha",
        duration: "3 days",
        price: 300,
        availableDate: "2025-07-15",
        maxCapacity: 25,
        bookedSlots: 0,
        category: "safari adventures", // Corrected case for consistency
        
    },
    {
        id: 12,
        title: "Aberdare National Park Wildlife Safari",
        description: "Explore the lush forests and diverse wildlife of Aberdare National Park, including elephants, leopards, and rare birds.",
        location: "Aberdare National Park, central Kenya",
        duration: "3 days",
        price: 350,
        availableDate: "2025-08-10",
        maxCapacity: 15,
           bookedSlots: 0,
        category: "safari adventures", // Corrected case for consistency
       
    },
    {
        id: 13,
        title: "Laikipia Conservancy Safari",
        description: "Private safari experiences including rhino tracking, horseback riding, and luxury camping.",
        location: "Laikipia Plateau, Central Kenya",
        duration: "2 days",
        price: 400,
        availableDate: "2025-07-05",
        maxCapacity: 15,
          bookedSlots: 0,
        category: "safari adventures", // Corrected case for consistency
       
    },
    {
        id: 14,
        title: "Watamu Marine National Park Snorkeling",
        description: "Explore vibrant coral reefs and marine life in one of Kenya's most beautiful coastal parks.",
        location: "Watamu",
        duration: "1 day",
        price: 120,
        availableDate: "2025-08-30",
        maxCapacity: 30,
        bookedSlots: 0,
        category: "beach & coastal", // Corrected case for consistency
      
    },
    {
        id: 15,
        title: "Kakamega Rainforest Bird Watching",
        description: "Discover over 300 bird species in Kenya's only tropical rainforest.",
        location: "Kakamega Forest",
        duration: "2 days",
        price: 250,
        availableDate: "2025-07-10",
        maxCapacity: 20,
        bookedSlots: 0,
        category: "wildlife experience", // Corrected case for consistency
       
    },
    {
        id: 16,
        title: "Kisumu City and Lake Victoria Tour",
        description: "Explore the vibrant city of Kisumu and enjoy boat rides on Lake Victoria, Africa's largest lake.",
        location: "Kisumu",
        duration: "2 days",
        price: 180,
        availableDate: "2025-08-05",
        maxCapacity: 20,
        bookedSlots: 0,
        category: "cultural tours", // Corrected case and trimmed space
       
    },
    {
        id: 17,
        title: "Mount Elgon Hiking Expedition",
        description: "Hike through the scenic trails of Mount Elgon, known for its unique caldera and diverse flora.",
        location: "Mount Elgon",
        duration: "4 days",
        price: 500,
        availableDate: "2025-09-05",
        maxCapacity: 10,
        bookedSlots: 0,
        category: "mountain hiking", // Corrected case for consistency
     
    },
    {
        id: 18,
        title: "Chalbi Desert & Lake Turkana Explorer",
        description: "A remote desert safari with cultural experiences and a tour of the world’s largest desert lake.",
        location: "Marsabit & Turkana Counties, Northern Kenya",
        duration: "6 days",
        price: 800,
        availableDate: "2025-10-01",
        maxCapacity: 10,
        bookedSlots: 0,
        category: "safari adventures", // Corrected case and trimmed space
      
    },
    {
        id: 19,
        title: "Maasai village Cultural Experience",
        description: "Immerse yourself in the Maasai culture with traditional dances, crafts, and community visits.",
        location: "Maasai Mara, Kenya,Amboseli",
        duration: "2 days",
        price: 200,
        availableDate: "2025-08-15",
        maxCapacity: 15,
        bookedSlots: 0,
        category: "cultural tours", // Corrected case for consistency
        
    },
    {
        id: 20,
        title: "Maasai Market Shopping Tour",
        description: "Experience the vibrant Maasai markets, shop for traditional crafts, jewelry, and textiles.",
        location: "nexgen mall, waterfront mall,,sarit center, junction mall, village market, yaya center",
        duration: "3 days",
        price: 100,
        availableDate: "2025-07-20",
        maxCapacity: 15,
        bookedSlots: 0,
        category: "cultural tours", // Corrected case
    },

];
let selectedCategory = 'all';
    let selectedPrice    = 'all';

    //
    // 4. DOM References for Tours Page
    //
    const searchInput    = document.getElementById('searchInput');
    const searchButton   = document.getElementById('searchButton');
    const toursGrid      = document.getElementById('toursGrid');
    const bookingModal   = document.getElementById('bookingModal');
    const closeModalBtn  = document.getElementById('closeModal');
    const modalTourName  = document.getElementById('modalTourName');
    const selectedTourId = document.getElementById('selectedTourId');
    const bookingForm    = document.getElementById('bookingForm');

    //
    // 5. Rendering & Filtering
    //
    function renderTours(list) {
      if (!list.length) {
        toursGrid.innerHTML = '<p>No tours match your criteria.</p>';
        return;
      }

      toursGrid.innerHTML = list.map(t => `
        <div class="tour-card">
          <h3>${t.title}</h3>
      <p class="tour-desc">${t.description}</p>
      <ul class="tour-meta">
        <li><strong>Location:</strong> ${t.location}</li>
        <li><strong>Duration:</strong> ${t.duration}</li>
        <li><strong>Available from:</strong> ${t.availableDate}</li>
        <li><strong>Seats left:</strong> ${t.maxCapacity - t.bookedSlots} of ${t.maxCapacity}</li>
        <li><strong>Price:</strong> $${t.price}</li>
      </ul>
      <button class="book-now-btn" data-id="${t.id}">Book Now</button>
    </div>    
      `).join('');
    }

    function matchesPrice(price, range) {
      if (range === 'all') return true;
      if (range === '1000+') return price >= 1000;
      const [min, max] = range.split('-').map(Number);
      return price >= min && price <= max;
    }

    function filterAndRenderTours() {
      const term = searchInput.value.trim().toLowerCase();
      const filtered = allTours.filter(t => {
        const byCat   = selectedCategory === 'all' || t.category === selectedCategory;
        const byPrice = matchesPrice(t.price, selectedPrice);
        const byText  = !term
                      || t.title.toLowerCase().includes(term)
                      || t.location.toLowerCase().includes(term);
        return byCat && byPrice && byText;
      });
      renderTours(filtered);
    }

    //
    // 6. Filter Controls
    //
    window.toggleFilter = filterName => {
      const content = document.getElementById(`${filterName}Content`);
      const icon    = document.getElementById(`${filterName}Icon`);
      content.classList.toggle('active');
      icon.textContent = content.classList.contains('active') ? '▲' : '▼';
    };

    window.filterByCategory = (cat, evt) => {
      selectedCategory = cat;
      document.querySelectorAll('.category-item')
              .forEach(b => b.classList.remove('selected'));
      evt.target.classList.add('selected');
      filterAndRenderTours();
    };

    window.filterByPrice = (range, evt) => {
      selectedPrice = range;
      document.querySelectorAll('.price-item')
              .forEach(b => b.classList.remove('selected'));
      evt.target.classList.add('selected');
      filterAndRenderTours();
    };

    // Wire up search
    if (searchButton && searchInput) {
      searchButton.addEventListener('click', filterAndRenderTours);
      searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') filterAndRenderTours();
      });
    }

    //
    // 7. Booking Modal Logic
    //
    function openBookingModal(id) {
      const tour = allTours.find(t => t.id == id);
      if (!tour) return;
      modalTourName.textContent = `${tour.title} — ${tour.location}`;
      selectedTourId.value      = tour.id;
      bookingModal.classList.remove('hidden');
    }

    function closeModal() {
      bookingModal.classList.add('hidden');
      bookingForm.reset();
    }

    function handleBookingSubmit(evt) {
      evt.preventDefault();
      const payload = {
        tourId:    selectedTourId.value,
        name:      bookingForm.userName.value,
        email:     bookingForm.userEmail.value,
        startDate: bookingForm.startDate.value
      };
      console.log('Booking:', payload);
      alert(`Thanks ${payload.name}, your booking request has been sent!`);
      closeModal();
    }

    // Delegate Book Now clicks
    toursGrid.addEventListener('click', e => {
      if (e.target.matches('.book-now-btn')) {
        openBookingModal(e.target.dataset.id);
      }
    });

    // Modal controls
    closeModalBtn.addEventListener('click', closeModal);
    bookingForm.addEventListener('submit', handleBookingSubmit);

    //
    // 8. Initial Render
    //
    renderTours(allTours);
  });

// Course data
const courses = [
    {
        title: "Web Development",
        image: "assets/images/web design.jpg",
        level: "Beginner",
        duration: "12 weeks",
        description: "Master HTML, CSS, and JavaScript to build modern websites.",
        price: 49.99,
        rating: 4.8,
        students: 1234
    },
    {
        title: "Python Programming",
        image: "assets/images/python.webp",
        level: "Intermediate",
        duration: "10 weeks",
        description: "Learn Python programming from basics to advanced concepts.",
        price: 59.99,
        rating: 4.9,
        students: 2341
    },
    {
        title: "React.js Development",
        image: "assets/images/react js.png",
        level: "Advanced",
        duration: "8 weeks",
        description: "Build modern web applications with React.js.",
        price: 69.99,
        rating: 4.7,
        students: 1567
    },
    {
        title: "UI/UX Design",
        image: "assets/images/ui design.avif",
        level: "Beginner",
        duration: "6 weeks",
        description: "Learn to create beautiful and user-friendly interfaces.",
        price: 44.99,
        rating: 4.8,
        students: 987
    },
    {
        title: "Java Programming",
        image: "assets/images/java.jpg",
        level: "Intermediate",
        duration: "14 weeks",
        description: "Master Java programming and object-oriented concepts.",
        price: 54.99,
        rating: 4.6,
        students: 1789
    },
    {
        title: "PHP & MySQL",
        image: "assets/images/php.avif",
        level: "Intermediate",
        duration: "10 weeks",
        description: "Build dynamic websites with PHP and MySQL.",
        price: 49.99,
        rating: 4.7,
        students: 1432
    }
];

// Create course card
function createCourseCard(course) {
    return `
        <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden group card-hover">
            <!-- Course Image -->
            <div class="relative">
                <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="px-6 py-2 bg-primary text-white rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Preview Course
                    </button>
                </div>
            </div>
            
            <!-- Course Content -->
            <div class="p-6">
                <!-- Level and Duration -->
                <div class="flex items-center justify-between mb-4">
                    <span class="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 rounded-full text-sm">
                        ${course.level}
                    </span>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">
                        ${course.duration}
                    </span>
                </div>
                
                <!-- Title and Description -->
                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    ${course.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    ${course.description}
                </p>
                
                <!-- Stats -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="flex text-yellow-400">
                            ${"★".repeat(Math.floor(course.rating))}
                            ${course.rating % 1 !== 0 ? "½" : ""}
                        </div>
                        <span class="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                            (${course.rating})
                        </span>
                    </div>
                    <span class="text-gray-600 dark:text-gray-400 text-sm">
                        ${course.students.toLocaleString()} students
                    </span>
                </div>
                
                <!-- Price and Action -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span class="text-2xl font-bold text-primary dark:text-blue-400">
                        $${course.price}
                    </span>
                    <button class="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render courses
function renderCourses() {
    const container = document.getElementById('courseContainer');
    if (container) {
        container.innerHTML = courses.map(course => createCourseCard(course)).join('');
    }
}

// Initialize courses when DOM is loaded
document.addEventListener('DOMContentLoaded', renderCourses);

// Mobile menu handling
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    // Toggle menu visibility
    const isOpen = mobileMenu.classList.toggle('hidden');
    
    // Update menu icon
    if (!isOpen) {
        // Menu is open - show close icon
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        `;
        // Add slide-down animation
        mobileMenu.classList.add('animate-slideDown');
    } else {
        // Menu is closed - show menu icon
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        `;
        mobileMenu.classList.remove('animate-slideDown');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[onclick="toggleMenu()"]');
    
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !menuButton.contains(e.target)) {
        toggleMenu();
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMenu();
        }
    }
}); 
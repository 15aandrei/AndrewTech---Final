
document.addEventListener('DOMContentLoaded', function() {
   
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰ Menu';
    document.querySelector('header').appendChild(mobileMenuToggle);
    
    const nav = document.querySelector('.navigation nav');
    mobileMenuToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

 
    function handleResize() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
            mobileMenuToggle.style.display = 'none';
        } else {
            nav.style.display = 'none';
            mobileMenuToggle.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); 


    const searchInput = document.querySelector('.search input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
               
            }
        }
    });


    const pcCards = document.querySelectorAll('.pc-card');
    pcCards.forEach(card => {
       
        card.addEventListener('click', function(e) {
           
            if (!e.target.classList.contains('btn')) {
                const title = card.querySelector('h3').textContent;
                console.log(`Viewing details for: ${title}`);
              
            }
        });

 
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-outline';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.pc-price').textContent;
            addToCart(title, price);
        });
        
        card.querySelector('.pc-info').appendChild(addToCartBtn);
    });

 
    let cart = [];
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    document.querySelector('.logo').appendChild(cartCount);
    updateCartCount();

    function addToCart(title, price) {
        cart.push({ title, price });
        updateCartCount();
        
       
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${title} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length ? 'block' : 'none';
    }


    const mainImages = document.querySelectorAll('.main-img img');
    mainImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            mainImages.forEach(i => {
                if (i !== img) {
                    i.style.filter = 'brightness(0.5)';
                }
            });
        });

        img.addEventListener('mouseleave', function() {
            mainImages.forEach(i => {
                i.style.filter = 'brightness(0.7)';
            });
        });
    });


    const exploreBtn = document.querySelector('.explore');
    exploreBtn.addEventListener('mouseenter', function() {
        this.innerHTML = 'EXPLORE <span class="arrow">→</span>';
    });

    exploreBtn.addEventListener('mouseleave', function() {
        this.innerHTML = 'EXPLORE';
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    document.querySelector('footer p').innerHTML += ` <span id="year"></span>`;
    document.getElementById('year').textContent = new Date().getFullYear();
});


let block = document.querySelector('.search')
document.addEventListener('mousemove', function(e) {
    let dx = e.pageX - window.innerWidth / 2
    let dy = e.pageY - window.innerHeight / 2
    let angleX = 40 * dx / window.innerWidth / 2
    let angleY = 40 * dy / window.innerHeight / 2
    block.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`
})
// Product Gallery Functionality
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.src.replace('-thumbnail', '');
                mainImage.src = newSrc;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Tab Functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}

// Configuration Price Updates
function initConfigOptions() {
    const configSelects = document.querySelectorAll('.config-options select');
    const basePrice = parseFloat(document.querySelector('.price').textContent.replace('$', '').replace(',', ''));
    const priceElement = document.querySelector('.price');
    
    if (configSelects.length > 0 && priceElement) {
        configSelects.forEach(select => {
            select.addEventListener('change', updatePrice);
        });
        
        function updatePrice() {
            let totalPrice = basePrice;
            
            configSelects.forEach(select => {
                const selectedOption = select.options[select.selectedIndex];
                const priceModifier = selectedOption.getAttribute('data-price') || '0';
                totalPrice += parseFloat(priceModifier);
            });
            
            priceElement.textContent = '$' + totalPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
}

// Initialize all product page functionality
document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initTabs();
    initConfigOptions();
    
    // Existing code...
});
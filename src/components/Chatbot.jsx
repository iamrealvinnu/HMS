// src/components/Chatbot.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRedo, FaLeaf, FaFire } from 'react-icons/fa';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

// Menu items based on images in public/images/
const menuItems = [
  // Thali Specials
  { id: 1, name: "Ooty Special Thali", price: "₹399", rating: 4.9, isVeg: true, isSpicy: false, isBestseller: true, description: "Complete meal with variety of curries, dal, and dessert", category: "Thali Specials", image: "/images/ooty special.jpg" },
  { id: 2, name: "South Indian Thali", price: "₹379", rating: 4.8, isVeg: true, isSpicy: false, isBestseller: false, description: "A traditional South Indian thali with rice, dal, and sides", category: "Thali Specials", image: "/images/south-indian-thali.jpg" },

  // Biryanis
  { id: 3, name: "Nilgiri Biryani", price: "₹299", rating: 4.8, isVeg: true, isSpicy: true, isBestseller: true, description: "Aromatic rice cooked with fresh hill spices and seasonal vegetables", category: "Biryanis", image: "/images/nilgiri biryani.webp" },
  { id: 4, name: "Chicken Biryani", price: "₹349", rating: 4.7, isVeg: false, isSpicy: true, isBestseller: false, description: "Flavorful biryani with tender chicken and spices", category: "Biryanis", image: "/images/chicken-biryani.jpg" },
  { id: 5, name: "Mutton Biryani", price: "₹399", rating: 4.8, isVeg: false, isSpicy: true, isBestseller: false, description: "Rich biryani with succulent mutton pieces", category: "Biryanis", image: "/images/mutton-biryani.jpg" },

  // Dosas
  { id: 6, name: "Masala Dosa", price: "₹149", rating: 4.5, isVeg: true, isSpicy: false, isBestseller: false, description: "Crispy dosa with potato filling and chutney", category: "Dosas", image: "/images/masala-dosa.webp" },
  { id: 7, name: "Ghee Roast Dosa", price: "₹169", rating: 4.6, isVeg: true, isSpicy: true, isBestseller: false, description: "Spicy ghee-roasted dosa with chutney", category: "Dosas", image: "/images/ghee-roast.jpg" },

  // Meals
  { id: 8, name: "Executive Meal", price: "₹249", rating: 4.5, isVeg: true, isSpicy: false, isBestseller: false, description: "A balanced meal with rice, dal, and veggies", category: "Meals", image: "/images/executive-meals.jpg" },

  // Hill Curries
  { id: 9, name: "Mountain Mushroom Curry", price: "₹249", rating: 4.7, isVeg: true, isSpicy: true, isBestseller: false, description: "Fresh mushrooms in a rich, creamy gravy with local herbs", category: "Hill Curries", image: "/images/mushroom curry.jpg" },
  { id: 10, name: "Hill Station Special", price: "₹349", rating: 4.8, isVeg: false, isSpicy: true, isBestseller: true, description: "Chef's special preparation with premium ingredients", category: "Hill Curries", image: "/images/ooty hill station.webp" },

  // Appetizers
  { id: 11, name: "Chicken 65", price: "₹199", rating: 4.6, isVeg: false, isSpicy: true, isBestseller: false, description: "Spicy fried chicken with hill spices", category: "Appetizers", image: "/images/chicken-65.webp" },
  { id: 12, name: "Gobi Manchurian", price: "₹169", rating: 4.5, isVeg: true, isSpicy: true, isBestseller: false, description: "Crispy cauliflower in a tangy Indo-Chinese sauce", category: "Appetizers", image: "/images/gobi-manchurian.jpg" },

  // Beverages
  { id: 13, name: "Nilgiri Tea", price: "₹49", rating: 4.8, isVeg: true, isSpicy: false, isBestseller: false, description: "Freshly brewed tea from the Nilgiri hills", category: "Beverages", image: "/images/nilgiri-tea.webp" },
  { id: 14, name: "Masala Chai", price: "₹59", rating: 4.7, isVeg: true, isSpicy: false, isBestseller: false, description: "Spiced tea with a hint of masala", category: "Beverages", image: "/images/masala-chai.jpg" },
  { id: 15, name: "Green Tea", price: "₹49", rating: 4.6, isVeg: true, isSpicy: false, isBestseller: false, description: "Light and refreshing green tea", category: "Beverages", image: "/images/green-tea.jpg" },
  { id: 16, name: "Hot Chocolate", price: "₹79", rating: 4.8, isVeg: true, isSpicy: false, isBestseller: false, description: "Rich and creamy hot chocolate", category: "Beverages", image: "/images/hot-chocolate.jpg" },
  { id: 17, name: "Cold Coffee", price: "₹89", rating: 4.7, isVeg: true, isSpicy: false, isBestseller: false, description: "Chilled coffee with a creamy texture", category: "Beverages", image: "/images/cold-coffee.jpg" },
  { id: 18, name: "Cafe Mocha", price: "₹99", rating: 4.6, isVeg: true, isSpicy: false, isBestseller: false, description: "Coffee with a hint of chocolate", category: "Beverages", image: "/images/cafe-mocha.avif" },
  { id: 19, name: "Lime Soda", price: "₹59", rating: 4.5, isVeg: true, isSpicy: false, isBestseller: false, description: "Refreshing soda with a hint of lime", category: "Beverages", image: "/images/lime-soda.jpg" },

  // Desserts
  { id: 20, name: "Rasmalai", price: "₹99", rating: 4.7, isVeg: true, isSpicy: false, isBestseller: false, description: "Soft cheese dumplings in sweetened milk", category: "Desserts", image: "/images/rasmalai.webp" },
  { id: 21, name: "Gulab Jamun", price: "₹89", rating: 4.8, isVeg: true, isSpicy: false, isBestseller: false, description: "Sweet dough balls soaked in sugar syrup", category: "Desserts", image: "/images/gulab-jamun.jpg" },
];

// Website content for fuzzy matching
const websiteContent = [
  // Menu Categories
  { type: "category", value: "Thali Specials", response: "Here are our Thali Specials! A complete meal experience." },
  { type: "category", value: "Biryanis", response: "Check out our aromatic Biryanis, straight from the hills!" },
  { type: "category", value: "Dosas", response: "Our Dosas are crispy and delicious! Take a look." },
  { type: "category", value: "Meals", response: "Simple and hearty Meals for a satisfying experience." },
  { type: "category", value: "Hill Curries", response: "Spicy and flavorful Hill Curries, made with local ingredients." },
  { type: "category", value: "Appetizers", response: "Start your meal with our tasty Appetizers!" },
  { type: "category", value: "Beverages", response: "Refresh yourself with our Beverages!" },
  { type: "category", value: "Desserts", response: "End your meal on a sweet note with our Desserts!" },

  // About Page
  { type: "about", value: "heritage", response: "Our heritage is rooted in the Nilgiri hills, where we’ve been serving authentic hill cuisine for years!" },
  { type: "about", value: "fresh ingredients", response: "We use only the freshest ingredients sourced from the Nilgiri hills to bring you the best flavors!" },
  { type: "about", value: "hill station vibes", response: "Experience the hill station vibes with every bite at FusionFood!" },

  // Contact Page
  { type: "contact", value: "contact us", response: "You can reach us at FusionFood, Ooty! Call us at +91-123-456-7890 or email us at contact@hmsfusionfood.com." },
  { type: "contact", value: "address", response: "We’re located at 123 Hill Road, Ooty, Tamil Nadu. Come visit us!" },
  { type: "contact", value: "phone number", response: "Our phone number is +91-123-456-7890. Give us a call!" },

  // Features and Delivery
  { type: "feature", value: "fast delivery", response: "We offer fast delivery within 30 minutes across Ooty! 🚚 Orders above ₹500 get free delivery." },
  { type: "feature", value: "authentic cuisine", response: "Our cuisine is authentic, made with traditional recipes and fresh Nilgiri ingredients!" },
  { type: "feature", value: "choose your meal", response: "Choose your meal from our diverse menu and enjoy a taste of the hills!" },
  { type: "feature", value: "enjoy your food", response: "Sit back, relax, and enjoy your food with FusionFood!" },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: "Welcome to FusionFood! I’m here to assist you with your order. How can I help you today?",
          quickReplies: ["View Menu", "Popular Dishes", "Place an Order", "Delivery Info", "Food Quiz", "Filter: Veg", "Filter: Non-Veg"],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Fuzzy matching for dishes
  const findClosestDish = (input) => {
    const inputLower = input.toLowerCase();
    return menuItems.find((item) => {
      const dishNameLower = item.name.toLowerCase();
      const dishWords = dishNameLower.split(' ');
      return dishWords.some((word) => inputLower.includes(word)) || dishNameLower.includes(inputLower);
    });
  };

  // Fuzzy matching for website content
  const findWebsiteContent = (input) => {
    const inputLower = input.toLowerCase();
    return websiteContent.find((content) => {
      const valueLower = content.value.toLowerCase();
      const valueWords = valueLower.split(' ');
      return valueWords.some((word) => inputLower.includes(word)) || valueLower.includes(inputLower);
    });
  };

  // Handle user input
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);
    const input = userInput.toLowerCase();
    setIsTyping(true);

    // Process user input
    setTimeout(() => {
      let response = '';
      let quickReplies = ["Back to Main Menu"];
      let dishes = [];

      // Intent matching
      if (input.includes('menu') || input.includes('food') || input.includes('view menu')) {
        response = "Here’s our menu! We offer a variety of veg and non-veg dishes. Select a category or dish to add to your cart.";
        dishes = menuItems;
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts", "Filter: Veg", "Filter: Non-Veg"];
      } else if (input.includes('popular') || input.includes('popular dishes')) {
        response = "Here are our most popular dishes, highly recommended by our customers!";
        dishes = menuItems.filter((item) => item.isBestseller);
        quickReplies = [...quickReplies, "View Full Menu", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('delivery') || input.includes('time')) {
        response = "We deliver within 30 minutes across Ooty! Orders above ₹500 get free delivery. Ready to place an order?";
        quickReplies = [...quickReplies, "Yes, Order Now", "No, View Menu"];
      } else if (input.includes('quiz') || input.includes('food quiz')) {
        response = "Let’s find the perfect dish for you! Do you prefer veg or non-veg?";
        quickReplies = [...quickReplies, "Veg", "Non-Veg"];
      } else if (input.includes('cart') || input.includes('checkout')) {
        response = "Let’s proceed to your cart! I’ll take you to the checkout page.";
        setTimeout(() => {
          setIsCartOpen(true);
          navigate('/checkout');
          setIsOpen(false);
        }, 1000);
      } else if (input.includes('view full menu')) {
        response = "Here’s our full menu! Select a category or dish to add to your cart.";
        dishes = menuItems;
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts", "Filter: Veg", "Filter: Non-Veg"];
      } else if (input.includes('veg') || input.includes('filter: veg')) {
        dishes = menuItems.filter((item) => item.isVeg);
        response = dishes.length > 0 ? "Here are our vegetarian dishes!" : "Sorry, no vegetarian dishes available in this category.";
        quickReplies = [...quickReplies, "Popular Dishes", "Filter: Non-Veg", "Filter: Spicy"];
      } else if (input.includes('non-veg') || input.includes('filter: non-veg')) {
        dishes = menuItems.filter((item) => !item.isVeg);
        response = dishes.length > 0 ? "Here’s our non-vegetarian selection!" : "Sorry, no non-vegetarian dishes available in this category.";
        quickReplies = [...quickReplies, "Popular Dishes", "Filter: Veg", "Filter: Spicy"];
      } else if (input.includes('spicy') || input.includes('filter: spicy')) {
        dishes = menuItems.filter((item) => item.isSpicy);
        response = dishes.length > 0 ? "Here are our spiciest dishes!" : "Sorry, no spicy dishes available in this category.";
        quickReplies = [...quickReplies, "Popular Dishes", "Filter: Veg", "Filter: Non-Veg"];
      } else if (input.includes('back to main menu')) {
        response = "Welcome back! How can I assist you now?";
        quickReplies = ["View Menu", "Popular Dishes", "Place an Order", "Delivery Info", "Food Quiz", "Filter: Veg", "Filter: Non-Veg"];
      } else if (input.includes('thali specials')) {
        response = "Here are our Thali Specials! A complete meal experience.";
        dishes = menuItems.filter((item) => item.category === "Thali Specials");
        response = dishes.length > 0 ? response : "Sorry, no Thali Specials available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('biryanis')) {
        response = "Check out our aromatic Biryanis!";
        dishes = menuItems.filter((item) => item.category === "Biryanis");
        response = dishes.length > 0 ? response : "Sorry, no Biryanis available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('dosas')) {
        response = "Our Dosas are crispy and delicious! Take a look.";
        dishes = menuItems.filter((item) => item.category === "Dosas");
        response = dishes.length > 0 ? response : "Sorry, no Dosas available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('meals')) {
        response = "Simple and hearty Meals for a satisfying experience.";
        dishes = menuItems.filter((item) => item.category === "Meals");
        response = dishes.length > 0 ? response : "Sorry, no Meals available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('hill curries')) {
        response = "Spicy and flavorful Hill Curries, made with local ingredients.";
        dishes = menuItems.filter((item) => item.category === "Hill Curries");
        response = dishes.length > 0 ? response : "Sorry, no Hill Curries available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Appetizers", "Beverages", "Desserts"];
      } else if (input.includes('appetizers')) {
        response = "Start your meal with our tasty Appetizers!";
        dishes = menuItems.filter((item) => item.category === "Appetizers");
        response = dishes.length > 0 ? response : "Sorry, no Appetizers available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Beverages", "Desserts"];
      } else if (input.includes('beverages')) {
        response = "Refresh yourself with our Beverages!";
        dishes = menuItems.filter((item) => item.category === "Beverages");
        response = dishes.length > 0 ? response : "Sorry, no Beverages available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Desserts"];
      } else if (input.includes('desserts')) {
        response = "End your meal on a sweet note with our Desserts!";
        dishes = menuItems.filter((item) => item.category === "Desserts");
        response = dishes.length > 0 ? response : "Sorry, no Desserts available right now.";
        quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages"];
      } else {
        // Check for dish name
        const matchedDish = findClosestDish(input);
        if (matchedDish) {
          response = `Here’s some info about ${matchedDish.name}! ${matchedDish.description}. It costs ${matchedDish.price}. Would you like to add it to your cart?`;
          dishes = [matchedDish];
          quickReplies = [...quickReplies, "Yes, Add to Cart", "No, View Menu"];
        } else {
          // Check for website content
          const matchedContent = findWebsiteContent(input);
          if (matchedContent) {
            response = matchedContent.response;
            if (matchedContent.type === "category") {
              dishes = menuItems.filter((item) => item.category.toLowerCase() === matchedContent.value.toLowerCase());
              response = dishes.length > 0 ? response : `Sorry, no ${matchedContent.value} available right now.`;
              quickReplies = [...quickReplies, "Popular Dishes", "Thali Specials", "Biryanis", "Dosas", "Meals", "Hill Curries", "Appetizers", "Beverages", "Desserts"];
            }
          } else {
            response = "I’m sorry, I didn’t understand that. Could you try again? Or select an option below.";
            quickReplies = ["View Menu", "Popular Dishes", "Place an Order", "Delivery Info", "Food Quiz", "Filter: Veg", "Filter: Non-Veg"];
          }
        }
      }

      // Add bot response
      setMessages((prev) => [...prev, { sender: 'bot', text: response, quickReplies, dishes }]);
      setIsTyping(false);
    }, 1000);

    setUserInput('');
  };

  // Handle quick reply clicks
  const handleQuickReply = (reply) => {
    setUserInput(reply);
    handleSendMessage();
  };

  // Handle "Add to Cart" from dish card or quick reply
  const handleAddToCart = (dish) => {
    addToCart(dish);
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: `Added ${dish.name} to your cart! Would you like to add more items?`, quickReplies: ["Yes, View Menu", "No, Checkout", "Back to Main Menu"] },
    ]);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Welcome to FusionFood! I’m here to assist you with your order. How can I help you today?",
        quickReplies: ["View Menu", "Popular Dishes", "Place an Order", "Delivery Info", "Food Quiz", "Filter: Veg", "Filter: Non-Veg"],
      },
    ]);
  };

  return (
    <div>
      <style>
        {`
          /* Chat Window with Solid Modern Design */
          .chat-window {
            background: #FFF9E5; /* Light ooty-gold shade for a warm, solid background */
            position: fixed;
            bottom: 6rem;
            right: 6rem;
            width: 24rem; /* 384px */
            height: 600px;
            border-radius: 16px; /* Softer rounded corners */
            border: 1px solid #FFD700; /* Ooty-gold border */
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
            z-index: 50;
            overflow: hidden;
            font-family: 'Inter', 'Poppins', system-ui, -apple-system, sans-serif; /* Modern font stack */
          }

          /* Message Bubble with Solid Colors */
          .message-bubble {
            padding: 10px 16px;
            border-radius: 16px;
            font-size: 15px;
            line-height: 1.4;
            max-width: 80%;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05); /* Subtle shadow */
            transition: transform 0.2s ease;
          }

          .message-bubble.bot {
            background: #FFF3E0; /* Slightly darker ooty-gold shade */
            color: #333;
          }

          .message-bubble.user {
            background: #FFD700; /* Vibrant ooty-gold */
            color: #333;
          }

          .message-bubble:hover {
            transform: translateY(-1px); /* Subtle lift on hover */
          }

          /* Typing Animation with Dots */
          .typing-dot {
            width: 8px;
            height: 8px;
            background: #8B4513; /* Ooty-brown */
            border-radius: 50%;
            animation: dot-bounce 0.5s infinite;
          }

          @keyframes dot-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          /* Quick Reply Buttons with Solid Design */
          .quick-reply {
            transition: all 0.3s ease;
            background: #FFF9E5; /* Light ooty-gold background */
            border: 1px solid #8B4513; /* Ooty-brown border */
            color: #8B4513;
            padding: 6px 14px;
            border-radius: 20px; /* Pill-shaped */
            font-size: 13px;
            font-weight: 500;
          }

          .quick-reply:hover {
            background: #8B4513; /* Ooty-brown background on hover */
            color: #fff;
            transform: translateY(-1px);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }

          /* Video Icon Container for Chat Messages and Header */
          .video-icon {
            width: 48px;
            height: 48px;
            overflow: hidden;
            border-radius: 50%;
            border: 1px solid #FFD700; /* Ooty-gold border */
            background: #fff; /* Solid white background */
          }

          .video-icon video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* Chat Bubble Video (Full Cover) */
          .chat-bubble {
            width: 64px;
            height: 64px;
            overflow: hidden;
            border-radius: 50%;
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            z-index: 50;
          }

          .chat-bubble video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        `}
      </style>

      {/* Chat Bubble */}
      {!isOpen && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="chat-bubble cursor-pointer"
          onClick={() => {
            console.log("Bot icon clicked, setting isOpen to true");
            setIsOpen(true);
          }}
        >
          <video autoPlay loop muted playsInline>
            <source src="/images/chefbot.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="chat-window flex flex-col"
          onClick={() => console.log("Chat window rendered, isOpen:", isOpen)}
        >
          {/* Header */}
          <div className="bg-ooty-gold text-white p-4 flex justify-between items-center border-b border-ooty-gold/20">
            <div className="flex items-center">
              <div className="video-icon mr-3">
                <video autoPlay loop muted playsInline>
                  <source src="/images/chefbot.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="font-semibold text-lg">FusionFood Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-white hover:text-gray-200 transition" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start`}>
                  {msg.sender === 'bot' && (
                    <div className="video-icon mr-3 mt-1">
                      <video autoPlay loop muted playsInline>
                        <source src="/images/chefbot.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`message-bubble ${msg.sender} inline-block`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
                {/* Display Dishes */}
                {msg.dishes && msg.dishes.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {msg.dishes.map((dish) => (
                      <div key={dish.id} className="bg-ooty-gold/10 p-3 rounded-xl flex items-center border border-ooty-gold/20">
                        <img src={dish.image} alt={dish.name} className="w-14 h-14 object-cover rounded-lg mr-3" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{dish.name}</h4>
                          <p className="text-xs text-gray-600">{dish.price}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {dish.isVeg && <FaLeaf className="text-green-500 text-xs" />}
                            {dish.isSpicy && <FaFire className="text-red-500 text-xs" />}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(dish)}
                          className="bg-ooty-brown text-white px-3 py-1 rounded-lg text-xs hover:bg-ooty-brown/80 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Quick Replies */}
                {msg.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (reply === "Yes, Add to Cart" && msg.dishes.length === 1) {
                            handleAddToCart(msg.dishes[0]);
                          } else {
                            handleQuickReply(reply);
                          }
                        }}
                        className="quick-reply"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="video-icon mr-3">
                  <video autoPlay loop muted playsInline>
                    <source src="/images/chefbot.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex space-x-1">
                  <div className="typing-dot" style={{ animationDelay: '0s' }} />
                  <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                  <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-ooty-gold/20 bg-ooty-gold/10">
            <div className="flex items-center space-x-2">
              <button onClick={clearChat} className="text-ooty-brown hover:text-ooty-brown/80 transition">
                <FaRedo />
              </button>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={messages.length === 1 ? "Try 'View Menu' or 'Order Biryani'" : "Type your message..."}
                className="flex-1 px-4 py-2 bg-white border border-ooty-gold/30 rounded-full focus:outline-none focus:ring-1 focus:ring-ooty-gold text-sm text-gray-800 placeholder-gray-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-ooty-brown text-white p-2 rounded-full hover:bg-ooty-brown/80 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
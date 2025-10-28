const Footer = () => {
  return (
      <footer className="bg-black text-gray-300 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Vibe Commerce</h3>
                  <p className="text-sm leading-relaxed">
                      The modern e-commerce experience for effortless online shopping.
                      Built with React, Node.js, and love.
                  </p>
              </div>

              <div>
                  <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-white transition">Home</a></li>
                      <li><a href="#" className="hover:text-white transition">Shop</a></li>
                      <li><a href="#" className="hover:text-white transition">About</a></li>
                      <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  </ul>
              </div>

              <div>
                  <h4 className="text-md font-semibold text-white mb-3">Support</h4>
                  <ul className="space-y-2 text-sm">
                      <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                      <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                      <li><a href="#" className="hover:text-white transition">Returns</a></li>
                      <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  </ul>
              </div>

              <div>
                  <h4 className="text-md font-semibold text-white mb-3">Contact Us</h4>
                  <ul className="space-y-2 text-sm">
                      <li>Email: support@vibecommerce.com</li>
                      <li>Phone: +91 98765 43210</li>
                      <li>Address: Bengaluru, India</li>
                  </ul>
              </div>
          </div>

          <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
              © {new Date().getFullYear()} Vibe Commerce. All rights reserved.
          </div>
      </footer>
  )
}

export default Footer
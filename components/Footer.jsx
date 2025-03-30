export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Internet Movies Rental Company</h3>
              <p>Your ultimate destination for movie information and management.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>Email: info@internetmoviesrental.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Movie Street, Hollywood, CA 90001</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <p>&copy; {new Date().getFullYear()} IMR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
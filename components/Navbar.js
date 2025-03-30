const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-xl">
                        MoviesDB
                    </div>
                    <div>
                        <ul className="flex space-x-6">
                            <li><a href="/#" className="hover:text-gray-300">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-300">About</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
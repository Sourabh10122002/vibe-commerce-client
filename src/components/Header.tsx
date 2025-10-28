interface AppHeaderProps {
    cartCount: number;
    onCartToggle: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    cartCount,
    onCartToggle,
    onLoginClick,
    onSignupClick,
}) => {
    return (
        <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg">
                        VC
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Vibe Commerce</h2>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <a href="#" className="hover:text-black transition">Home</a>
                    <a href="#" className="hover:text-black transition">Products</a>
                    <a href="#" className="hover:text-black transition">About</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onLoginClick}
                        className="text-sm font-medium text-gray-700 hover:text-black"
                    >
                        Login
                    </button>
                    <button
                        onClick={onSignupClick}
                        className="text-sm font-medium text-gray-700 hover:text-black"
                    >
                        Signup
                    </button>
                    <button
                        onClick={onCartToggle}
                        className="bg-black text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-900 transition"
                    >
                        🛒 Cart ({cartCount})
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;

import React, { useState } from "react";

interface SignupModalProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
    onSignup: (name: string, email: string, password: string) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
    onClose,
    onSwitchToLogin,
    onSignup,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-2 rounded-md mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded-md mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded-md mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={() => onSignup(name, email, password)}
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
                >
                    Sign Up
                </button>

                <div className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={onSwitchToLogin}
                    >
                        Log in
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default SignupModal;
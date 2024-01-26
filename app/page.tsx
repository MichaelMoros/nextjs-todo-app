import Link from "next/link";
import React from "react";
import NavbarTest from "./navbar";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarTest />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl font-bold">Routine App</p>
                    <p className="text-sm text-gray-500">
                        Create and track your daily routines
                    </p>
                    <Link href="/dashboard">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

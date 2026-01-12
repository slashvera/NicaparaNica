import {Link} from 'react-router'

export default function Header() {
    return (
        <nav className="bg-gray-700 text-white py-4 mb-2">
                <h1 className="text-2xl font-bold ml-3">Student Management System</h1>

                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white hover:text-blue-700 mx-2 text-2xl ml-3">Home</Link>
                    <div>
                        <Link to="/new-student" className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded">
                            Add New Student
                        </Link>
                    </div>

                </div>
        </nav>
    )
}   
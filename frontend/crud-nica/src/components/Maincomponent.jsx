

export default function Maincomponent() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold">Student Demography</h2>
                <p className="text-lg p-1 text-gray-600">Lorem, Gender Distributions Students.</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold">Total Students</h2>
                <p className="text-lg p-1 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold">Courses Available</h2>
                <p className="text-lg p-1 text-gray-600">Lorem, Gender Distributions Students.</p>
            </div>
        </div>
    );
}
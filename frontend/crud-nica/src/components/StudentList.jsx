export default function StudentList() {

    const loadStudents  = async () => {
        const response = await getStudents();
        console.log(response.data);
    }

    loadStudents();

    return(
        <div>Student List</div>
    )
}
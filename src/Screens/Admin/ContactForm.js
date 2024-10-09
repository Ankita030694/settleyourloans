import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ContactFormData from "./ContactFormData";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Add doc and deleteDoc
import PELoader from "../../Screens/Utils/PELoader";
import ExportCSV from "./ExportCSV";

function ContactForm() {
  const [homeData, setHomeData] = useState([]);
  const [filteredHomeData, setFilteredHomeData] = useState([]);
  const [user, setuser] = useState(true);
  const [loader, setLoader] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const auth = getAuth();

  useEffect(() => {
    getUserAuth();
    FetchContactFormData();
  }, []);

  const getUserAuth = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setuser(false);
      } else {
        setuser(true);
      }
    });
  };

  const FetchContactFormData = async () => {
    setLoader(true);
    try {
      const querySnapshot = await getDocs(collection(db, "ContactPageForm"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      newData.sort((a, b) => new Date(b.created) - new Date(a.created));
      setHomeData(newData);
      setFilteredHomeData(newData); // Set the filtered data to the full data initially
    } catch (error) {
      console.error("Error fetching contact form data: ", error);
    }
    setLoader(false);
  };

  const handleDateFilter = () => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);

      const filteredData = homeData.filter((item) => {
        const itemDate = new Date(item.created); // Ensure `created` is in the correct format
        return itemDate >= from && itemDate <= to;
      });

      setFilteredHomeData(filteredData); // Use filtered data
    } else {
      alert("Please select both from and to dates");
    }
  };

  const deleteBtnClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      const docRef = doc(db, "ContactPageForm", id);

      try {
        await deleteDoc(docRef);
        setHomeData((prevData) => prevData.filter((item) => item.id !== id));
        setFilteredHomeData((prevData) => prevData.filter((item) => item.id !== id));
        alert("Deleted Successfully");
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting entry. Please try again.");
      }
    }
  };

  return (
    <>
      {user ? (
        <>
          <HeaderAdmin />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-52">
            <ExportCSV list={homeData} filename={"Contact Form"} />

            <div className="flex mb-4">
              <label className="mr-2">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mr-4"
              />
              <label className="mr-2">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mr-4"
              />
              <button
                onClick={handleDateFilter}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Filter
              </button>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {/* Table headers */}
                          <th>Date</th>
                          <th>Name</th>
                          <th>Number</th>
                          <th>Email</th>
                          <th className="w-1/6">Message</th> {/* Adjust width */}
                          <th>City</th>
                          {/* Other headers */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loader ? (
                          <PELoader />
                        ) : (
                          <>
                            {filteredHomeData &&
                              filteredHomeData.map((person, personIdx) => (
                                <ContactFormData
                                  key={person.id}
                                  person={person}
                                  personIdx={personIdx}
                                  deleteBtnClick={() => deleteBtnClick(person.id)} // Pass ID to delete function
                                />
                              ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Not Authorized</h1>
      )}
    </>
  );
}

export default ContactForm;

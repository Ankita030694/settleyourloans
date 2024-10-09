import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import HomeFormData from "./HomeFormData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, query, orderBy,limit,startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import PELoader from "../Utils/PELoader";
import ExportCSV from './ExportCSV';

function HomeForm() {
  const [homeData, setHomeData] = useState([]);
  const [filteredHomeData, setFilteredHomeData] = useState([]);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const [viewModal, setViewModal] = useState(false);
  const [viewModalId, setViewModalId] = useState();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [lastDocumentSnapshot, setLastDocumentSnapshot] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    getUserAuth();
    fetchHomeFormData();
  }, [currentPage]); // Reload data when page changes

  const getUserAuth = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setUser(false);
      } else {
        setUser(true);
      }
    });
  };

  const fetchHomeFormData = async () => {
    setLoader(true);
    let q = query(
      collection(db, "homefromrecord"),
      orderBy("date", "desc"),
      limit(100)
    );

    if (currentPage > 1 && lastDocumentSnapshot) {
      q = query(
        collection(db, "homefromrecord"),
        orderBy("date", "desc"),
        startAfter(lastDocumentSnapshot),
        limit(100)
      );
    }

    try {
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setHomeData([...homeData, ...newData]);
      setFilteredHomeData([...filteredHomeData, ...newData]);
      setLastDocumentSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoader(false);
      checkLastPage(querySnapshot);
    } catch (error) {
      console.error("Error fetching home data:", error);
      // Handle error state or retry logic
    }
  };

  const checkLastPage = (querySnapshot) => {
    // Check if there are no more documents to fetch
    const isLastPage = querySnapshot.docs.length < 100;
    setLastPage(isLastPage);
  };

  const handleDateFilter = () => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      const filteredData = homeData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= from && itemDate <= to;
      });
  
      setFilteredHomeData(filteredData);
    } else {
      alert("Please select both from and to dates");
    }
  };
  

  const deleteBtnClick = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    
    if (confirmDelete) {
      const docRef = doc(db, "homefromrecord", e.target.id);
      
      try {
        await deleteDoc(docRef);
        setHomeData((prevData) => prevData.filter((item) => item.id !== e.target.id));
        setFilteredHomeData((prevData) => prevData.filter((item) => item.id !== e.target.id));
        alert("Deleted Successfully");
        
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Error deleting entry. Please try again.");
      }
    }
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setHomeData([]);
    setFilteredHomeData([]);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    setHomeData([]);
    setFilteredHomeData([]);
    setLastDocumentSnapshot(null); // Reset last document snapshot when going to previous page
  };

  return (
    <>
      {user ? (
        <>
          <HeaderAdmin />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-52">
            <ExportCSV list={filteredHomeData} filename={"Home Form"} />
            
            <div className="flex  mb-4">
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
            <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={lastPage}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Next
                      </button>
                    </div>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                 
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          {/* Add other table headers here */}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Debt Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monthly Income
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Settlement
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Harasment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {loader ? (
                          <PELoader />
                        ) : (
                          <>
                            {filteredHomeData.map((person, index) => (
                              <HomeFormData
                                key={index}
                                person={person}
                                personIdx={index}
                                deleteBtnClick={deleteBtnClick}
                              />
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={lastPage}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Next
                      </button>
                    </div>
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

export default HomeForm;

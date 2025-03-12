import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import ApppointmentDataService from "../services/appointment.service";
  
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Upcoming",
      value: "upcoming",
    },
    {
      label: "Done",
      value: "done",
    },
  ];

const TABLE_HEAD = ["Name", "Address", "Gender", "Status", "Date & Time", "Actions"];

const AppointmentList = () => {

    const [setAppointmentID] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const getAppointmentIDHandler = (id) => {
      console.log("The ID of document to be edited", id);
      setAppointmentID(id);
    }

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 5;

    useEffect(() => {
      getAppointments();
    }, []);

    const getAppointments = async() => {
      const data = await ApppointmentDataService.getAllAppointments();
      console.log(data.docs);
      setAppointments(data.docs.map((doc) =>({ ...doc.data(), id: doc.id})))
    };

    const deleteHandler = async(id) => {
      await ApppointmentDataService.deleteAppointment(id);
      getAppointments();
    }

    // Pagination logic
    const indexOfLastAppointments = currentPage * appointmentsPerPage;
    const indexOfFirstAppointmens = indexOfLastAppointments - appointmentsPerPage;
    const currentAppointments = appointments
      .filter(appointment => 
        `${appointment.firstname} ${appointment.middlename || ''} ${appointment.surname} ${appointment.suffix || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.cityMunicipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(indexOfFirstAppointmens, indexOfLastAppointments);

    const nextPage = () => {
      if (currentPage < Math.ceil(appointments.length / appointmentsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1); // Reset to the first page when searching
    };

  return (
    <div className="flex h-screen">
        {/* Main content */}
        <main className="flex-1 px-6 py-4">
          <h1 className="font-poppins text-[24px] text-black font-bold mb-6">Appointments (Face-to-Face Interview)</h1>

          <Card className="w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">

            <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Appointment list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all appointments
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="text" className="flex items-center gap-3" onClick={getAppointments}>
            Refresh Table
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>

          {/* <Button color="light-blue" className="flex items-center gap-3" size="sm">
            <Link to="/Availability" className="flex items-center gap-2">
              <ClipboardDocumentListIcon strokeWidth={2} className="h-4 w-4" />
              <span>Set Availability</span>
            </Link>
          </Button> */}
          
          </div>
        </div>


              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value="all" className="w-full md:w-max">
                  <TabsHeader>
                    {TABS.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            
            </CardHeader>
            
            <CardBody className="overflow-scroll px-0">

               {/* <pre>{JSON.stringify(appointments, undefined, 2)}</pre>  */}

              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody>
                  {currentAppointments.map ((doc, index) => {
                      const isLast = index === currentAppointments.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
 
                      return (

                        
                        <tr key={doc.firstname}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9ISaBFDC88ejiGrYACSt81CFq21QsZ6bow&s"} alt={doc.firstname} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {`${doc.firstname} ${doc.middlename || ''} ${doc.surname} ${doc.suffix || ''}`.trim()}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {doc.email}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {doc.barangay}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {`${doc.cityMunicipality}, ${doc.province}`}
                              </Typography>
                            </div>
                          </td>


                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {doc.gender}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={classes}>
                            <div className="w-max">
                            <Typography
                                variant="small"
                                className={`font-normal ${
                                    doc.status === 'Done' ? 'bg-green-500' :
                                    doc.status === 'Ongoing' ? 'bg-[#6EC531]' :
                                    doc.status === 'No Show' ? 'bg-red-500' :
                                    doc.status === 'Upcoming' ? 'bg-yellow-500' :
                                    'bg-blue-gray-200' // Default color
                                } text-white p-2 rounded`}
                            >
                                {doc.status}
                            </Typography>
                            </div>
                        </td>

                          
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {(() => {
                              const date = new Date(`${doc.selectedDate}T${doc.selectedTime}`);
                              const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
                              const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
                              return `${date.toLocaleDateString('en-US', optionsDate)} at ${date.toLocaleTimeString('en-US', optionsTime)}`;
                            })()}
                          </Typography>
                        </td>


                          <td className={classes}>
                            <Tooltip content="Update Status">
                              <IconButton variant="text">
                                <Link
                                    to={`/EditClientAppointment/${doc.id}`}  // Pass the ID as a URL parameter
                                    className="flex items-center gap-2"
                                >
                                <PencilIcon className="h-4 w-4" />
                                </Link>
                              </IconButton>
                            </Tooltip>

                            <Tooltip content="Delete Data">
                              <IconButton variant="text">
                                <TrashIcon className="h-4 w-4"  onClick={handleDeleteOpen}/>

                                <Dialog
                                  open={deleteOpen}
                                  handler={handleDeleteOpen}
                                  animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0.9, y: -100 },
                                  }}
                                >
                                  <DialogHeader>Are you sure you want to delete this data?</DialogHeader>
                                  <DialogBody>
                                    This action cannot be undone, and the data will be permanently removed from your records.
                                  </DialogBody>
                                  <DialogFooter>
                                    <Button
                                      variant="text"
                                      color="green"
                                      onClick={handleDeleteOpen}
                                      className="mr-1"
                                    >
                                      <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="red" onClick={(e) => deleteHandler(doc.id)} >
                                      <span>Delete</span>
                                    </Button>
                                  </DialogFooter>
                                </Dialog>

                              </IconButton>
                            </Tooltip>
                          </td>
 
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
              Page {currentPage} of {Math.ceil(appointments.length / appointmentsPerPage)}
              </Typography>
              <div className="flex gap-2">
                <Button variant="text" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button variant="outlined" size="sm" onClick={nextPage} disabled={currentPage === Math.ceil(appointments.length / appointmentsPerPage)}>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </main>
    </div>
  )
}

export default AppointmentList;
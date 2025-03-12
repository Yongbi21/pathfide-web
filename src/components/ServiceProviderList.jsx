import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
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

import ServiceProvidersDataService from "../services/serviceproviders";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

const TABLE_HEAD = ["Fullname", "Profession", "Status", "Clinic Address & Time", "Actions"];

const ServiceProviderList = () => {
  const [setServiceProviderID] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false); // State for success modal
  const [serviceProviders, setServiceProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const providersPerPage = 5;
  const [providerToDelete, setProviderToDelete] = useState(null); // Track provider to delete

  useEffect(() => {
    getServiceProviders();
  }, []);

  const getServiceProviders = async () => {
    const data = await ServiceProvidersDataService.getAllServiceProviders();
    console.log(data.docs);
    setServiceProviders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, uid: doc.data().uid })));
  };

  const deleteHandler = async (uid) => {
    await ServiceProvidersDataService.deleteServiceProvider(uid);
    setDeleteOpen(false); // Close delete confirmation modal
    setDeleteSuccessOpen(true); // Open success modal
    getServiceProviders(); // Refresh the service provider list
  };

  const handleDeleteOpen = (uid) => {
    setProviderToDelete(uid); // Set the provider ID to delete
    setDeleteOpen(true);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter service providers based on search term
  const filteredProviders = serviceProviders.filter(provider => {
    const fullName = `${provider.firstName ?? ''} ${provider.middleName ?? ''} ${provider.surName ?? ''} ${provider.suffix ?? ''}`.trim().toLowerCase();
    const email = provider.email?.toLowerCase() ?? '';
    const profession = provider.profession?.toLowerCase() ?? '';
    const accountStatus = provider.accountStatus?.toLowerCase() ?? '';
    const clinicAddress = provider.clinicAddress?.toLowerCase() ?? '';
    const clinicTime = provider.clinicTime?.toLowerCase() ?? '';

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      profession.includes(searchTerm.toLowerCase()) ||
      accountStatus.includes(searchTerm.toLowerCase()) ||
      clinicAddress.includes(searchTerm.toLowerCase()) ||
      clinicTime.includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProviders.length / providersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 px-6 py-4">
        <h1 className="font-poppins text-[24px] text-black font-bold mb-6">Service Providers</h1>

        <Card className="w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all service providers
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="text" className="flex items-center gap-3" onClick={getServiceProviders}>
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
                <Button variant="outlined" className="flex items-center gap-3" size="sm">
                  <Link to="/AddServiceProvider" className="flex items-center gap-2">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                    <span>Add Service Provider</span>
                  </Link>
                </Button>
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
                {currentProviders.map((doc, index) => {
                  const isLast = index === currentProviders.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={doc.uid}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9ISaBFDC88ejiGrYACSt81CFq21QsZ6bow&s"} alt={doc.firstName} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {`${doc.firstName} ${doc.middleName || ''} ${doc.surName} ${doc.suffix || ''}`.trim()}
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
                            {doc.profession}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            className={`font-normal ${
                              doc.accountStatus === 'ACTIVE' ? 'bg-[#6EC531]' : 'bg-blue-gray-200'
                            } text-white p-2 rounded`}
                          >
                            {doc.accountStatus}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {doc.clinicAddress}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {doc.clinicTime}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip content="View or Update Account">
                          <IconButton variant="text">
                            <Link
                              to={`/EditServiceProvider/${doc.uid}`}  // Pass the ID as a URL parameter
                              className="flex items-center gap-2"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Link>
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Delete Data">
                          <IconButton variant="text">
                            <TrashIcon className="h-4 w-4 text-red-600"
                              onClick={() => handleDeleteOpen(doc.uid)} />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>

          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page {currentPage} of {Math.ceil(filteredProviders.length / providersPerPage)}
            </Typography>
            <div className="flex gap-2">
              <Button variant="text" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button variant="outlined" size="sm" onClick={nextPage} disabled={currentPage === Math.ceil(filteredProviders.length / providersPerPage)}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteOpen} handler={() => setDeleteOpen(false)}>
          <DialogHeader>Confirm Deletion</DialogHeader>
          <DialogBody>
            Are you sure you want to delete this service provider?
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="gray" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="outlined" color="red" onClick={() => deleteHandler(providerToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Delete Success Modal */}
        <Dialog open={deleteSuccessOpen} handler={() => setDeleteSuccessOpen(false)}>
          <DialogHeader>Success</DialogHeader>
          <DialogBody>
            Service provider deleted successfully!
          </DialogBody>
          <DialogFooter>
            <Button variant="outlined" color="gray" onClick={() => setDeleteSuccessOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </main>
    </div>
  );
};

export default ServiceProviderList;
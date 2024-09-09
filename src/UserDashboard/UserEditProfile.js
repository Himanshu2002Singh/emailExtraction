import React from "react";

import Box from "@mui/material/Box";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";


function UserEditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    street: "",
    phone: "",
    Birthday: "",
    Maritial_Status: "",
    Gender: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8000/Edit-profiler", formData)
      .then((res) => {
        if (res.data === "account already created pls login") {
          toast.success("account already created pls login");
          return;
        }
        toast.success("Account Created");
        console.log(res);
        console.log(formData);

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box height={10} />
      <Box sx={{ display: "flex" }}>
      
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <div className="container">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mt-3">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Maxwell Admin"
                          />
                        </div>
                        <h5 className="user-name">abcd</h5>
                        <h6 className="user-email">abcd@Maxwell.com</h6>
                      </div>
                      <div className="about">
                        <h5>About</h5>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mt-5">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                      </div>
                      <form onSubmit={submitHandler}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="fullName">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              className="form-control mb-3"
                              onChange={changeHandler}
                              value={formData.firstName}
                              id="fullName"
                              placeholder="Enter First name"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="fullName">Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              onChange={changeHandler}
                              value={formData.lastName}
                              className="form-control mb-3"
                              id="fullName"
                              placeholder="Enter Last name"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="eMail">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={changeHandler}
                              className="form-control mb-3"
                              id="eMail"
                              placeholder="Enter email ID"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="phone">Phone</label>
                            <input
                              type="text"
                              name="phone"
                              onChange={changeHandler}
                              value={formData.phone}
                              className="form-control mb-3"
                              id="phone"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                        
                        
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label for="website">Gender</label>
                            <input
                              type="text"
                              name="Gender"
                              className="form-control mb-3"
                              onChange={changeHandler}
                              value={formData.Gender}
                              id="website"
                              placeholder="Gender"
                            />
                          </div>
                        </div>
                        
                      </form>
                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="Street">Street</label>
                          <input
                            type="name"
                            name="street"
                            onChange={changeHandler}
                            value={formData.street}
                            className="form-control mb-3"
                            id="Street"
                            placeholder="Enter Street"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="ciTy">City</label>
                          <input
                            type="name"
                            name="city"
                            onChange={changeHandler}
                            value={formData.city}
                            className="form-control mb-3"
                            id="ciTy"
                            placeholder="Enter City"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="sTate">State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={changeHandler}
                            value={formData.state}
                            className="form-control mb-3"
                            id="sTate"
                            placeholder="Enter State"
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label for="zIp">Zip Code</label>
                          <input
                            type="text"
                            className="form-control mb-3"
                            id="zIp"
                            placeholder="Zip Code"
                            name="zip"
                            value={formData.zip}
                            onChange={changeHandler}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div> 
          </div> 
        </Box>
      </Box>
    </div>
  );
}

export default UserEditProfile;
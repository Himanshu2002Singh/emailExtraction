import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import NavbarDashboard from "./NavbarDashboard";
import ResponsiveDrawer from "./Sidebar";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

const PaymentOwner = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
  });

  const [guests, setGuests] = useState([]); // State to manage multiple guests

  const navigate = useNavigate();
  const addGuest = () => {
    // Add the current formData to the guests list
    setGuests([...guests, formData]);
    // Reset the formData to clear the input fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8000/Update-Profile", formData)
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
      <NavbarDashboard />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <ResponsiveDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="container-fluid">
          
            <div className="row">
              <div className="col-md-8">
  <MDBCard className="mb-3">
  <MDBCardBody>
    <h1>Homestay or PG name</h1>
    <p>homestay and pg address will be shown here</p>
    <div className="Container-fluid">
      
      <div className="row" >
        <div className="col-8">
      <div className="col-6 border border-light-subtle my-5" style={{ width:"50%",justifyContent:"center",textAlign:"center"}}>
        <label><b>CHECK IN DATE</b></label><br></br>
      <input className="btn btn-outline-primary my-3" style={{width:"80%"}} type="date"></input>
      </div>
      <div className="col-6 border border-light-subtle my-5" style={{ width:"50%",border:"5px",justifyContent:"center",textAlign:"center"}}>
        <label><b>CHECK OUT DATE</b></label><br></br>
      <input className="btn btn-outline-primary my-3" style={{width:"80%"}} type="date"></input>
      </div>
      <div className="col-md-8">
  <MDBCard className="mb-3">
  <MDBCardBody>
    <MDBCardTitle>Payment detail </MDBCardTitle>
    <MDBCardText>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="firstName">Full Name</label>
          <input
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={formData.firstName}
            className="form-control"
            id="firstName"
            placeholder="Enter First Name"
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            value={formData.email}
            className="form-control"
            id="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Contact Number</label>
          <input
            type="text"
            name="phone"
            onChange={changeHandler}
            value={formData.phone}
            className="form-control"
            id="phone"
            placeholder="Enter Contact Number"
          />
        </div>
        {/* Add other form fields and elements as needed */}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <button onClick={addGuest} className="btn btn-danger mt-3">
              Add Guest
            </button>

            {/* Display added guests */}
            {guests.map((guest, index) => (
              <div key={index} className="mt-3">
                <h5>Guest {index + 1}</h5>
                <p>First Name: {guest.firstName}</p>
                <input
                type="text"
                name="firstName"
                onChange={changeHandler}
                value={formData.firstName}
                className="form-control"
                id="firstName"
                placeholder="Enter First Name"
              />
                <p>Last Name: {guest.lastName}</p>
                  <input
            type="text"
            name="lastName"
            onChange={changeHandler}
            value={formData.lastName}
            className="form-control"
            id="lastName"
            placeholder="Enter Last Name"
          />
                <p>Email: {guest.email}</p>
                <input
                type="email"
                name="email"
                onChange={changeHandler}
                value={formData.email}
                className="form-control"
                id="email"
                placeholder="Enter Email"
              />
                <p>Phone: {guest.phone}</p>
                <input
                type="text"
                name="phone"
                onChange={changeHandler}
                value={formData.phone}
                className="form-control"
                id="phone"
                placeholder="Enter Contact Number"
              />
                
              </div>
            ))}
            
    </MDBCardText>
  </MDBCardBody>
</MDBCard>

              </div>
      
      </div>

      </div>
    </div>
  </MDBCardBody>
</MDBCard>

            <div className="col-lg-4"> this is it</div>  
              </div>
              <div className="col-md-4">
                <MDBCard className="mb-3">
                  <MDBCardBody>
                    <MDBCardTitle>Payment Option 2</MDBCardTitle>
                    <div class="makeRelative"><div class="paper appendBottom20"><div class="pricBreakup__header"><h4 class="font16 latoBlack blackText">Price Breakup</h4></div><div class="pricBreakup__cont makeRelative"><div class="pricBreakup__row"><div class="makeFlex flexOne spaceBetween"><div class="pricBreakup__lft"><p class="latoBold blackText"><span>1 Room</span> <span> x </span> <span>1 Night</span></p><p class="font12 grayText appendTop3">Base Price</p></div><div class="pricBreakup__rht"><p class="latoBold">₹ 7,440</p></div></div></div><div class="pricBreakup__row"><div class="makeFlex flexOne spaceBetween"><div class="pricBreakup__lft"><div class="latoBold greenText makeFlex">Total Discount<div class="ttlDscTooltip appendLeft5"><span class="sprite grayInfoIcon pointer"></span><div class="ttlDiscount"><ul class="ttlDiscount__list"><li class="ttlDiscount__listItem"><span class="sprite roomSelectIcon appendRight10 appendTop2"></span><div class="flexOne"><div class="makeFlex spaceBetween whiteText"><span class=" ">HOMESTAY</span><p class="noShrink">₹ 282</p></div></div></li></ul></div></div></div></div><div class="pricBreakup__rht"><p class="latoBold greenText">₹ 282</p></div></div></div><div class="pricBreakup__row"><div class="makeFlex flexOne spaceBetween"><div class="pricBreakup__lft"><p class="latoBold blackText">Price after Discount</p></div><div class="pricBreakup__rht"><p class="latoBold">₹ 7,158</p></div></div></div><div class="pricBreakup__row"><div class="makeFlex flexOne spaceBetween"><div class="pricBreakup__lft"><div class="latoBold blackText makeFlex hrtlCenter">Hotel Taxes<div class="ttlDscTooltip appendLeft5"><span class="sprite grayInfoIcon pointer"></span><div class="ttlDiscount"><ul class="ttlDiscount__list"><li class="ttlDiscount__listItem"><div class="flexOne"><div class="makeFlex spaceBetween whiteText"><span class=" ">Hotel GST</span><p class="noShrink">₹ 893</p></div></div></li></ul></div></div></div></div><div class="pricBreakup__rht"><p class="latoBold">₹ 893</p></div></div></div><div class="pricBreakup__row"><div class="makeFlex flexOne spaceBetween"><div><span class="checkmarkOuter"><input type="checkbox" name="" id="donate"/><label for="donate"><div class="font12 lineHight14 latoBold blackText donate__text">Donate ₹5 towards flood relief efforts in Himachal Pradesh. <a href="https://www.makemytrip.com/promos/charity-deduction-16112017.html" target="_blank" rel="noopener noreferrer">T&amp;Cs</a><div class="charityCont"><span class="sprite grayInfoIcon pointer"></span><div class="ourInitiative"><div class="charityCard appendBottom10"><span class="charityCard__icon"><img src="https://promos.makemytrip.com/Hotels_product/Review/Community_donation.png/" width="36" alt=""/></span><div><p>Support community empowerment and restoration &amp; preservation of heritage. <a href="https://www.makemytrip.com/csr/covid-19-relief-efforts.html" target="_blank">Know More</a></p></div></div><div class="charityCard appendBottom10"><span class="charityCard__icon"><img src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/charity_1.png?v=1" width="36" alt=""/></span><div><p>Support rehabilitation of displaced and affected people. <a href="https://www.makemytrip.com/csr/mmt_foundation.html">Know More</a></p></div></div><div class="charityCard appendBottom10"><span class="charityCard__icon"><img src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/charity_2.png?v=1" width="36" alt=""/></span><div><p>Contribute towards afforestation and rebuilding of affected areas. <a href="https://www.makemytrip.com/csr/mmt_foundation.html">Know More</a></p></div></div></div></div></div></label></span></div><span class="noShrink latoBold donatePriceText">₹ 5</span></div></div></div><div class="pricBreakup__total"><div class="makeFlex"><div class="pricBreakup__lft"><p class="font16 latoBold">Total Amount to be paid</p></div><div class="pricBreakup__rht"><p class="font16 latoBold">₹ 8,056</p></div></div></div></div></div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
          
        </Box>
      </Box>
    </div>
  );
};

export default PaymentOwner;

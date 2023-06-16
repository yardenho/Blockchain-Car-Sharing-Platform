import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Garages from "../abis/GarageRegistration.json";
import VehicleDoc from "../abis/VehicleDoc.json";
import Users from "../abis/Users.json";
import Navbar from "./Navbar";
import Main from "./Main";
import AddVehicle from "./AddVehicle";
import Register from "./Register.js";
import VehicalDocumentation from "./VehicleDoc";
import Login from "./login";
import MainPage from "./MainPage";
import { Routes, Route } from "react-router-dom";
import GarageRegistration from "./GarageRegistration";
import DocumentationList from "./DocumentationList";
import UserMainPage from "./UserMainPage";
import VehiclesList from "./RentersVehiclesList";
import ViewVehicle from "./ViewVehicle";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadMarketplaceContract(web3, networkId) {
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      const vehicleCount = await marketplace.methods.vehicleCount().call();
      console.log("vehical count = " + vehicleCount);
      this.setState({ vehicleCount });
      // Load vehicles
      for (var i = 1; i <= vehicleCount; i++) {
        const vehicle = await marketplace.methods.vehicles(i).call();
        this.setState({
          vehicles: [...this.state.vehicles, vehicle],
        });
      }
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  async loadUsersContract(web3, networkId) {
    const networkData = Users.networks[networkId];
    if (networkData) {
      const usersContract = web3.eth.Contract(Users.abi, networkData.address);
      console.log(usersContract.methods);
      this.setState({ usersContract });
      const usersCount = await usersContract.methods.usersCount().call();
      console.log("user count *** - " + usersCount);
      this.setState({ userCount: usersCount });
      const stateUsers = this.state.users;
      // Load users
      for (var i = 1; i <= usersCount; i++) {
        const user = await usersContract.methods.users(i).call();
        stateUsers.push(user);
      }
      this.setState({ users: stateUsers });
    } else {
      window.alert("Usres contract not deployed to detected network.");
    }
  }

  async loadGaragesContract(web3, networkId) {
    const networkData = Garages.networks[networkId];
    if (networkData) {
      const garagesContract = web3.eth.Contract(
        Garages.abi,
        networkData.address
      );
      this.setState({ garagesContract });
      const garagesCount = await garagesContract.methods.garagesCount().call();
      console.log("garages count = " + garagesCount);
      this.setState({ garagesCount });
      const stateGarages = this.state.garages;

      // Load vehicles
      for (var i = 1; i <= garagesCount; i++) {
        const garage = await garagesContract.methods.garages(i).call();
        stateGarages.push(garage);
        // this.setState({
        //     garages: [...this.state.garages, garage],
        // });
      }
      this.setState({ garages: stateGarages });
    } else {
      window.alert(
        "Garages Registration contract not deployed to detected network."
      );
    }
  }

  async loadVehicleDocContract(web3, networkId) {
    const networkData = VehicleDoc.networks[networkId];
    if (networkData) {
      const VehicalDocContract = web3.eth.Contract(
        VehicleDoc.abi,
        networkData.address
      );
      this.setState({ VehicalDocContract });
      const VehicalDocCount = await VehicalDocContract.methods
        .documentationsCount()
        .call();
      console.log("documentations count = " + VehicalDocCount);
      this.setState({ VehicalDocCount });
      const stateVehiclesDocs = this.state.documentations;

      // Load vehicles
      for (var i = 1; i <= VehicalDocCount; i++) {
        const document = await VehicalDocContract.methods
          .documentations(i)
          .call();
        // this.setState({
        //     documentations: [...this.state.documentations, document],
        // });
        stateVehiclesDocs.push(document);
      }
      this.setState({ documentations: stateVehiclesDocs });

      console.log("this.state.documentations = " + this.state.documentations);
    } else {
      window.alert("document contract not deployed to detected network.");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log("network id " + networkId);
    this.loadMarketplaceContract(web3, networkId);
    this.loadUsersContract(web3, networkId);
    this.loadGaragesContract(web3, networkId);
    this.loadVehicleDocContract(web3, networkId);

    console.log(this.state.users);

    console.log(this.state.garages);

    this.setState({ loading: false });
  }

  loginUser = (isLog) => {
    this.setState({ userLog: isLog });
  };

  constructor(props) {
    super(props);
    this.state = {
      userLog: false,
      account: "",
      vehicleCount: 0,
      vehicles: [],
      userCount: 0,
      users: [],
      garagesCount: 0,
      garages: [],
      VehicalDocCount: 0,
      documentations: [],
      loading: true,
    };

    this.createVehicle = this.createVehicle.bind(this);
    this.purchaseVehicle = this.purchaseVehicle.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createGarage = this.createGarage.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.approveDoc = this.approveDoc.bind(this);
  }

  createVehicle(vin, vehicleType, price, numOfSeats, gearboxType) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createVehicle(vin, vehicleType, price, numOfSeats, gearboxType)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  createUser(
    address,
    fullName,
    emailAddress,
    age,
    picture,
    IDnumber,
    password
  ) {
    this.setState({ loading: true });
    console.log("in app.js createUser");
    console.log(this.state.account);
    this.state.usersContract.methods
      .createUser(
        address,
        fullName,
        emailAddress,
        age,
        picture,
        IDnumber,
        password
      )
      .send({ from: this.state.account })
      .once("transactionHash", (transactionHash) => {
        console.log("in app.js receipt");
        this.setState({ loading: false });
      });
    // transactionHash
  }

  createGarage(garageAddress, garageName, BnNumber, city, password) {
    this.setState({ loading: true });
    console.log("in app.js createGarage");
    console.log(this.state.account);
    this.state.garagesContract.methods
      .createGarage(garageAddress, garageName, BnNumber, city, password)
      .send({ from: this.state.account })
      .once("transactionHash", (transactionHash) => {
        console.log("in app.js receipt");
        this.setState({ loading: false });
      });
    // transactionHash
  }
  createDocument(vehicleVin, garageBnNumber, description, date, approved) {
    this.setState({ loading: true });
    console.log("in app.js createDocument");
    console.log(this.state.account);
    this.state.VehicalDocContract.methods
      .createDocument(vehicleVin, garageBnNumber, description, date, approved)
      .send({ from: this.state.account })
      .once("transactionHash", (transactionHash) => {
        console.log("in app.js receipt");
        this.setState({ loading: false });
      });
    // transactionHash
  }

  purchaseVehicle(id, price) {
    //     this.setState({ loading: true });
    //     this.state.marketplace.methods
    //         .purchaseProduct(id)
    //         .send({ from: this.state.account, value: price })
    //         .once("receipt", (receipt) => {
    //             this.setState({ loading: false });
    //         });
  }

  approveDoc(id) {
    this.setState({ loading: true });
    this.state.VehicalDocContract.methods
      .approveDoc(id)
      .send({ from: this.state.account })
      .once("transactionHash", (receipt) => {
        console.log(" in approveDoc in app.js");
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar
          userLog={this.state.userLog}
          account={this.state.account}
          users={this.state.users}
          garages={this.state.garages}
        />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                  <Route
                    exact
                    path="/Register"
                    element={
                      <Register
                        createUser={this.createUser}
                        users={this.state.users}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    element={
                      <Login
                        loginUser={this.loginUser}
                        user={this.state.account}
                        users={this.state.users}
                        garages={this.state.garages}
                      ></Login>
                    }
                  />
                  <Route
                    exact
                    path="/GarageRegistration"
                    element={
                      <GarageRegistration
                        garages={this.state.garages}
                        createGarage={this.createGarage}
                      ></GarageRegistration>
                    }
                  />
                  <Route
                    exact
                    path="/vehicleDoc"
                    element={
                      <VehicalDocumentation
                        garages={this.state.garages}
                        vehicles={this.state.vehicles}
                        createDocument={this.createDocument}
                      ></VehicalDocumentation>
                    }
                  />
                  <Route
                    exact
                    path="/DocsList"
                    element={
                      <DocumentationList
                        docs={this.state.documentations}
                        approveDoc={this.approveDoc}
                      ></DocumentationList>
                    }
                  />
                  <Route
                    exact
                    path="/AddVehicle"
                    element={
                      <AddVehicle
                        vehicles={this.state.vehicles}
                        createVehicle={this.createVehicle}
                        purchaseVehicle={this.purchaseVehicle}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/ViewVehicle"
                    element={
                      <ViewVehicle purchaseVehicle={this.purchaseVehicle} />
                    }
                  />
                  <Route
                    exact
                    path="/userMainPage"
                    element={
                      //TODO - needs to delete it
                      <UserMainPage
                        vehiclesList={this.state.vehicles}
                        // vehiclesList={[
                        //   {
                        //     vin: "1",
                        //     vehicleType: "Honda",
                        //     owner: "0x151515315d5fvfdv",
                        //     vehiclePricePerDay: "1",
                        //     unaviableDates: "null",
                        //     numOfSeats: "5",
                        //     gearboxType: "auto",
                        //   },
                        //   {
                        //     vin: "2",
                        //     vehicleType: "Tesla",
                        //     owner: "0x151515315dfhdh55555fvfdv",
                        //     vehiclePricePerDay: "2",
                        //     unaviableDates: "null",
                        //     numOfSeats: "3",
                        //     gearboxType: "auto",
                        //   },
                        //   {
                        //     vin: "3",
                        //     vehicleType: "Mercedes",
                        //     owner: "0x151515315dfhdh55555fvfdv",
                        //     vehiclePricePerDay: "3",
                        //     unaviableDates: "null",
                        //     numOfSeats: "4",
                        //     gearboxType: "auto",
                        //   },
                        //   {
                        //     vin: "4",
                        //     vehicleType: "Mercedes",
                        //     owner: "0fhdh55555fvfdv",
                        //     vehiclePricePerDay: "4",
                        //     unaviableDates: "null",
                        //     numOfSeats: "5",
                        //     gearboxType: "auto",
                        //   },
                        //   {
                        //     vin: "5",
                        //     vehicleType: "Mercedes",
                        //     owner: "0fhdh55555fvfdv",
                        //     vehiclePricePerDay: "5",
                        //     unaviableDates: "null",
                        //     numOfSeats: "5",
                        //     gearboxType: "auto",
                        //   },
                        // ]}
                      />
                    }
                  />
                </Routes>
                // vehicleDoc
                // <GarageRegistration
                //     garages={this.state.garages}
                //     createGarage={this.createGarage}
                // >
                //     {" "}
                // </GarageRegistration>
                // <AddVehicle
                // // vehicles={this.state.vehicles}
                // // createVehicle={this.createVehicle}
                // // purchaseVehicle={this.purchaseVehicle}
                // />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

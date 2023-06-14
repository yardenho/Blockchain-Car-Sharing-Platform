import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Users from "../abis/Users.json";
import Navbar from "./Navbar";
import Main from "./Main";
import AddVehicle from "./AddVehicle";
import Register from "./Register";
import VehiclesList from "./RentersVehiclesList";

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

  async loadUsresContract(web3, networkId) {
    const networkData = Users.networks[networkId];
    if (networkData) {
      const usersContract = web3.eth.Contract(Users.abi, networkData.address);
      this.setState({ usersContract });
      const usersCount = await usersContract.methods.usersCount().call();
      console.log("user count *** - " + usersCount);
      this.setState({ usersCount });
      // Load users
      for (var i = 1; i <= usersCount; i++) {
        const user = await usersContract.methods.users(i).call();
        this.setState({
          users: [...this.state.users, user],
        });
      }
    } else {
      window.alert("Usres contract not deployed to detected network.");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log("network id " + networkId);
    this.loadMarketplaceContract(web3, networkId);
    this.loadUsresContract(web3, networkId);
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      vehicleCount: 0,
      vehicles: [],
      userCount: 0,
      users: [],
      loading: true,
    };

    this.createVehicle = this.createVehicle.bind(this);
    //this.purchaseVehicle = this.purchaseVehicle.bind(this);
    this.createUser = this.createUser.bind(this);
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

  purchaseVehicle(id, price) {
    //     this.setState({ loading: true });
    //     this.state.marketplace.methods
    //         .purchaseProduct(id)
    //         .send({ from: this.state.account, value: price })
    //         .once("receipt", (receipt) => {
    //             this.setState({ loading: false });
    //         });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                // <Register
                //   createUser={this.createUser}
                //   users={this.state.users}
                // />
                // <AddVehicle
                //   vehicles={this.state.vehicles}
                //   createVehicle={this.createVehicle}
                //   purchaseVehicle={this.purchaseVehicle}
                // />
                <VehiclesList vehicles={this.state.vehicles} />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

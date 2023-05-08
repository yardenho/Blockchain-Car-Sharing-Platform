import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Garages from "../abis/GarageRegistration.json";
import Users from "../abis/Users.json";
import Navbar from "./Navbar";
import Main from "./Main";
import AddVehicle from "./AddVehicle";
import Register from "./Register.js";
import Login from "./login";
import MainPage from "./MainPage";
import { Routes, Route } from "react-router-dom";
import GarageRegistration from "./GarageRegistration";

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
            const vehicleCount = await marketplace.methods
                .vehicleCount()
                .call();
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
            window.alert(
                "Marketplace contract not deployed to detected network."
            );
        }
    }

    async loadUsersContract(web3, networkId) {
        const networkData = Users.networks[networkId];
        if (networkData) {
            const usersContract = web3.eth.Contract(
                Users.abi,
                networkData.address
            );
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
            const garagesCount = await garagesContract.methods
                .garagesCount()
                .call();
            console.log("garages count = " + garagesCount);
            this.setState({ garagesCount });
            // Load vehicles
            for (var i = 1; i <= garagesCount; i++) {
                const garage = await garagesContract.methods.garages(i).call();
                this.setState({
                    garages: [...this.state.garages, garage],
                });
            }
        } else {
            window.alert(
                "Garages Registration contract not deployed to detected network."
            );
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
            garagesCount: 0,
            garages: [],
            loading: true,
        };

        this.createVehicle = this.createVehicle.bind(this);
        this.purchaseVehicle = this.purchaseVehicle.bind(this);
        this.createUser = this.createUser.bind(this);
        this.createGarage = this.createGarage.bind(this);
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

    createGarage(garageName, BnNumber, city, password) {
        this.setState({ loading: true });
        console.log("in app.js createGarage");
        console.log(this.state.account);
        this.state.garagesContract.methods
            .createGarage(garageName, BnNumber, city, password)
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
                <Navbar account={this.state.account} users={this.state.users} />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex">
                            {this.state.loading ? (
                                <div id="loader" className="text-center">
                                    <p className="text-center">Loading...</p>
                                </div>
                            ) : (
                                <Routes>
                                    <Route
                                        exact
                                        path="/"
                                        element={<MainPage />}
                                    />
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
                                                user={this.state.account}
                                                users={this.state.users}
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
                                </Routes>
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

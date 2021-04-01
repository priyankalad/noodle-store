import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Layout from "./components/Layout";
import List from "./components/List";
import axios from "axios";

function App() {
  const [restos, setRestos] = useState([]);
  const [filteredRestos, setFilteredRestos] = useState([]);
  useEffect(async () => {
    if (sessionStorage.getItem("noodle-store-data")) {
      let data = JSON.parse(sessionStorage.getItem("noodle-store-data"));
      setFilteredRestos(data);
      setRestos(data);
    } else {
      try {
        const restauResp = await axios.get(
          "https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json",
          {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        );
        const imagesResp = await axios.get(
          "https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json",
          {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        );
        if (restauResp.status !== 200) throw new Error(restauResp.status);
        let restaurants = restauResp.data;
        let restaurantsWithImages = restaurants;
        if (imagesResp.status === 200) {
          let images = imagesResp.data;
          restaurantsWithImages = restaurants.map((rest, index) => {
            {
              rest.id = index + 1;
              rest.imageUrl =
                images[Math.floor(Math.random() * images.length)].Image;
              return rest;
            }
          });
        }

        setRestos(restaurantsWithImages);
        setFilteredRestos(restaurantsWithImages);
        sessionStorage.setItem(
          "noodle-store-data",
          JSON.stringify(restaurantsWithImages)
        );
      } catch (e) {
        console.log(e);
      }
    }

    return () => {};
  }, []);

  let handleClear = () => {
    setFilteredRestos(restos);
  };

  let handleSearch = (brand) => {
    let updatedRestos = [];
    brand = brand.toLowerCase();
    if (brand != "") {
      updatedRestos = restos.filter((r) => {
        let rbrand = r.Brand.toLowerCase();
        return brand.includes(rbrand) || rbrand.includes(brand);
      });
      setFilteredRestos(updatedRestos);
    } else {
      setFilteredRestos(restos);
    }
  };

  return (
    <div>
      <Layout
        restos={restos}
        handleSearch={handleSearch}
        handleClear={handleClear}
      >
        <Switch>
          <Route
            path="/detail/:id"
            render={(props) => <Detail restos={restos} {...props} />}
          />
          <Route
            path="/"
            exact
            component={() => <List restos={filteredRestos} />}
          />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

import React, { PureComponent } from "react"
import styled from "styled-components"
import mapboxgl from "mapbox-gl"
import { Helmet } from "react-helmet"

import SearchBar from "./SearchBar"
import Numbers from "./Numbers"

const Wrapper = styled.div`
  height: 100vh;
  background-color: #263238;
  @media (min-width: 960px) {
    padding: 1em;
  }
`

const Mapbox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  > div {
    width: 100%;
    height: 100%;
  }
`

class App extends PureComponent {
  state = {
    value: "",
    latLng: null,
    suggestions: [],
    title: ""
  }

  autoComplete = new window.google.maps.places.AutocompleteService({
    types: ["address"]
  })
  geocoder = new window.google.maps.Geocoder()
  async componentDidMount() {
    const response = await fetch("https://freegeoip.net/json/")
    const { latitude, longitude } = await response.json()
    const latLng = new window.google.maps.LatLng(latitude, longitude)
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGF0cmljay1rcmF3Y3p5a293c2tpIiwiYSI6ImNqNGVrd2s5djB2bG0ydm5odndoZ24wbWgifQ.cG1Bd5RQ9SM8J1ErBHKIVQ"
    this.map = new mapboxgl.Map({
      container: this.mapNode,
      zoom: 12,
      center: [longitude, latitude],
      style: "mapbox://styles/patrick-krawczykowski/cj89n9rsl5kr82roaf9agn0id"
    })
    this.setState({ latLng })
  }

  handleChange = e => {
    e.target.value.charCodeAt() === 10 && console.log("enter")
    this.setState({ value: e.target.value }, _ => {
      if (this.state.value.length > 3) {
        this.autoComplete.getPlacePredictions(
          {
            input: this.state.value,
            location: this.state.latLng,
            radius: 1000
          },
          this.displaySuggestions
        )
      } else {
        this.clearSuggestions()
      }
    })
  }

  displaySuggestions = suggestions =>
    this.setState({ suggestions: suggestions })

  clearSuggestions = _ => this.setState({ suggestions: [] })

  handleAddressClick = desc => {
    this.setState({ value: desc, suggestions: [] })
    this.geocoder.geocode({ address: desc }, results => {
      this.map.flyTo({
        center: [
          results[0].geometry.location.lng(),
          results[0].geometry.location.lat()
        ],
        zoom: 16
      })
      this.setState({ title: desc })
    })
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>
            {this.state.title ? this.state.title : "Hack the Planet"}
          </title>
        </Helmet>
        <SearchBar
          handleChange={this.handleChange}
          inputValue={this.state.value}
          suggestionsArray={this.state.suggestions}
          handleAddressClick={this.handleAddressClick}
        />
        <Mapbox>
          <div ref={node => (this.mapNode = node)} />
        </Mapbox>
        <Numbers ip="19.192.19.199" bankAccount="00000000" ssn="999-00-0000" />
      </Wrapper>
    )
  }
}

export default App

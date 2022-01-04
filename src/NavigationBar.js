import React from "react"

function NavigationBar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <span href="#" class="navbar-brand">CA</span>
            <input class="form-control mr-sm-2" type="search" placeholder="Rows no" aria-label="Search" />
            <input class="form-control mr-sm-2" type="search" placeholder="Columns no" aria-label="Search" />
            <input class="form-control mr-sm-2" type="search" placeholder="States no" aria-label="Search" />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Render</button>
        </nav>          
    )
}

export default NavigationBar
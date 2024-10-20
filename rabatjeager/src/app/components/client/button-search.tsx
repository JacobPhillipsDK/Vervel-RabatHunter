"use client";



import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function ButtonSearch() {
    return (
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2" onClick={() => alert("You clicked me!")}/>
    );
}

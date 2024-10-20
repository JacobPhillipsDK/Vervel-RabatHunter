"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface SearchButtonProps {
    onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-500 mr-2 cursor-pointer"
            onClick={onClick}
        />
    );
}
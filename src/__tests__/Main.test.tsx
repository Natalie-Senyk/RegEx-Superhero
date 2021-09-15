import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Main from "../pages/Main";


describe('Main page and it`s behaviour', () => {
    test('should display user input field', () => {
        render(<Main />)
    })
})
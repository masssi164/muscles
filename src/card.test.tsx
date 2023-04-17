import React from "react";
import {screen ,render, fireEvent, waitFor } from "@testing-library/react";
import Card from "./Card";
import ServerCommunication from "./ServerCommunication";

describe("Card component", () => {
  test("renders Card component correctly", () => {
    const communication = new ServerCommunication("http://localhost", 3001);
    const props = {
      name: "Test Muscle",
      connection: communication,
    };

    const { getByText, getByTestId } = render(<Card {...props} />);

    // Test initial render
    expect(getByText("Test Muscle")).toBeInTheDocument();
    expect(getByTestId("oregines-button")).toHaveTextContent("Ursprung/Ursprünge");
    expect(getByTestId("innervation-button")).toHaveTextContent("Innervation");
    expect(getByTestId("joints-button")).toHaveTextContent("Joints");
    expect(getByTestId("insertiones-button")).toHaveTextContent("Ansatz bzw. Ansätze");
    
  });



  test("clicking oregines button fetches and displays oregines", async () => {
    const communication = new ServerCommunication("http://localhost", 3001);
    const props = {
      name: "Test Muscle",
      connection: communication,
    };
    communication.getOreginesOf = jest.fn().mockImplementation((muscleName, callback) => {
      callback(["Oregine 1", "Oregine 2"]);
    });
  
    const {getByTestId, getByLabelText} =render(<Card {...props} />);
  
    const oreginesButton = getByTestId("oregines-button");
    fireEvent.click(oreginesButton);
    // Wait for oregines to be fetched and displayed
    await waitFor(() => {
        const listOfOregines =getByLabelText(/ursprünge/i)
      expect(listOfOregines.children.length === 2)
    });
  });
  
  
   // Add more tests for other functionality in Card component
   test("clicking insertiones button fetches and displays insertiones", async () => {
    const communication = new ServerCommunication("http://localhost", 3001);
    const props = {
      name: "Test Muscle",
      connection: communication,
    };
    communication.getInsertionesOf = jest.fn().mockImplementation((muscleName, callback) => {
      callback(["insertio_1", "insertio_2"])
    })
  
    const {getByTestId, getByLabelText} =render(<Card {...props} />);
  
    const oreginesButton = getByTestId("insertiones-button");
    fireEvent.click(oreginesButton);
    // Wait for oregines to be fetched and displayed
    await waitFor(() => {
        const listOfOregines =getByLabelText(/liste der ansätze/i)
      expect(listOfOregines.children.length === 2)
    });
  });

  test("is innervation shown, after innervation button clicked?",async () => {
    const communication = new ServerCommunication("http://localhost", 3001);
    const props = {
      name: "Test Muscle",
      connection: communication,
    };
    communication.getInnervationOf= jest.fn().mockImplementation((muscleName, callback) => {
      callback("innervation")
    })
    const {getByLabelText, getByTestId} =render(<Card {...props} />)
    const innervationButton =getByTestId(/innervation-button/i)
    fireEvent.click(innervationButton)

    await waitFor(() => {
        const innervation =getByLabelText(/innervation/i)
        expect(innervation).toBeInTheDocument()
    })
    
  })
  
  
  
});

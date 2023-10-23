import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'
import { prettyDOM } from "@testing-library/dom";

test('renders content', () => {
	const note = {
		content: 'This is a test',
		important: true,
		date: '2023-08-08T15:59:57.313Z'
	}

	const component = render(<Note {...note} />)

	component.getByText(note.content)
	component.getByText(note.date)
})

// this function interacts with the toggleImportance functionality of the note component
// we didndt implement this property but here is the example of how we coult test it 
// test('clicking the button calls event handler once', () => {
// 	const note = {
// 		content: 'This is a test',
// 		important: true,
// 		date: '2023-08-08T15:59:57.313Z'
// 	}

// 	const mockHandler = jest.fn()

// 	const component = render(<Note {...note} toggleImportance={mockHandler} />)

// 	const button = component.getByText('make not important')
// 	fireEvent.click(button);
// 	// 2 ways to check it:
// 	expect(mockHandler.mock.calls).toHaveLength(1)
// 	expect(mockHandler).toHaveBeenCalledTimes(1) // this one is cleaner
// })


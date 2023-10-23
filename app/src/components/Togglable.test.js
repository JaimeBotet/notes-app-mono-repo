import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'
import { prettyDOM } from "@testing-library/dom";

describe('<Togglable />', () => {
	const btnLabel = 'show'
	let component;

	beforeEach( () => {
		component = render(
			<Togglable btnLabel={btnLabel}>
				<div>testDivContent</div>
			</Togglable>
		)
	})

	test('renders its children', () => {
		component.getByText('testDivContent')
	})

	test('renders its children but not visible', () => {
		const el = component.getByText('testDivContent')
		expect(el.parentNode).toHaveStyle('display: none')
	})

	test('after clicking children are shown', () => {
		const button = component.getByText(btnLabel)
		fireEvent.click(button)

		const el = component.getByText('testDivContent')
		expect(el.parentNode).not.toHaveStyle('display: none')
	})
})




